import React from "react";
import {
  FaCalendar,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();

  // todo: get isAdmin Value from database
  const isAdmin = true;

  return (
    <div className="flex">
      <div className="w-1/4 min-h-screen bg-orange-400">
        <ul className="menu">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome> Admin home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/additems">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/manageitems">
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaCalendar />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers /> All Users
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
            </>
          ) : (
            <>
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
            </>
          )}
          {/* <li>
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
          </li> */}
        </ul>
      </div>
      <div className="w-3/4 flex-1 p-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
