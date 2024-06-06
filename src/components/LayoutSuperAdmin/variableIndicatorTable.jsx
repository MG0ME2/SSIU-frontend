import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// redux
import {
  fetchIndicators,
  fetchVariables,
} from '../../redux/states/variableIndicatorSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';
import IconAdd from '../../assets/Img/IconAdd.svg';

// component
import ButtonIcon from '../Buttons/Icon';
import ButtonPrimary from '../Buttons/primary';
import AddVariablePopUp from './add-VariablePopUp';

const VariableIndicatorTable = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);

  const [showAddVariablePopup, setShowAddVariablePopup] = useState(false);
 
  const handleAddVariableClick = () => {
    setShowAddVariablePopup(true);
  };

  const handleAddVariableSubmit = (newVariableData) => {
    // Lógica para agregar la nueva variable
    // Actualiza el estado de variables y cierra el popup
    setShowAddVariablePopup(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/status`
        );
        setStatuses(response.data);
        dispatch(fetchVariables());
        dispatch(fetchIndicators());
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  // const handleAddVariable = () => {
  //   dispatch(addVariable({ name: 'Nueva Variable', active: true })); // Envía una acción para agregar una nueva variable
  // };nd

  // const handleAddIndicator = () => {
  //   dispatch(addIndicator({ name: 'Nuevo Indicador', active: true })); // Envía una acción para agregar un nuevo indicador
  // };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
        Gestión de Variables e Indicadores
      </h2>
      <div className="flex">
        <div className="w-1/2 mr-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar Variables"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="table-auto w-full mb-4 border border-gray-400">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border border-gray-400 px-2 py-1">Nombre</th>
                  <th className="border border-gray-400 px-2 py-1">Estado</th>
                  <th className="border border-gray-400 px-1 py-1">Gestión</th>
                </tr>
              </thead>
              <tbody>
                {variables.map((variable, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">{variable.name}</div>
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">
                        <span className="text-green-500">
                          {statuses.find((status) => status.id === variable.status)?.description || 'Desconocido'}
                        </span>
                      </div>
                    </td>
                    <td className="border px-1 py-1 text-center">
                      <div className="flex justify-center items-center">
                        <ButtonIcon icono={IconPencil} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ButtonPrimary title={'Agregar Variable'} icono={IconAdd} onClick={handleAddVariableClick} />
            {showAddVariablePopup && <AddVariablePopUp onSubmit={handleAddVariableSubmit} />}
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar Indicadores"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="table-auto w-full mb-4 border border-gray-400">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border border-gray-400 px-2 py-1">Nombre</th>
                  <th className="border border-gray-400 px-2 py-1">Estado</th>
                  <th className="border border-gray-400 px-1 py-1">Gestión</th>
                </tr>
              </thead>
              <tbody>
                {indicators.map((indicator, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">{indicator.name}</div>
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">
                        <span className="text-green-500">
                          {statuses.find((status) => status.id === indicator.status)?.description || 'Desconocido'}
                        </span>
                      </div>
                    </td>
                    <td className="border px-1 py-1 text-center">
                      <div className="flex justify-center items-center">
                        <ButtonIcon icono={IconPencil} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ButtonPrimary title={'Agregar Indicador'} icono={IconAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default VariableIndicatorTable;
