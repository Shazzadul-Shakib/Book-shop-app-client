import { Outlet } from "react-router";
import Navbar from "../components/main/shared/Navbar";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
