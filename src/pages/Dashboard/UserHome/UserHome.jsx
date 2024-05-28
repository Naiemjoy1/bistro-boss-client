import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <p className="text-3xl">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}
      </p>
    </div>
  );
};

export default UserHome;
