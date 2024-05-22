import { Link, NavLink } from "react-router-dom";

import "./styles.css";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../Hooks/useCart";
import RightSideDrawer from "./RightSideDrawer";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { backgroundColor: "red" } : {})}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/menu"
          style={({ isActive }) => (isActive ? { backgroundColor: "red" } : {})}
        >
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop/salad"
          style={({ isActive }) => (isActive ? { backgroundColor: "red" } : {})}
        >
          Our Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          style={({ isActive }) => (isActive ? { backgroundColor: "red" } : {})}
        >
          Contact us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => (isActive ? { backgroundColor: "red" } : {})}
        >
          Dashboard
        </NavLink>
      </li>

      {/* {user ? (
        <>
          <span>{user?.displayName}</span>
          <li>
            <Link onClick={handleLogOut}>Log Out</Link>
          </li>
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/tZnWNmV/man-8106958-1280.png"
                }
              />
            </div>
          </div>
        </>
      ) : (
        <li>
          <Link to="/login">Log In</Link>
        </li>
      )} */}
    </>
  );
  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end gap-4">
          {/* <Link to="/dashboard/cart">
            <button className="btn btn-sm">
              <FaCartPlus />
              <div className="badge badge-secondary">+{cart.length}</div>
            </button>
          </Link> */}
          <RightSideDrawer cart={cart}></RightSideDrawer>
          {user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover-dropdown"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/cFXnHG0/360-F-214746128-31-Jkea-P6r-U0-Nzzzd-FC4kh-Gkmqc8noe6h.jpg"
                    }
                    alt=""
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-500 rounded-box w-52 hover-dropdown-content">
                <li>
                  <button className="btn btn-sm btn-ghost">
                    <Link to="/userupdate" user={user}>
                      {user?.displayName || user?.email || "user"}
                    </Link>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-sm btn-ghost"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <a>
                <Link to="/login">Log In</Link>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
