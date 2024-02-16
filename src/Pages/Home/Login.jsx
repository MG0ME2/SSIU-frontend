import { useState } from "react";
import { Link } from "react-router-dom";
import LayoutH from "../../Components/LayoutHome/index";


import IconLogin from "../../Assets/Img/IconLogin.svg";
import IconRegister from "../../Assets/Img/IconRegister.svg";
import IconHomeLogin from "../../Assets/Img/IconHomeLogin.svg";
import IconEye from "../../Assets/Img/IconEye.svg";
import IconOffEye from "../../Assets/Img/IconOffEye.svg";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center">
        {!isLoggedIn ? (
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
                type="text"
                id="username"
                placeholder="Ingresar correo electronico"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded w-full
               "
              />
            </div>
            <div className="mb-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresar contraseña"
                value={password}
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
                    alt="Ícono sesión"
                  />
                ) : (
                  <img
                    className="h-5 w-5 text-gray-400 "
                    src={IconOffEye}
                    alt="Ícono sesión"
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
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Bienvenido, {username}!</h2>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </LayoutH>
  );
}

export default Login;
