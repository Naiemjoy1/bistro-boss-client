import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

import updateImage from "../../assets/others/authentication.gif";

const UserDetailsUpdate = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setValue("photoURL", user.photoURL || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    updateUserProfile(data.name, data.photoURL)
      .then(() => {
        console.log("User profile info updated");
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Update User Details</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex">
          <div className="w-1/2">
            <img src={updateImage} alt="" />
            <Link to="/">
              <button className="btn btn-primary text-center">Home</button>
            </Link>
          </div>
          <div className="card shadow-2xl bg-base-100 w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
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
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered"
                  {...register("photoURL", { required: true })}
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                  readOnly
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
                  className="input input-bordered"
                  {...register("password", {
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=(.*[A-Z]))(?=(.*[0-9]))(?=(.*[!@#$%^&*()\-__+.]))(?=(.*[a-z]))/,
                  })}
                />
                {errors.password && (
                  <span className="text-red-600">
                    {errors.password.type === "minLength" &&
                      "Password must be at least 6 characters"}
                    {errors.password.type === "maxLength" &&
                      "Password must be less than 20 characters"}
                    {errors.password.type === "pattern" &&
                      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsUpdate;
