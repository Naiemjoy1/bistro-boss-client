import React, { useState, useEffect } from "react";
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
  const initialData = useLoaderData();
  const [itemData, setItemData] = useState(initialData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const refetchData = async () => {
    try {
      const response = await axiosSecure.get(`/menu/${itemData._id}`);
      setItemData(response.data);
    } catch (error) {
      console.error("Failed to refetch data:", error);
    }
  };

  const onSubmit = async (data) => {
    console.log("form data", data);

    let imageUrl = itemData.image; // Initialize imageUrl with the existing image URL

    // Check if a new image is selected
    if (data.image && data.image.length > 0) {
      // Image upload to imgbb
      const imageFile = new FormData();
      imageFile.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log("Image Upload Response: ", res.data);

      if (res.data.success) {
        imageUrl = res.data.data.display_url; // Update imageUrl with the uploaded image URL
      } else {
        // Handle image upload failure
        return;
      }
    }

    // Prepare menu item data
    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: imageUrl, // Use the updated or existing image URL
    };

    // Update the menu item
    const menuRes = await axiosSecure.patch(`/menu/${itemData._id}`, menuItem);
    console.log(menuRes.data);

    if (menuRes.data.modifiedCount > 0) {
      // Refetch data to update the UI
      refetchData();
      // Show success popup
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} is updated to the menu`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
              defaultValue={itemData.name}
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
                defaultValue={itemData.category}
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
                defaultValue={itemData.price}
                type="number"
                name="price"
                placeholder="Price"
                className="input input-bordered"
                {...register("price", { required: true })}
              />
              {errors.price && <span>This field is required</span>}
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              defaultValue={itemData.recipe}
              type="text"
              name="recipe"
              placeholder="Recipe Details"
              className="textarea textarea-bordered"
              {...register("recipe", { required: true })}
            />
            {errors.recipe && <span>This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Image</span>
            </label>
            <img
              src={itemData.image}
              alt="Current"
              className="w-32 h-32 object-cover"
            />
          </div>
          <div className="form-control">
            <input
              type="file"
              name="image"
              className="file-input w-full max-w-xs"
              {...register("image")}
            />
          </div>
          <div className="form-control mt-6">
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
