import { useState, useEffect, useContext } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocalStorage } from 'react-use';

import LayoutH from "../../Components/LayoutHome/index";
import IconLogin from "../../Assets/Img/IconLogin.svg";
import IconRegister from "../../Assets/Img/IconRegister.svg";
import IconHomeLogin from "../../Assets/Img/IconHomeLogin.svg";
import IconEye from "../../Assets/Img/IconEye.svg";
import IconOffEye from "../../Assets/Img/IconOffEye.svg";

import { AppContext } from '../../Context';

function Login() {
  let context = useContext(AppContext)
  let navigate = useNavigate();

  const [userPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, form);
    if (data.status === parseInt("401")) {
      setErrorMessage(data.response);
    } else {
      localStorage.setItem("token", data.access_token)
      localStorage.setItem('data', JSON.stringify(data.user))
      
      context.setIsLoggedIn(true);
      navigate(`/${data.user.role}`)
    }
  };

  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center">
          <form className="w-72 h-96" onSubmit={handleLogin}>
            <div className="flex items-center justify-center">
              <img
                src={IconHomeLogin}
                alt="Icono para home"
                className="h-20 w-20 mb-3"
              />
            </div>
            <h2 className="text-2xl text-center font-bold mb-2">
              Bienvenido !
            </h2>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresar correo electronico"
                className="mt-1 p-2 border rounded w-full
               "
              />
            </div>
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Ingresar contraseña"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img
                    className="h-5 w-5 text-gray-400"
                    src={IconEye}
                    alt="ÍconoEyeOn"
                  />
                ) : (
                  <img
                    className="h-5 w-5 text-gray-400 "
                    src={IconOffEye}
                    alt="ÍconoEyeOff"
                  />
                )}
              </button>
            </div>
            <div className="text-right mb-2">
              <Link
                to="/resetPassword"
                className="text-[14px]
             text-blue-600"
              >
                {" "}
                Recurperar contraseña{" "}
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex bg-[#28537E] text-white px-2 py-0 
              rounded hover:bg-[#46525e] 
              items-center w-auto h-auto
              "
              >
                <span className=" text-xs">Registrarse</span>

                <img
                  src={IconRegister}
                  alt="Ícono sesión"
                  className="px-2 w-8 h-8"
                />
              </button>

              <button
                type="submit"
                className="flex bg-[#28537E] text-white px-2 py-0
              rounded hover:bg-[#46525e]
              items-center w-auto h-auto"
              >
                <span className="ml-1 text-xs">Iniciar Sesión</span>
                <img
                  src={IconLogin}
                  alt="Ícono sesión"
                  className="px-2 w-8 h-8 "
                />
              </button>
            </div>
          </form>        
      </div>
    </LayoutH>
  );
}

export default Login;
