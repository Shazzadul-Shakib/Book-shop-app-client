import { Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { currentUser } from "../redux/features/auth/authSlice";
import Sidebar from "../components/dashboard/Sidebar";
import { adminDashboardRoutes, userDashboardRoutes } from "../data/DashboardRoutesData";

const DashboardLayout: React.FC = () => {
  const user = useAppSelector(currentUser);

  // Determine which routes to use based on the user's role
  const routes =
    user?.role === "admin" ? adminDashboardRoutes : userDashboardRoutes;

  return (
    <div className="flex h-screen">
      <Sidebar routes={routes} />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
