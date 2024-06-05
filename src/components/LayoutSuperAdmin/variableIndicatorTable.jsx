import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIndicators, fetchVariables } from '../../redux/states/variableIndicatorSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';

// component
import ButtonPrimary from '../Buttons/primary';

const VariableIndicatorTable = ({ titleVariables, titleIndicators, searchPlaceholder, addButtonLabel, onAddClick}) => {
  const dispatch = useDispatch();
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);

  useEffect(() => {
    dispatch(fetchVariables());
    dispatch(fetchIndicators());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="w-1/2 mr-4">
        <div className="mb-8 max-h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{titleVariables}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder={searchPlaceholder}
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
                    <span className={variable.active ? 'text-green-500' : 'text-red-500'}>
                      {variable.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="border px-1 py-1 text-left">
                    <ButtonPrimary icono={IconPencil} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onAddClick} className="bg-blue-500 text-white p-2 rounded">
            {addButtonLabel}
          </button>
        </div>
      </div>
      <div className="w-1/2">
        <div className="mb-8 max-h-80 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{titleIndicators}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder={searchPlaceholder}
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
                    <span className={indicator.active ? 'text-green-500' : 'text-red-500'}>
                      {indicator.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="border px-1 py-1 text-left">
                    <ButtonPrimary icono={IconPencil} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={onAddClick} className="bg-blue-500 text-white p-2 rounded">
            {addButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariableIndicatorTable;