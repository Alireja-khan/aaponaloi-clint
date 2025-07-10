import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import Apartments from "../pages/Apartment/Apartments";

import DashboardLayout from "../dashboard/UserDashBoard.jsx/DashboardLayout";
import Profile from "../dashboard/UserDashBoard.jsx/Profile";
import Announcements from "../dashboard/UserDashBoard.jsx/Announcements";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "apartments",
        Component: Apartments,
      },
      {
        path: "dashboard",
        Component: PrivateRoutes, // Protect all dashboard routes
        children: [
          {
            path: "",
            Component: DashboardLayout,
            children: [
              {
                index: true,
                Component: Profile,
              },
              {
                path: "profile",
                Component: Profile,
              },
              {
                path: "announcements",
                Component: Announcements,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
