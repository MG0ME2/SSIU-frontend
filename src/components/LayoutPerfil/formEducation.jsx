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
  const [options, setOptions] = useState([]);
  const [OptionGeographic_Location, setOptionGeographic_location] = useState(
    []
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const { user } = useSelector((state) => state.auth);

  //

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
    const getDniTypes = async () => {
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
    getDniTypes();

    const getGeographic_location = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/geographic_location`
        );
        if (response.data.length > 1) {
          setOptionGeographic_location(response.data);
        } else {
          setOptionGeographic_location([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        notifyE();
      }
    };
    getGeographic_location();
  }, [dispatch]);

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
          <div className="grid grid-cols-2 gap-x-8 ">
            <div className="flex flex-col justify-center gap-4">
              <input
                type="text"
                placeholder="Tipo de estudio"
                className="mt-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Nombre de titulación"
                className="mt-1 p-2 border rounded"
              />
            </div>
            <div className="flex flex-col justify-center gap-4">
              <input
                type="text"
                placeholder="Nombre de la institución educativa"
                className="mt-1 p-2 border rounded "
              />
              <div>
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={
                    selectedOption
                      ? selectedOption
                      : user.geographic_location.id
                  }
                  onChange={(e) => setSelectedOption(e.target.value)}
                  id="geographic_location"
                  name="geographic_location"
                >
                  <option
                    key={user.geographic_location.id}
                    value={user.geographic_location.id}
                  >
                    {' '}
                    {user.geographic_location.description}
                  </option>
                  {OptionGeographic_Location?.map((option) => {
                    if (option.id === user.geographic_location.id) {
                      return null; // Devolver null para excluir este dato del mapeo
                    }
                    return (
                      <option key={option.id} value={option.id}>
                        {option.description}
                      </option>
                    );
                  })}
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

export default DatosEducation;
