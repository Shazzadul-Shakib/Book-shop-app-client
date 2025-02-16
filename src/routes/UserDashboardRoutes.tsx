import { RouteObject } from "react-router";
import UserOrderPage from "../pages/(Dashboard)/UserDashboard/UserOrderPage";
import UserProfilePage from "../pages/(Dashboard)/UserDashboard/UserProfilePage";

export const UserDashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <UserOrderPage />,
  },
  {
    path: "userprofile",
    element: <UserProfilePage />,
  },
];
