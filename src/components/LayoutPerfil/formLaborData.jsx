
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
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
  fetchEmploymentDataByUser,
} from '../../redux/states/employmentDataSlice';

function DatosLaborales() {
  const dispatch = useDispatch();
  
  // Selector
  const { user } = useSelector((state) => state.auth);
  const [optionSector, setOptionSector] = useState([]);
  const { sectors } = useSelector((state) => state.companySector);
  
  const [nationality, setNationality] = useState('');
  const defaultOptions = [
    { id: 'nacional', description: 'Nacional' },
    { id: 'internacional', description: 'Internacional' }
  ];
  
  // Estados locales para los campos del formulario - Use State
  const [empresaActual, setEmpresaActual] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [contactoEmpresa, setContactoEmpresa] = useState('');
  const [cargoEmpresa, setCargoEmpresa] = useState('');
  const [sectorLaboral, setSectorLaboral] = useState('');
  //const [nationality, setNationality] = useState('');

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
    console.log('entro a useEffect y el user.id: ', user.id);
    dispatch(fetchEmploymentDataByUser(user.id));
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

    const fetchEmploymentData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/employment-data/by/${user.id}`
        );
        console.log('entro a fetchEmploymentData: ', response.data);
        if (response.data) {
          setEmpresaActual(response.data.name);
          setDireccionEmpresa(response.data.address);
          setContactoEmpresa(response.data.phone_number);
          setCargoEmpresa(response.data.job_role);
          setNationality(response.data.nationality);
          setSectorLaboral(response.data.companySector.id)
        }
      } catch (error) {
        console.error('Error al obtener los datos Laborales:', error);
        notifyE();
      }
    };

    getSector();
    fetchEmploymentData();
  }, [dispatch, user.id]);

  // const validateInput = (input) => {
  //   if (!/^[A-Za-z\s]+$/.test(input)) {
  //     notifyVi();
  //     return false;
  //   }
  //   return true;
  // };

  const handleUpdate = async (event) => {
    event.preventDefault();
    //const inputName = formData.get('name');

    const form = {
      name: empresaActual,
      address: direccionEmpresa,
      companySectorId: sectorLaboral,
      phone_number: contactoEmpresa,
      job_role: cargoEmpresa,
      nationality,
    };
    
    console.log(form)

    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/employment-data/${user.id}`,
      form
    );

    if (data.status === 401) {
      notifyE();
    } else {
      dispatch(setUsers(data));
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
              <div className="">
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

              <div className="relative w-full">
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

              <div className="relative w-full">
                <label
                  htmlFor="sectorLaboral"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Sector Empresarial
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
            
            <div
              className="flex flex-col justify-center gap-4">
              <div
                className="relative w-full">
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
              
              <div
                className="relative w-full">
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
              
              <div
                className="relative w-full">
                <label
                  htmlFor="sectorLaboral"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Nacionalidad de la empresa
                </label>
                <select
                  className="mt-1 p-2 border rounded w-full"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  id="nationality"
                  name="nationality"
                >
                  {defaultOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <ButtonPrimary
            title={'Guardar'}
            icono={IconSaves}
            typeB="submit" />
        </form>
      </div>
    </div>
  );
}

export default DatosLaborales;
