import { RouteObject } from "react-router";
import AdminOrderPage from "../pages/(Dashboard)/AdminDashboard/AdminOrderPage";

export const AdminDashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminOrderPage />,
  },
];
