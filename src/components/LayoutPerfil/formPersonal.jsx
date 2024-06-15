import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useLocalStorage } from '../localStorage/index.jsx';
import ButtonPrimary from '../Buttons/primary.jsx';
import IconSaves from '../../assets/Img/IconSaves.svg';
import { fetchUsersData } from '../../redux/states/authSlice.js';

function DatosPersonales() {
  //useState
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [options, setOptions] = useState([]);
  const [optionGenders, setOptionGenders] = useState([]);

  // Estados locales para los campos del formulario
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDniType, setSelectedDniType] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  //Alertas
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

  useEffect(() => {
    // Función para obtener los datos del usuario
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`
        );
        setName(response.data.name);
        setLastName(response.data.last_name);
        setDni(response.data.dni);
        setEmail(response.data.email);
        setAltEmail(response.data.alt_email);
        setPhoneNumber(response.data.phone_number);
        setSelectedDniType(response.data.dniTypeId);
        setSelectedGender(response.data.genderId);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        notifyE();
      }
    };
    fetchUserData();
  }, [user.id]);

  useEffect(() => {
    const getDniTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/dni-types`
        );
        if (response.data.length > 1) {
          setOptions(response.data);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        notifyE();
      }
    };
    getDniTypes();

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

    console.log('ACTUALIZA PERFIL');

    const form = {
      name,
      last_name: lastName,
      dni: dni,
      dniTypeId: selectedDniType,
      email,
      alt_email: altEmail.length > 1 ? altEmail : null,
      phone_number: phoneNumber,
      genderId: selectedGender,
    };

    console.log(form);

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

    console.log(data);

    if (data.status === 401) {
      notifyE();
    } else {
      dispatch(fetchUsersData(data));
      notifyS();
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
          <div className="grid grid-cols-2 gap-x-8 w-[700px]">
            <div className="flex flex-col justify-center gap-4">
              <div className="relative w-full">
                {name && (
                  <label
                    htmlFor="name"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Nombre
                  </label>
                )}
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Traer nombre de la BD"
                  className="mt-1 p-2 border rounded w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                {selectedDniType && (
                  <label
                    htmlFor="dniType"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Tipo de DNI
                  </label>
                )}
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={selectedDniType}
                  disabled
                  onChange={(e) => setSelectedDniType(e.target.value)}
                  id="dniType"
                  name="dniType"
                >
                  <option key={user.dni_type.id} value={user.dni_type.id}>
                    {user.dni_type.description}
                  </option>
                  {options?.map(
                    (option) =>
                      option.id !== user.dni_type.id && (
                        <option key={option.id} value={option.id}>
                          {option.description}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="relative w-full">
                {selectedGender && (
                  <label
                    htmlFor="gender"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Género
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
                  {!optionGenders?.map(
                    (option) =>
                      option.id !== user.gender.id && (
                        <option key={option.id} value={option.id}>
                          {option.description}
                        </option>
                      )
                  )}
                </select>
              </div>

              <div className="relative w-full">
                {email && (
                  <label
                    htmlFor="email"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Correo Institucional
                  </label>
                )}
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled
                  placeholder="Correo Institucional"
                  className="mt-1 p-2 border rounded w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="relative w-full">
                {lastName && (
                  <label
                    htmlFor="last_name"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Apellido
                  </label>
                )}
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  placeholder="Traer apellido de la BD"
                  className="mt-1 p-2 border rounded w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                {dni && (
                  <label
                    htmlFor="dni"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Número de identificación
                  </label>
                )}
                <input
                  type="number"
                  id="dni"
                  name="dni"
                  required
                  disabled
                  placeholder="Número de identificación"
                  className="mt-1 p-2 border rounded w-full"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                {altEmail && (
                  <label
                    htmlFor="alt_email"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Correo alternativo
                  </label>
                )}
                <input
                  type="email"
                  id="alt_email"
                  name="alt_email"
                  placeholder="Correo alternativo"
                  className="mt-1 p-2 border rounded w-full"
                  value={altEmail}
                  onChange={(e) => setAltEmail(e.target.value)}
                />
              </div>

              <div className="relative w-full">
                {phoneNumber && (
                  <label
                    htmlFor="phone_number"
                    className="absolute -top-4 left-2 text-xs text-gray-600"
                  >
                    Número de teléfono
                  </label>
                )}
                <input
                  type="number"
                  id="phone_number"
                  name="phone_number"
                  required
                  placeholder="Número de teléfono"
                  className="mt-1 p-2 border rounded w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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

export default DatosPersonales;
