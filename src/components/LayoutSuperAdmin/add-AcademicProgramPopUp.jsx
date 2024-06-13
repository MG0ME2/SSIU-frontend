import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector  } from 'react-redux';
// components
import ButtonPrimary from '../Buttons/primary';
import ButtonOnclick from '../Buttons/onclick'
// icon
import IconAdd from '../../assets/Img/IconAdd.svg';
import IconUpload from '../../assets/Img/IconUpload.svg';
//redux
import { setPhotoUrl  } from '../../redux/states/photoSlice'; // Importa la acción de Redux



const AddAcademicProgramsPopUp = ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [programsAcedemicName, setprogramsAcedemicName] = useState('');
  const [programsAcedemicStatus, setprogramsAcedemicStatus] = useState('');
  const [programsAcedemicEmail, setprogramsAcedemicEmail] = useState('');

  const photoUrl = useSelector((state) => state.photo.photoUrl);


  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo seleccionado
    if (file) {
      // Simular la subida de la foto y obtener la URL
      const uploadedPhotoUrl = URL.createObjectURL(file);

      // Dispatch para almacenar la URL de la foto en Redux
      dispatch(setPhotoUrl(uploadedPhotoUrl));
      // prueba url (eliminar)
      console.log("URL de la foto cargada:", uploadedPhotoUrl);
    }
  };

  const handleClickUpload = () => {
    // Hacer click en el input file
    document.getElementById('fileInput').click();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-2xl">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">Añadir Programa Academico</h2>
        </div>
        <form className="flex flex-wrap -mx-4">
          <div className="w-full md:w-2/3 px-4">
            <fieldset className="mb-6">
              <legend className="text-lg font-semibold text-blue-600 mb-5">Datos Del Programa</legend>
  
              <div className="relative mb-4">
                {programsAcedemicName && (
                  <label
                    htmlFor="programsAcedemicName"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Nombre del programa academico
                  </label>
                )}
                <input
                  type="text"
                  name="programsAcedemicName"
                  placeholder="Nombre Del Programa"
                  value={programsAcedemicName}
                  onChange={(e) => setprogramsAcedemicName(e.target.value)}
                  className="mt-1 p-2 border rounded"
                  required
                />
                <span className="text-red-600 text-sm ml-1">Obligatorio *</span>
              </div>
  
              <div className="relative mb-4">
                {programsAcedemicStatus && (
                  <label
                    htmlFor="programsAcedemicStatus"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Código del programa
                  </label>
                )}
                <input
                  type="text"
                  name="programsAcedemicStatus"
                  placeholder="Código Del Programa"
                  value={programsAcedemicStatus}
                  onChange={(e) => setprogramsAcedemicStatus(e.target.value)}
                  className="mt-1 p-2 border rounded"
                  required
                />
                <span className="text-red-600 text-sm ml-1">Obligatorio *</span>
              </div>
            </fieldset>
            <fieldset className="mb-6">
              <legend className="text-lg font-semibold text-blue-600 mb-5">Datos De Acceso</legend>
  
              <div className="relative mb-4">
                {programsAcedemicEmail && (
                  <label
                    htmlFor="programsAcedemicEmail"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Correo electronico
                  </label>
                )}
                <input
                  type="email"
                  name="programsAcedemicEmail"
                  placeholder="Correo electronico"
                  value={programsAcedemicEmail}
                  onChange={(e) => setprogramsAcedemicEmail(e.target.value)}
                  className="mt-1 p-2 border rounded"
                  required
                />
                <span className="text-red-600 text-sm ml-1">Obligatorio *</span>
              </div>
            </fieldset>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <fieldset className="mb-6">
              <legend className="text-lg font-semibold text-blue-600 mb-2">Logo Del Programa</legend>
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                <img src={photoUrl || "/path/to/placeholder-image.png"} alt="Logo Del Programa" />
                </div>
              </div>
              <div className="flex justify-center mb-4">
              <ButtonOnclick icono={IconUpload} title="Subir foto" onClick={handleClickUpload} />
              </div>
            </fieldset>
            <div className="flex justify-center">
            <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
              <ButtonPrimary icono={IconAdd} title="Guardar Y Añadir" typeB="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAcademicProgramsPopUp;
