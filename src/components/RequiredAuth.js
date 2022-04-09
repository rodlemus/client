import { Navigate } from "react-router";
import { useAuth } from "./Auth";

export const RequiredAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/signin"></Navigate>;
  }
  return children;
};
