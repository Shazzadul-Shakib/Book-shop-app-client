import { Link, useLocation } from "react-router"; // Use "react-router-dom" instead of "react-router"
import { DashboardRoute } from "../../data/DashboardRoutesData";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react"; // Import the Home icon

interface SidebarProps {
  routes: DashboardRoute[];
}

const Sidebar: React.FC<SidebarProps> = ({ routes }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg md:hidden"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 bg-primary text-white h-screen p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:translate-x-0 z-40`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        {/* Back to Homepage Link */}
        <Link
          to="/"
          onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (mobile)
          className="flex items-center p-2 rounded-lg hover:bg-white hover:text-primary transition-colors mb-4"
        >
          <Home className="w-5 h-5 mr-2" /> {/* Home icon */}
          <span>Back to Homepage</span>
        </Link>

        {/* Dashboard Links */}
        <nav>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click (mobile)
                  className={`flex items-center p-2 rounded-lg hover:bg-white hover:text-primary transition-colors ${
                    location.pathname === route.path
                      ? "bg-white text-primary"
                      : ""
                  }`}
                >
                  <route.icon className="w-5 h-5 mr-2" />
                  <span>{route.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile (optional) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
