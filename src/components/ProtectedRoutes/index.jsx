/**
 * Se utiliza useSelector de react-redux para seleccionar el estado de autenticación (isLoggedIn, user, token) del store de Redux.
 * Se utiliza la condición !isLoggedIn || !user || !token para verificar si el usuario está autenticado y si existen datos de usuario y token en el estado de Redux.
 * Si el usuario no está autenticado o faltan datos de usuario o token, se redirige al usuario a la ruta de inicio de sesión especificada en redirectTo.
 * Si el usuario está autenticado y tiene el rol necesario, se muestra el contenido protegido (niños) o se pasa al enrutador secundario (Outlet) si no hay contenido protegido.
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { setUsers, token } from '../../redux/states/userSlice.js';
//import { useLocalStorage } from '../../components/localStorage';
//import { login } from '../../redux/states/authSlice';

const ProtectedRoute = ({ role, children, redirectTo = '/login' }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  if (!isLoggedIn || !user || !token) {
    return <Navigate to={redirectTo} />;
  }// verificar si user y rol exsite
  else if (
    isLoggedIn &&
    user.role &&
    user.role.length > 0 &&
    user.role[0].description.includes(role)
  ) {
    return children ? children : <Outlet />;
  }
};

//   if (
//     getToken() == null &&
//     getUser() == null
//   ) {
//     return <Navigate to={redirectTo} />;
//   } else if (
//     getToken() &&
//     getUser().role[0].description.includes(role)
//   ) {
//     return children ? children : <Outlet />;
//   }
// };

export default ProtectedRoute;
