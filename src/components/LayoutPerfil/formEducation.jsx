import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import ButtonPrimary from '../Buttons/primary.jsx';

import IconSaves from '../../assets/Img/IconSaves.svg';

import { setUsers } from '../../redux/states/userSlice.js';
import {
  updateAcademicData,
  fetchAcademicDataByUser,
} from '../../redux/states/academicDataSlice';
import { fetchStudyTypes } from '../../redux/states/studyTypesSlice';

function DatosEducation() {
  const dispatch = useDispatch();

  const [optionEstudyType, setOptionEstudyType] = useState([]);
  const { user } = useSelector((state) => state.auth);
  //const { academicData } = useSelector((state) => state.academicData);
  const { studys } = useSelector((state) => state.studyTypes);

  // Estados locales para los campos del formulario - Use State
  const [estudyType, setEstudyType] = useState(user.studyTypes);
  const [nombreTitulación, setTitulación] = useState('');
  const [nombreInstitución, setInstitución] = useState('');
  const [fechaTitulación, setfechaTitulación] = useState('');
  const [nationality, setNationality] = useState('');

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
        const academicData = response.data;
        if (academicData && academicData.nationality) {
          setNationality(academicData.nationality);
        }
      } catch (error) {
        console.error('Error al obtener los datos académicos:', error);
        notifyE();
      }
    };

    getStudy();
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

    const form = {
      estudyType,
      nombreTitulación,
      nombreInstitución,
      fechaTitulación,
      nationalityId: nationality,
    };

    // if (
    //   !validateInput(form.nombreTitulacion) ||
    //   !validateInput(form.nombreInstitucion) ||
    //   !validateInput(form.nacionalidad)
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

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  return (
    <div>
      <ToastContainer />
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-x-8">
          <div className="flex flex-col gap-y-4 items-center">
            <div className="relative w-full">
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
                className="mt-1 p-2 border rounded w-full"
                value={estudyType}
                onChange={(e) => setEstudyType(e.target.value)}
              >
                   {studys.map((study) => (
                    <option key={study.id} value={study.id}>
                      {study.description}
                    </option>
                  ))}
              </select>
            </div>

            <div className="relative w-full">
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
                className="mt-1 p-2 border rounded w-full"
                value={nombreTitulación}
                onChange={(e) => setTitulación(e.target.value)}
                />
            </div>

            <div className="relative w-full">
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
                className="mt-1 p-2 border rounded w-full"
                value={nombreInstitución}
                onChange={(e) => setInstitución(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-4 items-center">
            <div className="relative w-full">
              {fechaTitulación && (
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
                value={fechaTitulación}
                onChange={(e) => setfechaTitulación(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              {nationality && (
                <label
                  htmlFor="nacionalidad"
                  className="absolute -top-4 left-2 text-xs text-gray-600"
                >
                  Nacionalidad
                </label>
              )}
              <input
                type="text"
                id="nacionalidad"
                name="nacionalidad"
                placeholder="Nacionalidad"
                className="mt-1 p-2 border rounded w-full"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                />
            </div>
          </div>
        </div>
        <ButtonPrimary title="Guardar" icono={IconSaves} typeB="submit" />
      </form>
    </div>
  );
}

export default DatosEducation;
