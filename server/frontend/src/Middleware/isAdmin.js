import { Navigate, Outlet } from "react-router-dom";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default isAdmin;
