import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

const Protected = ({ children }) => {
  const isLoggedIn = Auth.loggedIn()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
