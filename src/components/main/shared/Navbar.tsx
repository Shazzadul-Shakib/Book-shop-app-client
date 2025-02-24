import {
  CircleUserRound,
  LogOut,
  ShoppingCart,
  Home,
  Info,
  LayoutDashboard,
  PackageSearch,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  currentUser,
  logoutUser,
} from "../../../redux/features/auth/authSlice";
import { clearCart } from "../../../redux/features/product/productCartSlice";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const user = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.books);

  const totalQuantity = cart.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-primary p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">My Bookstore</div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-white flex items-center gap-1 hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white flex items-center gap-1 hover:text-gray-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-white flex items-center gap-1 hover:text-gray-200"
          >
            About
          </Link>
          {user && (
            <Link
              to={user.role === "admin" ? "/dashboard" : "/user-dashboard"}
              className="text-white flex items-center gap-1 hover:text-gray-200"
            >
              Dashboard
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/checkout"
            className="relative text-white hover:text-gray-200"
          >
            <ShoppingCart size={24} />
            <span className="absolute h-5 w-5 -top-2 -right-2 flex items-center justify-center bg-red-500 text-white text-xs rounded-full px-2">
              {totalQuantity}
            </span>
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative ">
            {user ? (
              <div>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white focus:outline-none cursor-pointer"
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <CircleUserRound size={24} />
                  )}
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
                      className="flex items-center cursor-pointer w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-200">
                Join
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
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
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className=" text-white py-2 flex items-center gap-2">
            <Home size={20} /> Home
          </Link>
          <Link
            to="/products"
            className=" text-white py-2 flex items-center gap-2"
          >
            <PackageSearch size={20} /> Products
          </Link>
          <Link
            to="/about"
            className=" text-white py-2 flex items-center gap-2"
          >
            <Info size={20} /> About
          </Link>
          <Link
            to="/dashboard"
            className=" text-white py-2 flex items-center gap-2"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/checkout"
            className=" text-white py-2 flex items-center gap-2 relative"
          >
            <ShoppingCart size={20} /> Cart
            <span className="absolute top-0 right-6 bg-red-500 text-white text-xs rounded-full px-2">
              3
            </span>
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          ) : (
            <Link to="/login" className=" text-white py-2">
              Join
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
