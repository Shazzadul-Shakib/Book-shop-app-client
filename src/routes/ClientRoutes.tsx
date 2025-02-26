import PrivateRoute from "../layouts/PrivateRoute";
import AboutUs from "../pages/(Main)/AboutUs/AboutUs";
import AllProducts from "../pages/(Main)/AllProducts/AllProducts";
import Login from "../pages/(Main)/Auth/Login";
import Register from "../pages/(Main)/Auth/Register";
import Checkout from "../pages/(Main)/Checkout/Checkout";
import PaymentFailed from "../pages/(Main)/Checkout/PaymentFailed";
import Home from "../pages/(Main)/Home/Home";
import ProductDetails from "../pages/(Main)/Product/ProductDetails";

export const ClientRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/products",
    element: <AllProducts />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: (
      <PrivateRoute requiredRole="user">
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    path: "/checkout/payment-failed",
    element: <PaymentFailed />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
