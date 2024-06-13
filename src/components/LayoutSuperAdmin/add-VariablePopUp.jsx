import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';


const AddVariablePopUp = ({ onClose, onSubmit }) => {
  const [variableName, setVariableName] = useState('');
  const [variableStatus, setVariableStatus] = useState('');
  const [variableType, setVariableType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos de la nueva variable
    const newVariableData = {
      name: variableName,
      status: variableStatus,
      type: variableType,
    };
    console.log("Submit data:", newVariableData);
    onSubmit(newVariableData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Agregar nueva variable</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          {variableName && (
                  <label
                    htmlFor="variableName"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Nombre de la variable
                  </label>
                )}
            <input
              type="text"
              placeholder="Nombre de la variable"
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
          {variableStatus && (
                  <label
                    htmlFor="variableStatus"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Estado de la variable
                  </label>
                )}
            <input
              type="text"
              placeholder="Estado de la variable"
              value={variableStatus}
              onChange={(e) => setVariableStatus(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary icono={IconAdd} title="Agregar Variable" typeB="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariablePopUp;
