import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ButtonPrimary from '../Buttons/primary';

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
    onSubmit(newVariableData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">Agregar Nueva Variable</h2>
          <FaTimes
            className="ml-auto text-red-600 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nombre de la Variable"
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Estado de la Variable"
              value={variableStatus}
              onChange={(e) => setVariableStatus(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Tipo de Variable"
              value={variableType}
              onChange={(e) => setVariableType(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary title="Agregar Variable" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVariablePopUp;
