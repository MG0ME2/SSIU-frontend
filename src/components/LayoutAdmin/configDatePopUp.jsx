import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import ButtonOnclick from '../Buttons/onclick';

import IconDate from '../../assets/Img/IconDate.svg';

import { fetchStageDatesGet, fetchStageDatesPost, fetchStageDatesPut } from '../../redux/states/stageSlice';
import { fetchStatus } from '../../redux/states/statusSlice';

const ConfigDatePopUp = ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { stages } = useSelector((state) => state.stage);
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.status);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}:00`;
  };

  const [ids] = useState([1, 2, 3, 4, 5, 6]);

  const [etapas, setEtapas] = useState(
    ids.map(() => ({ fechaInicio: '', fechaFin: '' }))
  );

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

  const handleGuardarFechas = async (e) => {
    e.preventDefault();
    try {

      const id = status.id

      // Ajustar las fechas para incluir la hora actual
      const etapasConHoraActual = etapas.map((etapa) => ({
        fechaInicio: etapa.fechaInicio
          ? `${etapa.fechaInicio} ${getCurrentTime()}`
          : '',
        fechaFin: etapa.fechaFin ? `${etapa.fechaFin} ${getCurrentTime()}` : '',
      }));

      // post
      // await dispatch(
      //   fetchStageDatesPost({ etapas: etapasConHoraActual })
      // ).unwrap();

      // put
      // dispatch(
      //   fetchStageDatesPut( id , etapasConHoraActual)
      // )

      // get
      dispatch(
        fetchStageDatesGet()
      )
      
      notifyS();
    //  onClose();
    } catch (error) {
      console.error('Error al guardar las fechas de las etapas:', error);
      notifyE();
      dispatch(fetchStatus());
      console.log(
        'estado: ',
        status,
        ' user: ',
        user.id,
        '  datos: ',
        etapas,
        '  stage: ',
        stages
      );
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
          {ids.map((id, index) => (
            <div key={id} className="mb-4">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-lg">
                  <div className="flex items-center mb-1">
                    <div className="font-bold mr-4">
                      <label className="block text-sm text-gray-800">
                        Etapa {id}
                      </label>
                    </div>
                    <div className="ml-1">
                      {index === 0 && (
                        <label className="font-bold block text-sm text-gray-800 mb-1">
                          Fecha Inicio
                        </label>
                      )}
                      <input
                        type="date"
                        className="mt-1 p-1 border rounded w-full"
                        value={etapas[index].fechaInicio}
                        onChange={(e) =>
                          setEtapas((prevEtapas) =>
                            prevEtapas.map((prevEtapa, i) =>
                              i === index
                                ? { ...prevEtapa, fechaInicio: e.target.value }
                                : prevEtapa
                            )
                          )
                        }
                        required
                      />
                    </div>
                    <div className="ml-5">
                      {index === 0 && (
                        <label className="font-bold block text-sm text-gray-800 mb-1">
                          Fecha Fin
                        </label>
                      )}
                      <input
                        type="date"
                        className="mt-1 p-1 border rounded w-full"
                        value={etapas[index].fechaFin}
                        onChange={(e) =>
                          setEtapas((prevEtapas) =>
                            prevEtapas.map((prevEtapa, i) =>
                              i === index
                                ? { ...prevEtapa, fechaFin: e.target.value }
                                : prevEtapa
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
            <ButtonOnclick
              icono={IconDate}
              title="Guardar Fechas"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfigDatePopUp;
