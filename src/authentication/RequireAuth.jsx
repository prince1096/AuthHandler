import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation, Navigate } from "react-router";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { token } = useContext(AuthContext);
  console.log(token, "requireAuth");

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default RequireAuth;
