import React from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log("form data", data);

    // image upload to imgbb
    const imageFile = new FormData();
    imageFile.append("image", data.image[0]);

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log("Image Upload Response: ", res.data);

    if (res.data.success) {
      // now send the menu item
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);

      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <SectionTitle
        heading={"UPDATE AN ITEM"}
        subHeading={"---Refresh info---"}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe name*</span>
            </label>
            <input
              defaultValue={name}
              type="text"
              name="name"
              placeholder="Recipe Name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>

              <select
                defaultValue="category"
                name="category"
                className="select select-bordered w-full"
                {...register("category", { required: true })}
              >
                <option value="null" disabled>
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {errors.category && <span>This field is required</span>}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                defaultValue={price}
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered"
                {...register("price", { required: true })}
              />
              {errors.price && <span>This field is required</span>}
            </div>
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              defaultValue={recipe}
              type="text"
              name="recipe"
              placeholder="Recipe Details"
              className="textarea textarea-bordered"
              {...register("recipe")}
            />
            {errors.recipe && <span>This field is required</span>}
          </div>
          <div className="form-control ">
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
              {...register("image")}
            />
            {errors.image && <span>This field is required</span>}
          </div>

          <div className="form-control mt-6 ">
            <button className="btn btn-primary max-w-xs">
              Update Item <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
