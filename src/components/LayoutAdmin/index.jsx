import {NavLink, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//IMAGENES
import IconLogin from "../../assets/Img/IconLogin.svg";
import UserProfile from '../../assets/Img/UserProfile.svg';
import IconBook from '../../assets/Img/IconBook.svg';
import IconHome from '../../assets/Img/IconHome.svg';

//COMPONENTES
import ExitSesion from '../../components/Logout/exitsesion';
import NavItem from '../NavItem';

const LayoutAdmin = ({ children }) => {
  // const [getUser, setUser] = useLocalStorage('user');
  // const [getIsLogged, setIsLogged] = useLocalStorage('isLogged');
  // const location = useLocation();
  
  const dispatch = useDispatch();
  const { user, isLogged } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="flex h-screen p-1 ">
      <div
        className="bg-[#28537E] rounded-lg p-2
       text-white w-52 flex gap-2 flex-col"
      >
          <div className="flex items-center text-xs ml-2">
          <ul>
            <img
              src={UserProfile}
              alt="Icono para home"
              className="w-11 h-full"
            />
          </ul>
          <p className="pl-2"> Admin name</p>
        </div>

        <div className="flex justify-between flex-col h-full ">
          <div className="my-4">
            <ul className="flex flex-col gap-2">
              <li>
                <NavItem to="/admin" currentPath={location.pathname}>
                  <img
                    src={IconHome}
                    alt="Icono book 1"
                    className="w-4 h-4 mr-2"
                  />
                  Inicio
                </NavItem>
              </li>

              <li>
                <NavItem to="/admin/perfil" currentPath={location.pathname}>
                  <img
                    src={IconHome}
                    alt="Icono book 1"
                    className="w-4 h-4 mr-2"
                  />
                  Perfil
                </NavItem>
              </li>

              <li>
                <NavItem to="/admin" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Modelo SSIU
                </NavItem>
              </li>

              <li className="text-white opacity-70 sm:p-0">
                <p className="text-xs flex items-center justify-center">
                  Reportes:
                </p>
              </li>

              <li>
                <NavItem to="/admin" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Reportes MDI
                </NavItem>
              </li>

              <li>
                <NavItem to="/admin" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Configuracion de privacidad
                </NavItem>
              </li>
            </ul>
          </div>

          {/* <div>
            {!getIsLogged() ? (
              <button
                className="flex items-center px-1 py-1
                        mt-20 md:mb-0 mx-auto 
                      bg-[#28537E] text-white rounded-md
                        border border-white
                      hover:bg-[#46525e] w-auto h-auto mb-4"
              >
                <span className="ml-1 text-xs">
                  {" "}
                  <NavLink to="/login">Iniciar Sesión </NavLink>
                </span>
                <img
                  src={IconLoginMenu}
                  alt="Ícono de inicio de sesión"
                  className="px-1 mb-0,5 w-5 h-5"
                />
              </button>
            ) : (
              <div>
                <h2 className="text-xs font-bold mb-4">
                  Bienvenido, {getUser().name}!
                </h2>
                <LogOut/>
              </div>
            )} */}
          <div className="flex items-center justify-center ">
            {!isLogged ? (
              <ExitSesion title={'Cerrar sesión'} icono={IconLogin} />
            ) : (
              <div>
                <h2 className="text-xs font-bold mb-4">
                  Bienvenido, {user.name}!
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default LayoutAdmin;
