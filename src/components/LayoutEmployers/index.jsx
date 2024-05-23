import {NavLink, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//IMAGENES
import IconLogin from "../../assets/Img/IconLogin.svg";
import UserProfile from '../../assets/Img/UserProfile.svg';
import IconBook from '../../assets/Img/IconBook.svg';
import IconHome from '../../assets/Img/IconHome.svg';

//COMPONENTES
import LogOut from '../../components/Logout';
import NavItem from '../NavItem';
import ExitSesion from "../../components/Logout/exitsesion";

const LayoutEmployer = ({children}) => {
  const dispatch = useDispatch();
  const { user, isLogged } = useSelector((state) => state.auth);
 // const [userData, setUserData] = useState({});
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
          <p className="pl-2"> Employed name</p>
        </div>
        
        <div className="flex justify-between flex-col h-full ">
          <div className="my-4">
            <ul className="flex flex-col gap-2">
              <li>
                <NavItem to="/employer" currentPath={location.pathname}>
                  <img
                    src={IconHome}
                    alt="Icono book 1"
                    className="w-4 h-4 mr-2"
                  />
                  Inicio
                </NavItem>
              </li>
              
              <li>
                <NavItem to="/employer/perfil" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Perfil
                </NavItem>
              </li>
              
              <li>
                <NavItem to="/employer" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Responder Instrumento MDI
                </NavItem>
              </li>
              
              <li>
                <NavItem to="/employer" currentPath={location.pathname}>
                  <img
                    src={IconBook}
                    alt="Icono book 2"
                    className="w-4 h-4 mr-2"
                  />
                  Proyectos Asociados
                </NavItem>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center justify-center ">
            {!isLogged ? (
              <ExitSesion
                title={'Cerrar sesión'}
                icono={IconLogin}
              />
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

export default LayoutEmployer;
