import { Navigate, Outlet } from "react-router-dom";

import { useLocalStorage } from '../../components/localStorage'

const ProtectedRoute = ({ role, children, redirectTo = "/login" }) => {

  const [getToken, setToken] = useLocalStorage('token');
  const [getUser, setUser] = useLocalStorage('user');

  if (
    getToken() == null &&
    getUser() == null
  ) {
    return <Navigate to={redirectTo} />;
  } else if (
    getToken() &&
    getUser().role[0].description.includes(role)
  ) {
    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;
