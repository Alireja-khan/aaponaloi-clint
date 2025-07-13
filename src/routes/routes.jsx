import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import Apartments from "../pages/Apartment/Apartments";
import Contact from "../pages/Contact/Contact";

import DashboardLayout from "../dashboard/UserDashBoard.jsx/DashboardLayout";
import Profile from "../dashboard/UserDashBoard.jsx/Profile";
import Announcements from "../dashboard/UserDashBoard.jsx/Announcements";
import AdminDashboardLayout from "../dashboard/AdminDashBoard/AdminDashboardLayout";
import AdminProfile from "../dashboard/AdminDashBoard/AdminProfile";
import ManageMembers from "../dashboard/AdminDashBoard/ManageMembers";
import MakeAnnouncement from "../dashboard/AdminDashBoard/MakeAnnouncement";
import AgreementRequests from "../dashboard/AdminDashBoard/AgreementRequests";
import ManageCoupons from "../dashboard/AdminDashBoard/ManageCoupons";
import MemberDashboardLayout from "../dashboard/MemberDashboard.jsx/MemberDashboardLayout";
import MemberProfile from "../dashboard/MemberDashboard.jsx/MemberProfile";
import MakePayment from "../dashboard/MemberDashboard.jsx/MakePayment";
import PaymentHistory from "../dashboard/MemberDashboard.jsx/PaymentHistory";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'apartments', Component: Apartments },
      { path: 'contact', Component: Contact },

      // Main dashboard route with redirect logic
      {
        path: 'dashboard',
        Component: PrivateRoutes,
        children: [], // Handled by redirection
      },

      // User Dashboard
      {
        path: 'dashboard/user',
        Component: PrivateRoutes,
        children: [
          {
            path: '',
            Component: DashboardLayout, // Your UserDashboardLayout
            children: [
              { index: true, Component: Profile },
              { path: 'profile', Component: Profile },
              { path: 'announcements', Component: Announcements },
            ],
          },
        ],
      },

      // Member Dashboard
      {
        path: 'member-dashboard',
        Component: PrivateRoutes,
        children: [
          {
            path: '',
            Component: MemberDashboardLayout,
            children: [
              { index: true, Component: MemberProfile },
              { path: 'profile', Component: MemberProfile },
              { path: 'make-payment', Component: MakePayment },
              { path: 'payment-history', Component: PaymentHistory },
              { path: 'announcements', Component: Announcements },
            ],
          },
        ],
      },

      // Admin Dashboard
      {
        path: '',
        Component: PrivateRoutes,
        children: [
          {
            path: 'admin-dashboard',
            Component: AdminDashboardLayout,
            children: [
              { index: true, Component: AdminProfile },
              { path:'/admin-dashboard/profile', Component: AdminProfile },
              { path: 'manage-members', Component: ManageMembers },
              { path: 'make-announcement', Component: MakeAnnouncement },
              { path: 'agreement-requests', Component: AgreementRequests },
              { path: 'manage-coupons', Component: ManageCoupons },
            ],
          },
        ],
      },
      // User Dashboard
      {
        path: '',
        Component: PrivateRoutes,
        children: [
          {
            path: 'user-dashboard',
            Component: DashboardLayout,
            children: [
              { index: true, Component: Profile },
              { path: 'profile', Component: Profile },
              { path: 'announcements', Component: Announcements },
            ],
          },
        ],
      },
    ],
  },

  // Auth routes
  {
    path: '/',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
]);
