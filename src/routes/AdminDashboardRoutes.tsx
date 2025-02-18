import { RouteObject } from "react-router";
import AdminOrderPage from "../pages/(Dashboard)/AdminDashboard/AdminOrderPage";
import AdminViewUsersPage from "../pages/(Dashboard)/AdminDashboard/AdminViewUsersPage";
import AdminBooksPage from "../pages/(Dashboard)/AdminDashboard/AdminBooksPage";

export const AdminDashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminOrderPage />,
  },
  {
    path: "/dashboard/users",
    element: <AdminViewUsersPage />,
  },
  {
    path: "/dashboard/books",
    element: <AdminBooksPage />,
  },
];
