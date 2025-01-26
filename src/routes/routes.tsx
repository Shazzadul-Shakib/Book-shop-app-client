import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { ClientRoutes } from "./ClientRoutes";
import { DashboardRoutes } from "./DashboardRoutes";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: ClientRoutes,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: DashboardRoutes,
  },
]);
