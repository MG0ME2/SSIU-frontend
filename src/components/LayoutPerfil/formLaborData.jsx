/**
 * Falta el backend de esto
 */
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import ButtonPrimary from '../Buttons/primary.jsx';
//images
import IconSaves from '../../assets/Img/IconSaves.svg';
//redux
import {
  setUsers,
} from '../../redux/states/userSlice.js';
import { fetchCompanySectors } from '../../redux/states/companySectorSlice';
import {
  fetchAcademicDataByUser,
} from '../../redux/states/academicDataSlice';

function DatosLaborales() {
  const dispatch = useDispatch();
  // Selector
  const [optionSector, setOptionSector] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { sectors } = useSelector((state) => state.companySector);

  // Estados locales para los campos del formulario - Use State
  const [empresaActual, setEmpresaActual] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [contactoEmpresa, setContactoEmpresa] = useState('');
  const [cargoEmpresa, setCargoEmpresa] = useState('');
  const [sectorLaboral, setSectorLaboral] = useState(user.companySector);
  const [nationality, setNationality] = useState('');

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
    dispatch(fetchAcademicDataByUser(user.id));
    dispatch(fetchCompanySectors());
    
    const getSector = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/company-sector`
        );
        if (response.data.length > 1) {
          setOptionSector(response.data);
        } else {
          setOptionSector([]);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        notifyE();
      }
    };

    const fetchAcademicData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/academic-data/by/${user.id}`
        );
        const academicData = response.data;
        if (academicData && academicData.nationality) {
          setNationality(academicData.nationality);
        }
      } catch (error) {
        console.error('Error al obtener los datos académicos:', error);
        notifyE();
      }
    };

    getSector();
    fetchAcademicData();
  }, [dispatch, user.id]);

  const validateInput = (input) => {
    if (!/^[A-Za-z\s]+$/.test(input)) {
      notifyVi();
      return false;
    }
    return true;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    //const formData = new FormData(event.currentTarget);
    // const inputName = formData.get('name');
    // const inputLastName = formData.get('last_name');

    const form = {
      empresaActual,
      direccionEmpresa,
      sectorLaboral,
      contactoEmpresa,
      cargoEmpresa,
      nationalityId: nationality,
    };

    // if (
    //   !validateInput(inputName, 'el nombre') ||
    //   !validateInput(inputLastName, 'el apellido')
    // ) {
    //   return;
    // }

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
                <label
                  htmlFor="sectorLaboral"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Sector de la empresa
                </label>
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={sectorLaboral}
                  onChange={(e) => setSectorLaboral(e.target.value)}
                  id="sectorLaboral"
                  name="sectorLaboral"
                >
                  {sectors.map((sector) => (
                    <option key={sector.id} value={sector.id}>
                      {sector.description}
                    </option>
                  ))}
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
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  placeholder="Internacional o nacional"
                  className="mt-1 p-2 border rounded w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
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

export default DatosLaborales;
