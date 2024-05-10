import React, { useState, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// IMAGES
import IconDelete from '../../assets/Img/IconDelete.svg';
import IconUpload from '../../assets/Img/IconUpload.svg';
import IconSaves from '../../assets/Img/IconSaves.svg';
import UserProfile from '../../assets/Img/UserProfile.svg';

//COMPONENTS
import DatosPersonales from '../../components/LayoutGraduates/TabFormPerfil/formPersonal';
import DatosLaborales from '../../components/LayoutGraduates/TabFormPerfil/formLaborData';
import LayoutGraduates from '../../components/LayoutGraduates/index';
import ButtonPrimary from '../../components/Buttons/primary';
import ChangePasswordPopup from '../../components/LayoutGraduates/popUpsGraduatePerfil/popupsgraduateperfil';

function GraduatesPerfil() {
  const [activeTab, setActiveTab] = useState('datos');

  const tab = (tabs) => {
    setActiveTab(tabs);
  };

  // Estado para controlar la visibilidad del popup
  const [showChangePassword, setShowChangePassword] = useState(false); 

  const handlePopupsPassword = () => {
    setShowChangePassword(!showChangePassword);
  };
  

  return (
    <LayoutGraduates>
      <div className="flex flex-grow items-center justify-center flex-col mb-12">
        <div className="flex justify-center m-4">
          <img src={UserProfile} alt="PhotoUser" />
        </div>

        <div className="flex items-center justify-between space-x-4">
          <ButtonPrimary
            title={'Eliminar imagen'}
            icono={IconDelete}
            typeB="button"
            to={'/'}
          />
          <ButtonPrimary
            title={'Subir imagen'}
            icono={IconUpload}
            typeB="button"
            to={'/'}
          />
        </div>

        <div>
          <p className="flex text-[#428BCA] justify-center text-base mt-2 mb-2">
            <Link to="#" onClick={handlePopupsPassword}>
              Cambiar contraseña
            </Link>
          </p>
          {/* Renderiza el popup solo si showChangePassword es true */}
          {showChangePassword && (
            <ChangePasswordPopup onClose={handlePopupsPassword} />
          )}
        </div>

        {/* Tab */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-full px-4 py-2 rounded-t-lg">
            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 'datos'
                  ? 'px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none'
                  : 'bg-[#777777] bg-opacity-10'
              }`}
              onClick={() => tab('datos')}
              aria-selected={activeTab === 'datos'}
            >
              Datos Personales
            </button>

            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === 'laborales'
                  ? 'px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none'
                  : 'bg-[#777777] bg-opacity-10'
              }`}
              onClick={() => tab('laborales')}
              aria-selected={activeTab === 'laborales'}
            >
              Datos Laborales
            </button>
          </div>

          <div className=" mx-auto max-w-lg">
            {activeTab === 'datos' ? <DatosPersonales /> : <DatosLaborales />}
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 mt-4">
          <ButtonPrimary
            title={'Guardar'}
            icono={IconSaves}
            typeB="button"
            to={'/'}
          />
        </div>
      </div>
    </LayoutGraduates>
  );
}

export default GraduatesPerfil;
