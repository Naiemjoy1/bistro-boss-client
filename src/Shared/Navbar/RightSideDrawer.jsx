import React from "react";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import useCart from "../../Hooks/useCart";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RightSideDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const roundedTotalPrice = Math.floor(totalPrice);
  const discount = (totalPrice - roundedTotalPrice).toFixed(2);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data && res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="text-black">
      <button onClick={toggleDrawer} className="btn btn-sm">
        <FaCartPlus />
        <div className="badge badge-secondary">+{cart.length}</div>
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="bla bla bla"
      >
        <div className="p-4">
          <p className="font-bold mt-4">Items: {cart.length}</p>
          <div className="divider divider-neutral"></div>
          <div className="cart-items-container h-96 overflow-y-auto mt-4 ">
            {cart.map((item, index) => (
              <div
                key={item._id}
                className="flex justify-left gap-4 items-center mb-4"
              >
                <div className="w-3/12">
                  <div className="avatar">
                    <div className="w-10 rounded">
                      <img src={item.image} />
                    </div>
                  </div>
                </div>
                <div className="w-6/12">
                  <p>{item.name}</p>
                  <p>
                    <span className="font-semibold">Price: </span>
                    {item.price}
                  </p>
                </div>
                <div className="w-3/12">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost "
                  >
                    <FaTrashAlt className="text-lg text-red-600"></FaTrashAlt>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="divider divider-neutral"></div>
          <div className="flex justify-between items-center">
            <p>Sub Total Price:</p>
            <p> {totalPrice}</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Discount:</p>
            <p>{discount}</p>
          </div>
          <div className="divider divider-neutral"></div>
          <div className="flex justify-between items-center">
            <p>Total Price:</p>
            <p>{roundedTotalPrice}</p>
          </div>
          <button className="btn btn-primary w-full btn-sm mt-5">
            Pay Now
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default RightSideDrawer;
