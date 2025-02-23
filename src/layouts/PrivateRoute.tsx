import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  console.log(!token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
