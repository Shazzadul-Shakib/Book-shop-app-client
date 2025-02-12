import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { currentToken, currentUser } from "../redux/features/auth/authSlice";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: string; // Optional role requirement
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const token = useAppSelector(currentToken);
  const user = useAppSelector(currentUser);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
