import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setDniType, setUsers } from '../../redux/states/userSlice.js';
import ButtonPrimary from '../Buttons/primary.jsx';
import IconSaves from '../../assets/Img/IconSaves.svg';


function DatosEducation() {
  //useState
  const dispatch = useDispatch();
  const [optionGenders, setOptionGenders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // Estados locales para los campos del formulario
  const [tipoEstudio, setTipoEstudio] = useState('');
  const [nombreTitulacion, setNombreTitulacion] = useState('');
  const [nombreInstitucion, setNombreInstitucion] = useState('');
  const [fechaTitulacion, setFechaTitulacion] = useState('');
  // reemplazar por los selector correctos
  const [selectedGender, setSelectedGender] = useState(user.gender.id);

  //alertas
  const notifyVi = () => {
    toast.warn('No se admiten números o símbolos en', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const notifyS = () => {
    toast.success('Se actualizaron los datos exitosamente', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const notifyE = () => {
    toast.error('Error al actualizar los datos', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  
  useEffect(() => {

    // const getDniTypes = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_BACKEND_URL}/dni-types`
    //     );
    //     if (response.data.length > 1) {
    //       dispatch(setDniType(response.data[0]));
    //       setOptions(response.data);
    //     } else {
    //       setOptions([]);
    //     }
    //   } catch (error) {
    //     console.error('Error al obtener los datos:', error);
    //     notifyE();
    //   }
    // };
    // getDniTypes();

    const getGenders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/genders`
        );
        if (response.data.length > 1) {
          setOptionGenders(response.data);
        } else {
          setOptionGenders([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        notifyE();
      }
    };
    getGenders();
  }, [dispatch]);

  const validateInput = (input) => {
    if (!/^[A-Za-z\s]+$/.test(input)) {
      notifyVi();
      return false;
    }
    return true;
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputName = formData.get('name');
    const inputLastName = formData.get('last_name');

    const form = {
      tipoEstudio,
      nombreTitulacion,
      nombreInstitucion,
      fechaTitulacion,
      // reemplace
      genderId: selectedGender,
    };

    if (
      !validateInput(inputName, 'el nombre') ||
      !validateInput(inputLastName, 'el apellido')
    ) {
      return;
    }

    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
      form
    );

    if (data.status === 401) {
      notifyE();
    } else {
      dispatch(setUsers(data));
      setUserData(data);
      notifyS();

    //  )
    }
  };

  return (
    <div>
      <div>
        <ToastContainer />
        <form className="flex flex-col gap-4 items-center" onSubmit={handleUpdate}>
          <div className="grid grid-cols-2 gap-x-8 ">
            <div className="flex flex-col justify-center gap-4">
              <div className="relative">
                {selectedGender && (
                  <label
                    htmlFor="gender"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Tipo de estudio
                  </label>
                )}
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option key={user.gender.id} value={user.gender.id}>
                    {user.gender.description}
                  </option>
                  {optionGenders?.map(
                    (option) =>
                      option.id !== user.gender.id && (
                        <option key={option.id} value={option.id}>
                          {option.description}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="relative">
                {nombreTitulacion && (
                  <label
                    htmlFor="nombreTitulacion"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Nombre de titulación
                  </label>
                )}
                <input
                  type="text"
                  id="nombreTitulacion"
                  name="nombreTitulacion"
                  placeholder="Nombre de titulación"
                  className="mt-1 p-2 border rounded"
                  value={nombreTitulacion}
                  onChange={(e) => setNombreTitulacion(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="relative">
                {nombreInstitucion && (
                  <label
                    htmlFor="nombreInstitucion"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Nombre de la institución educativa
                  </label>
                )}
                <input
                  type="text"
                  id="nombreInstitucion"
                  name="nombreInstitucion"
                  placeholder="Nombre de la institución educativa"
                  className="mt-1 p-2 border rounded"
                  value={nombreInstitucion}
                  onChange={(e) => setNombreInstitucion(e.target.value)}
                />
              </div>

              <div className="relative">
                {selectedGender && (
                  <label
                    htmlFor="gender"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Nacionalidad
                  </label>
                )}
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <option key={user.gender.id} value={user.gender.id}>
                    {user.gender.description}
                  </option>
                  {optionGenders?.map(
                    (option) =>
                      option.id !== user.gender.id && (
                        <option key={option.id} value={option.id}>
                          {option.description}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="relative">
                {fechaTitulacion && (
                  <label
                    htmlFor="fechaTitulacion"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Fecha de titulación
                  </label>
                )}
                <input
                  type="date"
                  id="fechaTitulacion"
                  name="fechaTitulacion"
                  placeholder="Fecha de titulación"
                  className="mt-1 p-2 border rounded w-full"
                  value={fechaTitulacion}
                  onChange={(e) => setFechaTitulacion(e.target.value)}
                />
              </div>
            </div>
          </div>
          <ButtonPrimary title={'Guardar'} icono={IconSaves} typeB="submit" />
        </form>
      </div>
    </div>
  );
}

export default DatosEducation;
