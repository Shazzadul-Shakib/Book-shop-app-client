import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { ClientRoutes } from "./ClientRoutes";
import PrivateRoute from "../layouts/PrivateRoute";
import Unauthorized from "../pages/(Main)/Unauthorized/Unauthorized";
import { UserDashboardRoutes } from "./UserDashboardRoutes";
import { AdminDashboardRoutes } from "./AdminDashboardRoutes";

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
    children: AdminDashboardRoutes,
  },
  {
    path: "/user-dashboard",
    element: (
      <PrivateRoute requiredRole="user">
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: UserDashboardRoutes,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
