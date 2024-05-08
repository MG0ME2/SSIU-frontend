import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

// IMAGES
import IconSaves from '../../assets/Img/IconSaves.svg';
import IconHomeLogin from "../../assets/Img/IconHomeLogin.svg";

//COMPONENTS
import ButtonPrimary from '../../components/Buttons/primary';
import IconEye from "../../assets/Img/IconEye.svg";
import IconOffEye from "../../assets/Img/IconOffEye.svg";


const ChangePasswordPopup = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 
    // // utilizar 2 onclick
    // const handleButtonClick = () => {
    //   togglePasswordVisibility(); // Primera función onClick
    //   onClose(); // Segunda función onClick
    // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'toggleVisibility') togglePasswordVisibility();
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    onClose();
  };



  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md ">
        
      <div className="flex items-center justify-center">
          <img
            src={IconHomeLogin}
            alt="Icono para home"
            className="w-20 object-cover"
          />
        </div>
        {/*
         <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
  />*/}

        <div className="flex items-center justify-center">
        <h2 className="text-lg font-semibold mb-4">Cambiar Contraseña</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              autoComplete="currentPassword"
              placeholder="Ingresar contraseña actual"
              value={currentPassword}
              onChange={handleChange}
             // onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full pr-10"
              required
            />
            <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={togglePasswordVisibility}
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Alinea el botón verticalmente
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

          <div className="mb-4">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="newPassword"
              placeholder="Ingresar nueva contraseña"
              value={newPassword}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              autoComplete="newPassword"
              placeholder="Confirmar ngresar contraseña"
              value={confirmNewPassword}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <ButtonPrimary
              title={'Guardar'}
              icono={IconSaves}
              typeB="submit"
              to={'/graduates/Perfil'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
