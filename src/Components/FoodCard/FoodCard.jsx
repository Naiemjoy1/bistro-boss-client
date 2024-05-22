import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = () => {
    //
    if (user && user.email) {
      // to send cart
      // console.log(user.email, food);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch cart to update te cart item count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
    // console.log(food, user.email);
  };

  return (
    <div>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img className=" w-full" src={image} alt="Shoes" />
        </figure>
        <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">
          ${price}
        </p>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={handleAddToCart} className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
