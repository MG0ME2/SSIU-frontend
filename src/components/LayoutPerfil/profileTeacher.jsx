import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

// IMAGES
import IconDelete from '../../assets/Img/IconDelete.svg';
import IconUpload from '../../assets/Img/IconUpload.svg';
import IconSaves from '../../assets/Img/IconSaves.svg';
import UserProfile from '../../assets/Img/UserProfile.svg';

//COMPONENTS
import DatosPersonales from './formPersonal.jsx';
import DatosLaborales from './formLaborData.jsx';
import DatosResidencia from './formResidence.jsx';
import DatosEducation from './formEducation.jsx';
import ChangePasswordPopup from './popupsperfil.jsx';


const LayoutPerfilTeacher = () => {
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
    <div className="flex flex-grow items-center justify-center flex-col mb-4">
      <div className="flex justify-center m-4">
        <img className="w-40 h-40 rounded-full border-2" src={'https://robohash.org/hola}?40x40'} alt="PhotoUser"/>
      </div>
      <div>
        <p className="flex text-[#428BCA] justify-center font-semibold underline text-base mt-2 mb-2">
          <Link to="#" onClick={handlePopupsPassword}>
            Cambiar contraseña
          </Link>
        </p>
        {/* Renderiza el popup solo si showChangePassword es true */}
        {showChangePassword && (
          <ChangePasswordPopup onClose={handlePopupsPassword}/>
        )}
      </div>
      
      {/* Tab */}
      <div className="flex flex-col items-center h-[42%] gap-4">
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
              activeTab === 'residencia'
                ? 'px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none'
                : 'bg-[#777777] bg-opacity-10'
            }`}
            onClick={() => tab('residencia')}
            aria-selected={activeTab === 'residencia'}
          >
            Lugar de Residencia
          </button>
     
          <button
            className={`px-4 py-2 rounded-t-lg ${
              activeTab === 'estudios'
                ? 'px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none'
                : 'bg-[#777777] bg-opacity-10'
            }`}
            onClick={() => tab('estudios')}
            aria-selected={activeTab === 'estudios'}
          >
            Estudios actuales
          </button>

        </div>
        
        <div className="w-[700px] ">
        {activeTab === 'datos' && <DatosPersonales />}
          {activeTab === 'residencia' && <DatosResidencia />}
          {activeTab === 'estudios' && <DatosEducation />} 
        </div>
      </div>
    </div>
  );
}

export default LayoutPerfilTeacher;