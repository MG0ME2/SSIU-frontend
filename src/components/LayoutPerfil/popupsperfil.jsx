import React, {useState} from 'react';
import {FaTimes} from 'react-icons/fa';

// IMAGES
import IconSaves from '../../assets/Img/IconSaves.svg';
import IconHomeLogin from '../../assets/Img/IconHomeLogin.svg';
import IconEye from '../../assets/Img/IconEye.svg';
import IconOffEye from '../../assets/Img/IconOffEye.svg';

//COMPONENTS
import ButtonPrimary from '../Buttons/primary.jsx';

const ChangePasswordPopup = ({onClose}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false
  });
  
  const handleTogglePasswordVisibility = (passwordName) => {
    setShowPasswords({
      ...showPasswords,
      [passwordName]: !showPasswords[passwordName]
    });
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    onClose();
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative w-11/12 max-w-md z-50">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <img
            src={IconHomeLogin}
            alt="Icono para home"
            className="w-20 object-cover"
          />
        </div>
        <h2 className="text-lg font-semibold mb-4 text-center">Cambiar Contraseña</h2>
        <form onSubmit={handleSave}>
          <div className="relative mb-4">
            <input
              type={showPasswords.currentPassword ? 'text' : 'password'}
              id="currentPassword"
              name="currentPassword"
              autoComplete="currentPassword"
              placeholder="Ingresar contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3"
              onClick={() => handleTogglePasswordVisibility('currentPassword')}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPasswords.currentPassword ? (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconEye}
                  alt="Ícono Eye On"
                />
              ) : (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconOffEye}
                  alt="Ícono Eye Off"
                />
              )}
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type={showPasswords.newPassword ? 'text' : 'password'}
              id="newPassword"
              name="newPassword"
              autoComplete="newPassword"
              placeholder="Ingresar nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3"
              onClick={() => handleTogglePasswordVisibility('newPassword')}
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                right: '8px',
              }}
            >
              {showPasswords.newPassword ? (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconEye}
                  alt="Ícono Eye On"
                />
              ) : (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconOffEye}
                  alt="Ícono Eye Off"
                />
              )}
            </button>
          </div>

          <div className="relative mb-4">
            <input
              type={showPasswords.confirmNewPassword ? 'text' : 'password'}
              id="confirmNewPassword"
              name="confirmNewPassword"
              autoComplete="newPassword"
              placeholder="Confirmar nueva contraseña"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 p-2 border rounded w-full pr-10"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3"
              onClick={() => handleTogglePasswordVisibility('confirmNewPassword')}
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
                right: '8px',
              }}
            >
              {showPasswords.confirmNewPassword ? (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconEye}
                  alt="Ícono Eye On"
                />
              ) : (
                <img
                  className="h-5 w-5 text-gray-400"
                  src={IconOffEye}
                  alt="Ícono Eye Off"
                />
              )}
            </button>
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
