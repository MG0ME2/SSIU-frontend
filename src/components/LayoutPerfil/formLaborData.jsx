import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setDniType, setUsers } from '../../redux/states/userSlice.js';
import ButtonPrimary from '../Buttons/primary.jsx';
import IconSaves from '../../assets/Img/IconSaves.svg';

function DatosLaborales() {
  //useState
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  // nacionalidad y sector  add
  const [optionGenders, setOptionGenders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  // Estados locales para los campos del formulario
  const [empresaActual, setEmpresaActual] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [sectorLaboral, setSectorLaboral] = useState('');
  const [contactoEmpresa, setContactoEmpresa] = useState('');
  const [cargoEmpresa, setCargoEmpresa] = useState('');
  const [selectedGender, setSelectedGender] = useState(user.gender.id);

  // alerts
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
    /* const getDniTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dni-types`
        );
        if (response.data.length > 1) {
          dispatch(setDniType(response.data[0]));
          setOptions(response.data);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        notifyE();
      }
    };
    getDniTypes();*/

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
      empresaActual,
      direccionEmpresa,
      sectorLaboral,
      contactoEmpresa,
      cargoEmpresa,
      genderId: selectedGender,
    //  geographicLocationId: selectedOption || user.geographic_location.id,
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
        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleUpdate}
        >
          <div className="grid grid-cols-2 gap-x-8 ">
            <div className="flex flex-col justify-center gap-4">
              <div className="relative">
                {empresaActual && (
                  <label
                    htmlFor="empresaActual"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                   Nombre de empresa actual
                  </label>
                )}
                <input
                  type="text"
                  id="empresaActual"
                  name="empresaActual"
                  placeholder="Nombre de empresa actual"
                  className="mt-1 p-2 border rounded"
                  value={empresaActual}
                  onChange={(e) => setEmpresaActual(e.target.value)}
                />
              </div>

              <div className="relative">
                {direccionEmpresa && (
                  <label
                    htmlFor="direccionEmpresa"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Dirección de la empresa
                  </label>
                )}
                <input
                  type="text"
                  id="direccionEmpresa"
                  name="direccionEmpresa"
                  placeholder="Dirección de la empresa"
                  className="mt-1 p-2 border rounded"
                  value={direccionEmpresa}
                  onChange={(e) => setDireccionEmpresa(e.target.value)}
                />
              </div>

              <div className="relative">
                {selectedGender && (
                  <label
                    htmlFor="gender"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Sector de la empresa
                  </label>
                )}
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  id="gender"
                  name="gender"
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
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="relative">
                {contactoEmpresa && (
                  <label
                    htmlFor="contactoEmpresa"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Contacto de la empresa
                  </label>
                )}
                <input
                  type="text"
                  id="contactoEmpresa"
                  name="contactoEmpresa"
                  placeholder="Contacto de la empresa"
                  className="mt-1 p-2 border rounded"
                  value={contactoEmpresa}
                  onChange={(e) => setContactoEmpresa(e.target.value)}
                />
              </div>

              <div className="relative">
                {cargoEmpresa && (
                  <label
                    htmlFor="cargoEmpresa"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Cargo en la empresa
                  </label>
                )}
                <input
                  type="text"
                  id="cargoEmpresa"
                  name="cargoEmpresa"
                  placeholder="Cargo en la empresa"
                  className="mt-1 p-2 border rounded"
                  value={cargoEmpresa}
                  onChange={(e) => setCargoEmpresa(e.target.value)}
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
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  id="gender"
                  name="gender"
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
            </div>
          </div>

          <ButtonPrimary title={'Guardar'} icono={IconSaves} typeB="submit" />
        </form>
      </div>
    </div>
  );
}

export default DatosLaborales;
