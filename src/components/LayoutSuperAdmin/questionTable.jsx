import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// redux
import {
fetchQuestion
} from '../../redux/states/variableIndicatorSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';
import IconAdd from '../../assets/Img/IconAdd.svg';

// component
import ButtonIcon from '../Buttons/Icon';
import ButtonPrimary from '../Buttons/primary';
import ButtonOnclick from '../Buttons/onclick';
import AddQuestionPopUp from './add-QuestionPopUp';

const QuestionTable = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const pregunta = useSelector((state) => state.variableIndicator.questions);

  const [showAddPreguntaPopup, setShowAddPreguntaPopup] = useState(false);


  const handleAddPreguntaClick = () => {
    setShowAddPreguntaPopup(!showAddPreguntaPopup);
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
        Gestión de preguntas
      </h2>
      <div className="max-h-80 overflow-y-auto mb-8">
        <table className="table-auto w-full mb-4 border border-gray-400">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Pregunta</th>
              <th className="border border-gray-400 px-4 py-2">Tipo de Pregunta</th>
              <th className="border border-gray-400 px-4 py-2">Estado</th>
              <th className="border border-gray-400 px-4 py-2">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {pregunta.map((variable, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{variable.name}</div>
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
                    <ButtonIcon icono={IconPencil} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonOnclick title={'Agregar pregunta'} icono={IconAdd} onClick={handleAddPreguntaClick} />
        {showAddPreguntaPopup && (
              <AddQuestionPopUp
                onClose={handleAddPreguntaClick}
              />
            )}
      </div>
    </div>
  );
};

export default QuestionTable;
