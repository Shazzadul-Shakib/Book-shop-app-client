import Login from "../pages/(Main)/Auth/Login";
import Register from "../pages/(Main)/Auth/Register";
import Home from "../pages/(Main)/Home/Home";

export const ClientRoutes = [
  {
    index: true,
    element: <Home />,
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
