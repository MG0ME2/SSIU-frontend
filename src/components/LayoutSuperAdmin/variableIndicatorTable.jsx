import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
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
import ButtonOnclick from '../Buttons/onclick';
import AddVariablePopUp from './add-VariablePopUp';
import AddIndicadorPopUp from './add-IndicadorPopUp';


const VariableIndicatorTable = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);

  const [showAddVariablePopup, setShowAddVariablePopup] = useState(false);
  const [showAddIndicatorPopup, setShowAddIndicatorPopup] = useState(false);

  const handleAddVariableClick = () => {
    setShowAddVariablePopup(!showAddVariablePopup);
  };

  const handleAddIndicadorClick = (newVariableData) => {
    setShowAddIndicatorPopup(!showAddIndicatorPopup);
  };

  // const handleAddIndicatorSubmit = (newIndicatorData) => {
  //   // Lógica para agregar el nuevo indicador
  //   // Actualiza el estado de indicadores y cierra el popup
  //   setShowAddIndicatorPopup(false);
  //   console.log('Nuevo indicador:', newIndicatorData);
  //   // Aquí podrías tener lógica adicional, como enviar los datos al backend
  // };

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
        Gestión de variables e indicadores
      </h2>
      <div className="flex">
        <div className="w-1/2 mr-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar variables"
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
                      <div className="flex justify-center items-center">
                        {variable.name}
                      </div>
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">
                        <span className="text-green-500">
                          {statuses.find(
                            (status) => status.id === variable.status
                          )?.description || 'Desconocido'}
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
            
             <ButtonOnclick
              title={'Agregar variable'}
              icono={IconAdd}
              onClick={handleAddVariableClick}
              
            /> 
            {showAddVariablePopup && (
              <AddVariablePopUp
                onClose={handleAddVariableClick}
              />
            )}
          </div>
        </div>

        <div className="w-1/2">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar indicadores"
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
                      <div className="flex justify-center items-center">
                        {indicator.name}
                      </div>
                    </td>
                    <td className="border px-2 py-1">
                      <div className="flex justify-center items-center">
                        <span className="text-green-500">
                          {statuses.find(
                            (status) => status.id === indicator.status
                          )?.description || 'Desconocido'}
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
            <ButtonOnclick title={'Agregar indicador'} icono={IconAdd}  onClick={handleAddIndicadorClick} />
            {showAddIndicatorPopup && (
              <AddIndicadorPopUp
                onClose={handleAddIndicadorClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableIndicatorTable;
