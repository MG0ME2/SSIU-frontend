import { useState, useEffect, useContext } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LayoutH from '../../components/LayoutHome/index';
import IconLogin from '../../assets/Img/IconLogin.svg';
import IconRegister from '../../assets/Img/IconRegister.svg';
import IconHomeLogin from '../../assets/Img/IconHomeLogin.svg';
import IconEye from '../../assets/Img/IconEye.svg';
import IconOffEye from '../../assets/Img/IconOffEye.svg';

import { useLocalStorage } from '../../components/localStorage';
import { login } from '../../redux/states/authSlice';
import ButtonPrimary from '../../components/Buttons/primary';

function Login() {
  const notify = () => {
    toast.warning(getWarnignMessage());
  };

  const dispatch = useDispatch();
  let navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);
  // const [optionRoles, setOptionRoles] = useState([]);

  //Variables para manejo de la contraseña
  const [email, setEmail] = useState('');
 // const [userData, setUserData] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //const [selectedRole, setSelectedRole] = useState('');

  const [getWarnignMessage, setWarnignMessage] =
    useLocalStorage('warnignLogin');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const notifyE = () => {
  //   toast.error('Error al actualizar los datos', {
  //     position: 'top-right',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light',
  //   });
  // };

  // useEffect(() => {
  //   const getRoles = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/roles`
  //       );
  //       if (response.data.length > 0) {
  //         setOptionRoles(response.data);
  //       } else {
  //         setOptionRoles([]);
  //       }
  //     } catch (error) {
  //       console.error('Error al obtener los datos:', error);
  //       notifyE();
  //     }
  //   };
  //   getRoles();
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get('email'),
//      roleId: selectedRole,
      password: formData.get('password'),
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      form
    );

    if (data.status === parseInt('401')) {
      setErrorMessage(data);
    } else if (data.error) {
      // comentario de jose
      setWarnignMessage(data.error);
      notify();
    } else {
      dispatch(login({ user: data.user, token: data.access_token }));
      navigate(`/${data.user.role[0].description}`);
    }
  };

  return (
    <LayoutH>
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center">
        <form className="w-72 h-96" onSubmit={handleLogin}>
          <div className="flex items-center justify-center">
            <img
              src={IconHomeLogin}
              alt="Icono para home"
              className="h-20 w-20 mb-3"
            />
          </div>
          <h2 className="text-2xl text-center font-bold mb-2">Bienvenido !</h2>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Ingresar correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border rounded w-full
               "
            />
          </div>
          {/* role 

          <div className="relative">
            {selectedRole && (
              <label
                htmlFor="role"
                className="absolute -top-4 left-2 text-xs text-gray-600"
              >
                Rol
              </label>
            )}
            <select
              className="mt-1 p-2 border rounded w-full"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              id="role"
              name="role"
            >
              <option value="" disabled>
                Seleccionar rol
              </option>
              {optionRoles.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              ))}
            </select>
          </div>*/}

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              required
              autoComplete="password"
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
              Recurperar contraseña{' '}
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <ButtonPrimary
              title={'Registrarse'}
              icono={IconRegister}
              typeB="button"
              to={'/signup'}
            />

            <ButtonPrimary
              title={'Iniciar Sesión'}
              icono={IconLogin}
              typeB="submit"
              to={''}
            />
          </div>
        </form>
      </div>
    </LayoutH>
  );
}

export default Login;
