import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default AuthMiddleware;
