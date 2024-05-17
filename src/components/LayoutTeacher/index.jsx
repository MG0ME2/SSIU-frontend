import {NavLink, useLocation} from 'react-router-dom';

//IMAGENES
import IconMenu from '../../assets/Img/IconMenu.svg';
import IconBook from '../../assets/Img/IconBook.svg';
import IconHome from '../../assets/Img/IconHome.svg';
import IconLoginMenu from '../../assets/Img/IconLoginMenu.svg';

//COMPONENTES
import LogOut from '../../components/Logout';
import {useLocalStorage} from '../../components/localStorage';
import NavItem from '../NavItem';

const LayoutT = ({children}) => {
  const [getUser, setUser] = useLocalStorage('user');
  const [getIsLogged, setIsLogged] = useLocalStorage('isLogged');
  
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
              
              <li>
                <NavItem to="/1" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Perfil
                </NavItem>
              </li>
              
              <li>
                <NavItem to="/1" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Responder Instrumento MDI
                </NavItem>
              </li>
              
              <li>
                <NavItem to="/1" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Registrar proyectos
                </NavItem>
              </li>
            </ul>
          </div>
          
          <div>
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
            )}
          </div>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default LayoutT;
