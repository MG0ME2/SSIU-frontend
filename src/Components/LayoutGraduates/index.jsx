import { NavLink } from "react-router-dom";
import { useContext } from "react";


import ImgGraduat from "../../Assets/Img/ReemplaceImg.svg";
import IconBook from "../../Assets/Img/IconBook.svg";
import IconHome from "../../Assets/Img/IconHome.svg";

//import
import { AppContext } from "../../Context";
import LogOut from "../../Components/Logout";

import React from "react";

const LayoutGraduates = ({ children }) => {
  let context = useContext(AppContext);
  return (
    <div className="flex h-screen p-1 ">
      <div
        className="bg-[#28537E] rounded-lg p-2
       text-white w-52 flex gap-2 flex-col"
      >
        <div className="flex items-center justify-start mt-2 px-2">
          <img
            src={ImgGraduat}
            alt="Icono para home"
            className="w-12 mr-4 object-cover"
          />
          <p className="text-xs">
                  Graduado
                </p>
        </div>

        <div className="flex justify-between flex-col h-full ">
          <div className="my-4">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center mb-3 mt-0 px-2 cursor-pointer">
                <img
                  src={IconHome}
                  alt="Icono book 1"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs">
                  <NavLink to="/graduates">Home</NavLink>
                </p>
              </li>

              <li className="text-white opacity-70 sm:p-0">
                
                <hr className="border-t border-gray-300 mx-4" />
             
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 2"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs">
                  {" "}
                  <NavLink to="/graduates/Perfil">Perfil </NavLink>{" "}
                </p>
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 3"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs"> Responder Instrumento MDI </p>
              </li>

              <li className="flex items-center mb-3 mt-3 px-2 cursor-pointer">
                <img
                  src={IconBook}
                  alt="Icono book 4"
                  className="w-4 h-4 mr-2"
                />
                <p className="text-xs"> Registrar Proyecto </p>
              </li>
            </ul>
          </div>

          <div>
            {!context.isLoggedIn ? (
              <button
                className="flex items-center px-1 py-1
                        mt-20 md:mb-0 mx-auto 
                      bg-[#28537E] text-white rounded-md
                        border border-white
                      hover:bg-[#46525e] w-auto h-auto mb-4"
              >
                <span className="ml-1 text-xs">
                  {" "}
                  <NavLink to="/"> Cerrar sesión</NavLink>
                </span>
              </button>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  Bienvenido,{" "}
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

export default LayoutGraduates;
