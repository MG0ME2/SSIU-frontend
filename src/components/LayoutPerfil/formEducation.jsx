import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

// components
import ButtonPrimary from '../Buttons/primary.jsx';
//images
import IconSaves from '../../assets/Img/IconSaves.svg';
//redux
import { setUsers } from '../../redux/states/userSlice.js';
import {
  fetchAcademicDataByUser,
} from '../../redux/states/academicDataSlice';
import { fetchStudyTypes } from '../../redux/states/studyTypesSlice';

function DatosEducation() {
  const dispatch = useDispatch();
  
  // Selector
  const { user } = useSelector((state) => state.auth);
  const [optionEstudyType, setOptionEstudyType] = useState([]);
  const { studys } = useSelector((state) => state.studyTypes);
  
  const [nationality, setNationality] = useState('');
  const defaultOptions = [
    { id: 'nacional', description: 'Nacional' },
    { id: 'internacional', description: 'Internacional' }
  ];
  
  // Estados locales para los campos del formulario - Use State
  const [nombreTitulación, setTitulación] = useState('');
  const [nombreInstitución, setInstitución] = useState('');
  const [fechaTitulación, setfechaTitulación] = useState('');
  const [estudyType, setStudyType] = useState('');

  //alertas
  const notifyVi = () => {
    toast.warn('No se admiten números o símbolos', {
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
    dispatch(fetchStudyTypes());

    const getStudy = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/study-types`
        );
        if (response.data.length > 1) {
          setOptionEstudyType(response.data);
        } else {
          setOptionEstudyType([]);
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
        console.log('entro a fetchAcademicData: ', response.data);
        if (response.data) {
          setTitulación(response.data.academic_title);
          setInstitución(response.data.institution_name);
          const date = new Date(response.data.degree_date);
          const formattedDate = date.toISOString().split('T')[0];
          setfechaTitulación(formattedDate);
          setStudyType(response.data.studyType.id);
          setNationality(response.data.nationality);
        }
      } catch (error) {
        console.error('Error al obtener los datos académicos:', error);
        notifyE();
      }
    };

    getStudy();
    fetchAcademicData();
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

    const form = {
      academic_title: nombreTitulación,
      institution_name: nombreInstitución,
      degree_date: fechaTitulación,
      nationality,
      studyTypesID: estudyType,
    };
    
    console.log(form)
    
    const { data } = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/academic-data/${user.id}`,
      form
    );

    if (data.status === 401) {
      notifyE();
    } else {
      dispatch(setUsers(data));
      //setUserData(data);
      notifyS();
    }
  };

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  return (
    <div>
      <div>
      <ToastContainer />
      <form
        className="flex flex-col gap-4 items-center "
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-x-8 ">
          <div className="flex flex-col gap-y-4 items-center ">
            <div className="relative ">
              {estudyType && (
                <label
                  htmlFor="tipoEstudio"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Tipo de Estudio
                </label>
              )}
              <select
                id="tipoEstudio"
                name="tipoEstudio"
                className="mt-1 p-2 border rounded "
                value={estudyType}
                onChange={(e) => setStudyType(e.target.value)}
              >
                   {studys.map((study) => (
                    <option key={study.id} value={study.id}>
                      {study.description}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative ">
              {nombreTitulación && (
                <label
                  htmlFor="nombreTitulacion"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Nombre de la titulación
                </label>
              )}
              <input
                type="text"
                id="nombreTitulacion"
                name="nombreTitulacion"
                placeholder="Nombre de la titulación"
                className="mt-1 p-2 border rounded "
                value={nombreTitulación}
                onChange={(e) => setTitulación(e.target.value)}
                />
            </div>

            <div className="w-auto">
              {nombreInstitución && (
                <label
                  htmlFor="nombreInstitucion"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Nombre de la institución
                </label>
              )}
              <input
                type="text"
                id="nombreInstitucion"
                name="nombreInstitucion"
                placeholder="Nombre de la institución educativa"
                className="mt-1 p-2 border rounded "
                value={nombreInstitución}
                onChange={(e) => setInstitución(e.target.value)}
              />
            </div>
          </div>
          
          <div
            className="flex flex-col gap-y-4 items-center">
            <div
              className="relative ">
              {fechaTitulación && (
                <label
                  htmlFor="fechaTitulacion"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Fecha
                  de
                  titulación
                </label>
              )}
              <input
                type="date"
                id="fechaTitulacion"
                name="fechaTitulacion"
                placeholder="Fecha de titulación"
                className="mt-1 p-2 border rounded "
                value={fechaTitulación}
                onChange={(e) => setfechaTitulación(e.target.value)}
              />
            </div>
            
            <div
              className="relative ">
              <label
                htmlFor="sectorLaboral"
                className="absolute -top-4 left-2 text-xs text-gray-600"
              >
                Nacionalidad de la empresa
              </label>
              <select
                className="mt-1 p-2 border rounded "
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                id="nationality"
                name="nationality"
              >
                {defaultOptions.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}>
                    {option.description}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <ButtonPrimary
          title="Guardar"
          icono={IconSaves}
          typeB="submit" />
      </form>
        </div>
    </div>
  );
}

export default DatosEducation;
