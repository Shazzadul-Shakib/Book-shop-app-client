import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { ClientRoutes } from "./ClientRoutes";
import { DashboardRoutes } from "./DashboardRoutes";
import PrivateRoute from "../layouts/PrivateRoute";
import AdminDashboard from "../pages/(Dashboard)/Home/AdminDashboard";
import UserDashboard from "../pages/(Dashboard)/Home/UserDashboard";
import Unauthorized from "../pages/(Main)/Unauthorized/Unauthorized";
// import AdminDashboard from "../pages/AdminDashboard";
// import UserDashboard from "../pages/UserDashboard";
// import Unauthorized from "../pages/Unauthorized";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: ClientRoutes,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute requiredRole="admin">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />, // Admin-specific dashboard
      },
      ...DashboardRoutes,
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute requiredRole="user">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <UserDashboard />, // User-specific dashboard
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
