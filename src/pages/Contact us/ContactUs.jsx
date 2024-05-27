import { useForm } from "react-hook-form";
import useImgApi from "../../Hooks/useImgApi";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import AnchorTemporaryDrawer from "../../Shared/Navbar/CartDower";
import RightSideDrawer from "../../Shared/Navbar/RightSideDrawer";
import DrawerScrollable from "../../Shared/Navbar/CartDower";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { imageUrl, uploadImage } = useImgApi(); // hook imgapi
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const name = data.name;
    const email = data.email;
    const password = data.password;

    try {
      const displayUrl = await uploadImage(imageFile);
      console.log("Name:", name);
      console.log("Uploaded Image URL:", displayUrl);
      console.log("Email", email);

      //   create
      const result = await createUser(email, password);
      console.log("final data", result);

      // save username and photo
      await updateUserProfile(name, displayUrl);
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label htmlFor="image" className="label">
            <span className="label-text">Select Image:</span>
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            {...register("image", { required: true })}
          />
          {errors.image && (
            <span className="text-red-600">Image is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600">Email is required</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="input input-bordered"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern:
                /(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]))(?=(.*[a-z]))/,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">Password must be 6 characters</p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-600">
              Password must be less than 20 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must have one uppercase, one lowercase, one number, and
              one special character
            </p>
          )}
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <div>
        <img src={imageUrl} alt="" />
      </div>
      <RightSideDrawer></RightSideDrawer>
      <DrawerScrollable></DrawerScrollable>
    </div>
  );
};

export default ContactUs;
