import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';


const AddIndicadorPopUp = ({ onClose, onSubmit }) => {
  const [indicadorName, setindIcadorName] = useState('');
  const [indicadorStatus, setindIcadorStatus] = useState('');
  const [indicadorAsociaVar, setindIcadorAsociaVar] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar los datos del nuevo indicador
    const newindicadorData = {
      name: indicadorName,
      status: indicadorStatus,
      type: indicadorAsociaVar,
    };
    console.log("Submit data:", newindicadorData);
    onSubmit(newindicadorData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Agregar nuevo indicador</h2>
        </div>
        <form onSubmit={handleSubmit}>
        {/* {programsAcedemicName && (
                  <label
                    htmlFor="programsAcedemicName"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Nombre del programa academico
                  </label>
                )}
                <input
                  type="text"
                  name="programsAcedemicName"
                  placeholder="Nombre Del Programa"
                  value={programsAcedemicName}
                  onChange={(e) => setprogramsAcedemicName(e.target.value)}
                  className="mt-1 p-2 border rounded"
                  required
                /> */}
          <div className="mb-4">
          {indicadorName && (
                  <label
                    htmlFor="indicadorName"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Nombre del indicador
                  </label>
                )}
            <input
              type="text"
              placeholder="Nombre del indicador"
              value={indicadorName}
              onChange={(e) => setindIcadorName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
          {indicadorStatus && (
                  <label
                    htmlFor="indicadorStatus"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Estado del indicador
                  </label>
                )}
            <input
              type="text"
              placeholder="Estado del indicador"
              value={indicadorStatus}
              onChange={(e) => setindIcadorStatus(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
          {indicadorAsociaVar && (
                  <label
                    htmlFor="indicadorAsociaVar"
                    className="block text-xs text-gray-600 mt-2"
                  >
                    Codigo de nvariable asocioanda
                  </label>
                )}
            <input
              type="text"
              placeholder="Codigo de variable asociada"
              value={indicadorAsociaVar}
              onChange={(e) => setindIcadorAsociaVar(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary icono={IconAdd} title="Agregar indicador" typeB="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndicadorPopUp;
