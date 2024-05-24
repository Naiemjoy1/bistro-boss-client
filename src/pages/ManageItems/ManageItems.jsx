import React from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useMenu from "../../Hooks/useMenu";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/menu/${item._id}`);
          // console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${item.name} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to delete item",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle
        heading={"manage all items"}
        subHeading={"---Hurry Up!---"}
      ></SectionTitle>
      <section>
        <p>Total Items: {menu.length}</p>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>ITEM IMAGE</th>
                  <th>ITEM NAME</th>
                  <th>PRICE</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {menu.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <th>
                      <button
                        onClick={() => handleUpdate(item)}
                        className="btn btn-warning "
                      >
                        <FaEdit className="text-lg text-white"></FaEdit>
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-error "
                      >
                        <FaTrashAlt className="text-lg text-white"></FaTrashAlt>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageItems;
