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
import { setDniType, setUsers } from '../../redux/states/userSlice.js';



function DatosPersonales() {
  //useState
  const { register } = useForm();
  const dispatch = useDispatch();
  const { user, dniType } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({}); // Estado local para almacenar los datos del usuario
  const [options, setOptions] = useState([]);
  const [optionGenders, setOptionGenders] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  ///Formulario

  //local storage
  // const [getDniTypesUL, setDniTypesUL] = useLocalStorage('dniTypes');
  // const [getGendersUl, setGendersUl] = useLocalStorage('status');
  //  const [getUser, setUser] = useLocalStorage('user');
  // const [getWarnignMessage, setWarnignMessage] = useLocalStorage('warnignUpdate');
  // const [getSuccessMessage, setSuccessMessage] = useLocalStorage('successUpdate');
  //const [getValidateInput, setValidateInput] = useLocalStorage('warnignUpdate');

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
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`);
    setUserData(response.data);
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

    const inputDniType = document.getElementById('dniType');
    const inputDni = document.getElementById('dni');
    const inputEmail = document.getElementById('email');
    const inputName = formData.get('name');
    const inputLastName = formData.get('last_name');

    const form = {
      name: inputName,
      last_name: inputLastName,
      dni: inputDni.disabled ? user.dni : parseInt(formData.get('dni')),
      dniTypeId: inputDniType.disabled? user.dni_type.id : parseInt(formData.get('dniType')),
      email: inputEmail.disabled ? user.email : formData.get('email'),
      alt_email: formData.get('alt_email').length > 1 ? formData.get('alt_email') : null,
      phone_number: parseInt(formData.get('phone_number')),
      genderId: parseInt(formData.get('gender')),
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
          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex flex-col justify-center gap-4">
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Traer nombre de la BD"
                className="mt-1 p-2 border rounded"
                defaultValue={user.name}
              />
              <select
                className="mt-1 p-2 border rounded w-full"
                value={selectedOption ? selectedOption : user.dni_type.id}
                onChange={(e) => setSelectedOption(e.target.value)}
                disabled
                id="dniType"
                name="dniType"
              >
                <option key={user.dni_type.id} value={user.dni_type.id}>
                  {' '}
                  {user.dni_type.description}
                </option>
                {options?.map((option) => {
                  if (option.id === user.dni_type.id) {
                    return null; // Devolver null para excluir este dato del mapeo
                  }
                  return (
                    <option key={option.id} value={option.id}>
                      {option.description}
                    </option>
                  );
                })}
              </select>
              <select
                className="mt-1 p-2 border rounded w-full"
                value={selectedOption ? selectedOption : user.gender.id}
                onChange={(e) => setSelectedOption(e.target.value)}
                id="gender"
                name="gender"
              >
                <option key={user.gender.id} value={user.gender.id}>
                  {user.gender.description}
                </option>
                {optionGenders?.map((option) => {
                  if (option.id === user.gender.id) {
                    return null; // Devolver null para excluir este dato del mapeo
                  }
                  return (
                    <option key={option.id} value={option.id}>
                      {option.description}
                    </option>
                  );
                })}
              </select>
              <input
                type="mail"
                id="email"
                name="email"
                required
                disabled
                placeholder="Correo Institucional"
                className="mt-1 p-2 border rounded"
                defaultValue={user.email}
              />
            </div>

            <div className="flex flex-col justify-center gap-4">
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                placeholder="Traer apellido de la BD"
                className="mt-1 p-2 border rounded "
                defaultValue={user.last_name}
              />
              <input
                type="number"
                id="dni"
                name="dni"
                required
                disabled
                placeholder="Numero de identificación"
                className="mt-1 p-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                defaultValue={user.dni}
              />
              <input
                type="email"
                id="alt_email"
                name="alt_email"
                placeholder="Correo alternativo"
                className="mt-1 p-2 border rounded"
                defaultValue={user.alt_email ? user.alt_email : ''}
              />
              <input
                type="number"
                id="phone_number"
                name="phone_number"
                required
                placeholder="Numero de telefono"
                className="mt-1 p-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                defaultValue={user.phone_number}
              />
            </div>
          </div>

          <ButtonPrimary title={'Guardar'} icono={IconSaves} typeB="submit" />
        </form>
      </div>
    </div>
  );
}

export default DatosPersonales;
