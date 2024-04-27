import { NavLink } from "react-router-dom";
import { useContext } from "react";

import IconMenu from "../../assets/Img/IconMenu.svg";
import IconBook from "../../assets/Img/IconBook.svg";
import IconHome from "../../assets/Img/IconHome.svg";
import IconLoginMenu from "../../assets/Img/IconLoginMenu.svg";

//import
//import
import LogOut from "../../components/Logout";
import { useLocalStorage } from '../../components/localStorage'

const LayoutAdmin = ({ children }) => {
  
  const [getUser, setUser] = useLocalStorage('user');  
  const [getIsLogged, setIsLogged] = useLocalStorage('isLogged');

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
              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconHome}
                  alt="Icono book 1"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs">
                  <NavLink to="/">Home</NavLink>
                </p>
              </li>

              <li className="text-white opacity-70 sm:p-0">
                <p className="text-xs flex items-center justify-center">
                  Programas académicos:
                </p>
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 2"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs">
                  {" "}
                  <NavLink to="/1">Ingeniería de sistemas </NavLink>{" "}
                </p>
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 3"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs"> Comercio exterior </p>
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 4"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs"> Ingenieria Industrial </p>
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
                <h2 className="text-2xl font-bold mb-4">
                  Bienvenido,{getUser.name}!
                  {JSON.parse(window.localStorage.getItem("data")).name}!
                </h2>
                <LogOut />
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
