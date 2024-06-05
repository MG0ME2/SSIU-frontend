import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import { fetchIndicators, fetchVariables } from '../../redux/states/variableIndicatorSlice';
//import { addVariable, addIndicator } from '../../redux/states/variableIndicatorSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';

// component
import ButtonPrimary from '../Buttons/primary';

const VariableIndicatorTable = ({}) => {

  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/status`);
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
    <div className="flex">
      <div className="w-1/2 mr-4">
        <div className="mb-8 max-h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Variables</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar Variables"
              className="border p-2 rounded w-full"
            />
          </div>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-2 py-1">Nombre</th>
                <th className="px-2 py-1">Estado</th>
                <th className="px-1 py-1">Gestión</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((variable, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{variable.name}</td>
                  <td className="border px-2 py-1">
                  <span className="text-green-500">
                    {statuses.find((status) => status.id === variable.status)?.description || 'Desconocido'}
                  </span>
                     </td>
                  <td className="border px-1 py-1 text-left">
                    <ButtonPrimary icono={IconPencil} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button  className="bg-blue-500 text-white p-2 rounded">
            Agregar Variable
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <div className="mb-8 max-h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Indicadores</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar Indicadores"
              className="border p-2 rounded w-full"
            />
          </div>
          <table className="table-auto w-full mb-4">
            <thead>
              <tr>
                <th className="px-2 py-1">Nombre</th>
                <th className="px-2 py-1">Estado</th>
                <th className="px-1 py-1">Gestión</th>
              </tr>
            </thead>
            <tbody>
              {indicators.map((indicator, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{indicator.name}</td>
                  <td className="border px-2 py-1">
                  <span className="text-green-500">
                    {statuses.find((status) => status.id === indicator.status)?.description || 'Desconocido'}
                  </span>
                  </td>
                  <td className="border px-1 py-1 text-left">
                    <ButtonPrimary icono={IconPencil} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="bg-blue-500 text-white p-2 rounded">
            Agregar Indicador
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariableIndicatorTable;