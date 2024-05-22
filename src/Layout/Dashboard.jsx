import React from "react";
import {
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();

  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-orange-400">
        <ul className="menu">
          <li>
            <NavLink to="/dashboard/userhome">
              <FaHome></FaHome> user home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/userhome">
              <FaCalendar></FaCalendar> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaShoppingCart></FaShoppingCart> My Cart ({cart.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <GiStarsStack />
              add a Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <FaList /> My bookings
            </NavLink>
          </li>
          <div className=" divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/salad">
              <FaSearch></FaSearch> Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-3/4 flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
