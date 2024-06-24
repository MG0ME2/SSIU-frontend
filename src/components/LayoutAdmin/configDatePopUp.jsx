import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import ButtonPrimary from '../Buttons/primary';

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
  
  const handleGuardarFechas = async () => {
    e.preventDefault();
    try {
      await dispatch(updateStageDates({ userId: user.id, etapas })).unwrap();
      toast.success('Fechas de etapas guardadas correctamente');
      onClose();
    } catch (error) {
      console.error('Error al guardar las fechas de las etapas:', error);
      toast.error('Error al guardar las fechas de las etapas');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md relative w-11/12 max-w-3xl">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Guardar Fechas de Etapas</h2>
        </div>
        <form onSubmit={handleGuardarFechas}>
          {etapas.map((etapa) => (
            <div key={etapa.id} className="mb-4 flex items-center space-x-4">
              <div className="w-1/2">
                <label className="block text-xs text-gray-600 mt-2">
                  Fecha Inicio Etapa {etapa.id}
                </label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full"
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
              <div className="w-1/2">
                <label className="block text-xs text-gray-600 mt-2">
                  Fecha Fin Etapa {etapa.id}
                </label>
                <input
                  type="date"
                  className="mt-1 p-2 border rounded w-full"
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
          ))}
          <div className="flex items-center justify-center">
            <ButtonPrimary icono={IconDate} title="Guardar Fechas" typeB="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigDatePopUp;
