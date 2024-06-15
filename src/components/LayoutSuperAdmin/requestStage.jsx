import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// redux
import {
fetchProgramAcedemic,
reactivateStage
} from '../../redux/states/variableIndicatorSlice';

// icon
import IconFile from '../../assets/Img/IconFile.svg';
import IconCheck from '../../assets/Img/IconCheck.svg';
import IconUnCheck from '../../assets/Img/IconUnCheck.svg';


// component
import ButtonIcon from '../Buttons/Icon';
import ButtonOnclick from '../Buttons/onclick';
import AddQuestionPopUp from './add-QuestionPopUp';

const RequestStage = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const requestStgs = useSelector((state) => state.variableIndicator.programAcademics);

  const [showAddrequestStgsPopup, setShowAddrequestStgsPopup] = useState(false);


  const handleAddrequestStgsClick = () => {
    setShowAddrequestStgsPopup(!showAddrequestStgsPopup);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/status`
        );
        setStatuses(response.data);
        dispatch(fetchQuestion());
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleToggleCheck = (index) => {
    const stageId = requestStgs[index].id; // Suponiendo que requestStgs tiene una propiedad `id` que representa el identificador único del stage
    dispatch(toggleStageActive(stageId)); // Llama a la acción de Redux para cambiar el estado `active` del stage
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
        Gestión de solicitudes de etapas
      </h2>
      <div className="max-h-80 overflow-y-auto mb-8">
        <table className="table-auto w-full mb-4 border border-gray-400">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Programa academico</th>
              <th className="border border-gray-400 px-4 py-2">Motivo</th>
              <th className="border border-gray-400 px-4 py-2">Etapa</th>
              <th className="border border-gray-400 px-4 py-2">Fecha de solicitud</th>
              <th className="border border-gray-400 px-4 py-2">Fecha de atención</th>
              <th className="border border-gray-400 px-4 py-2">Estado</th>
              <th className="border border-gray-400 px-4 py-2">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {requestStgs.map((variable, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.name}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.type}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.type}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.type}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.type}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">
                    <span className={variable.active ? 'text-green-500' : 'text-red-500'}>
                      {statuses.find((status) => status.id === variable.status)?.description || 'Desconocido'}
                    </span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <ButtonIcon  icono={variable.active ? IconCheck : IconUnCheck} onClick={() => handleToggleCheck(index)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonOnclick title={'Reactivar etapa'} icono={IconFile} onClick={handleAddrequestStgsClick} />
        {showAddrequestStgsPopup && (
              <AddQuestionPopUp
                onClose={handleAddrequestStgsClick}
              />
            )}
      </div>
    </div>
  );
};

export default RequestStage;
