import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

//IMAGENES
import IconMenu from '../../assets/Img/IconMenu.svg';
import IconBook from '../../assets/Img/IconBook.svg';
import IconHome from '../../assets/Img/IconHome.svg';
import IconLogin from "../../assets/Img/IconLogin.svg";

//COMPONENTES
import LogOut from '../../components/Logout';
import { useLocalStorage } from '../../components/localStorage';
import NavItem from '../NavItem';
import ButtonOutline from "../../components/Buttons/outline";


const LayoutH = ({ children }) => {
  // const [getUser, setUser] = useLocalStorage('user');
  // const [getIsLogged, setIsLogged] = useLocalStorage('isLogged');
  const user = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  return (
    <div className="flex h-screen p-1 ">
      <div
        className="bg-[#28537E] rounded-lg p-2
       text-white w-52 flex gap-2 flex-col"
      >
        <div className="flex items-center justify-center">
          <img
            src={IconMenu}
            alt="Icono para home"
            className="w-44 object-cover"
          />
        </div>

        <div className="flex justify-between flex-col h-full ">
          <div className="my-4">
            <ul className="flex flex-col gap-2">
              <li>
                <NavItem to="/" currentPath={location.pathname}>
                  <img
                    src={IconHome}
                    alt="Icono book 1"
                    className="w-4 h-4 mr-2"
                  />
                  Inicio
                </NavItem>
              </li>

              <li className="text-white opacity-70 sm:p-0">
                <p className="text-xs flex items-center justify-center">
                  Programas Académicos:
                </p>
              </li>

              <li>
                <NavItem to="/1" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Ingeniería de sistemas
                </NavItem>
              </li>

              <li>
                <NavItem to="" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Comercio exterior
                </NavItem>
              </li>

              <li>
                <NavItem to="" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Ingeniería industrial
                </NavItem>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            {isLoggedIn ? (
              <div>
                <h2 className="text-xs font-bold mb-4">
                  {/* Bienvenido, {getUser().name}! */}
                  Bienvenido, {user ? user.name : 'Usuario'}!
                </h2>
                <LogOut />
              </div>
            ) : (
              <ButtonOutline
                title={'Iniciar sesion'}
                icono={IconLogin}
                typeB="button"
                to={'/login'}
              />
            )}
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default LayoutH;
