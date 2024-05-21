import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Sign Up </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to="/">
              <button className="btn btn-primary">Home</button>
            </Link>
          </div>
          <div className="card w-1/2 shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                  <span className=" text-red-600">Name is required</span>
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
                  <span className=" text-red-600">Email is required</span>
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
                  <p className=" text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className=" text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className=" text-red-600">
                    Password must be less 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className=" text-red-600">
                    Password must have one uppercase one lower case, one number
                    and special characters
                  </p>
                )}
                <label className="password">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">SignUp</button>
              </div>
            </form>
            <p>
              already have account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
