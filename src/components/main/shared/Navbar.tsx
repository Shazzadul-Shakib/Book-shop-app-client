import { CircleUserRound, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAppSelector } from "../../../redux/hooks";
import { currentUser, logoutUser } from "../../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const user = useAppSelector(currentUser);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <nav className="bg-slate-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">My Bookstore</div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Nav Items (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-200">
            Products
          </Link>
          <Link to="/about" className="text-white hover:text-gray-200">
            About
          </Link>
          <Link to="/dashboard" className="text-white hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/checkout" className="text-white hover:text-gray-200">
            Checkout
          </Link>

          {/* Login / User Profile Dropdown */}
          <div className="relative">
            {user ? (
              <div className="relative">
                {/* User Icon Button */}
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white focus:outline-none"
                >
                  <CircleUserRound className="w-6 h-6" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-white py-2"
              >
                Join
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-white py-2">
            Home
          </Link>
          <Link
            to="/products"
            className="block text-white py-2"
          >
            Products
          </Link>
          <Link to="/about" className="block text-white py-2">
            About
          </Link>
          <Link
            to="/dashboard"
            className="block text-white py-2"
          >
            Dashboard
          </Link>
          <Link
            to="/checkout"
            className="block text-white py-2"
          >
            Checkout
          </Link>

          {/* Login / User Profile (Mobile) */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white focus:outline-none w-full px-4 py-2"
                >
                  <CircleUserRound className="w-6 h-6 mr-2" />
                  <span>{user?.name}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                    <hr />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="block text-white py-2"
              >
                Join
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
