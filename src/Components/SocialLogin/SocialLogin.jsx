import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log("login user", result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log("axios output", res.data);
        navigate("/");
      });
    });
  };

  return (
    <div>
      <div className=" divider"></div>
      <button onClick={handleGoogleSignIn} className="btn btn-primary my-10">
        Google Login
      </button>
    </div>
  );
};

export default SocialLogin;
