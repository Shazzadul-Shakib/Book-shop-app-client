import { Outlet } from "react-router";
import Navbar from "../components/main/shared/Navbar";
import Footer from "../components/main/shared/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className=" relative">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
