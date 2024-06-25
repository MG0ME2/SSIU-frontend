import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import ButtonOnclick from '../Buttons/onclick';

import IconDate from '../../assets/Img/IconDate.svg';

import { updateStageDates } from '../../redux/states/stageSlice';

const ConfigDatePopUp = ({ onClose, onSubmit }) => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
  
// Estado local para las fechas de las etapas
const [etapas, setEtapas] = useState([
    { id: 1, fechaInicio: '', fechaFin: '' },
    { id: 2, fechaInicio: '', fechaFin: '' },
    { id: 3, fechaInicio: '', fechaFin: '' },
    { id: 4, fechaInicio: '', fechaFin: '' },
    { id: 5, fechaInicio: '', fechaFin: '' },
    { id: 6, fechaInicio: '', fechaFin: '' },
  ]);
  
  const notifyE = () => {
    toast.error('Error al guardar los datos', {
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
    toast.success('Se guardaron los datos exitosamente', {
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
  const notify = () => {
    toast.warning(getWarnignMessage());
  };

  const handleGuardarFechas = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateStageDates({ userId: user.id, etapas })).unwrap();
      notifyS();
      onClose();
      navigate('/admin/home-ssiu/activeStage1')
    } catch (error) {
      console.error('Error al guardar las fechas de las etapas:', error);
      notifyE();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md relative max-w-3xl z-60">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Guardar Fechas de Etapas</h2>
        </div>
        <form onSubmit={handleGuardarFechas}>
          {etapas.map((etapa) => (
            <div key={etapa.id} className="mb-4">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <div className="flex items-center mb-1">
                    <div className="font-bold mr-4">
                      <label className="block text-sm text-gray-800">
                        Etapa {etapa.id}
                      </label>
                    </div>
                    <div className="ml-1">
                      {etapa.id === 1 && (
                        <label className="font-bold block text-sm text-gray-800 mb-1">
                          Fecha Inicio
                        </label>
                      )}
                      <input
                        type="date"
                        className="mt-1 p-1 border rounded w-full"
                        value={etapa.fechaInicio}
                        onChange={(e) =>
                          setEtapas((prevEtapas) =>
                            prevEtapas.map((prevEtapa) =>
                              prevEtapa.id === etapa.id ? { ...prevEtapa, fechaInicio: e.target.value } : prevEtapa
                            )
                          )
                        }
                        required
                      />
                    </div>
                    <div className="ml-5">
                      {etapa.id === 1 && (
                        <label className="font-bold block text-sm text-gray-800 mb-1">
                          Fecha Fin
                        </label>
                      )}
                      <input
                        type="date"
                        className="mt-1 p-1 border rounded w-full"
                        value={etapa.fechaFin}
                        onChange={(e) =>
                          setEtapas((prevEtapas) =>
                            prevEtapas.map((prevEtapa) =>
                              prevEtapa.id === etapa.id ? { ...prevEtapa, fechaFin: e.target.value } : prevEtapa
                            )
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center mt-4">
            <ButtonOnclick icono={IconDate} title="Guardar Fechas" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigDatePopUp;
