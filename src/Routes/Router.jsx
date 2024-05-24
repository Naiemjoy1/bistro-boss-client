import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/Contact us/ContactUs";
import OurMenu from "../pages/OurMenu/OurMenu";
import OurShop from "../pages/OurShop/OurShop";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import UserDetailsUpdate from "../pages/UserDetailsUpdate/UserDetailsUpdate";
import SignUp2 from "../pages/SignUp/SignUp2";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/AddItems/AddItems";
import ManageItems from "../pages/ManageItems/ManageItems";
import ManageBookings from "../pages/ManageBookings/ManageBookings";
import AdminHome from "../pages/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },

      {
        path: "/menu",
        element: <OurMenu></OurMenu>,
      },
      {
        path: "/shop/:category",
        element: <OurShop></OurShop>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/userupdate",
        element: <UserDetailsUpdate></UserDetailsUpdate>,
      },
      {
        path: "/test",
        element: <SignUp2></SignUp2>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard></Dashboard>
          </PrivateRoutes>
        ),
        children: [
          {
            path: "cart",
            element: <Cart></Cart>,
          },
          //admin
          {
            path: "adminhome",
            element: <AdminHome></AdminHome>,
          },
          {
            path: "users",
            element: (
              <AdminRoute>
                <AllUsers></AllUsers>
              </AdminRoute>
            ),
          },
          {
            path: "additems",
            element: (
              <AdminRoute>
                <AddItems></AddItems>
              </AdminRoute>
            ),
          },
          {
            path: "manageitems",
            element: <ManageItems></ManageItems>,
          },
          {
            path: "managebookings",
            element: <ManageBookings></ManageBookings>,
          },
        ],
      },
    ],
  },
]);
