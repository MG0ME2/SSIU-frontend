import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, children, redirectTo = "/login" }) => {
  if (
    localStorage.getItem("token") == null &&
    localStorage.getItem("data") == null
  ) {
    return <Navigate to={redirectTo} />;
  } else if (
    localStorage.getItem("token") &&
    JSON.parse(localStorage.getItem("data")).role.includes(role)
  ) {
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;
