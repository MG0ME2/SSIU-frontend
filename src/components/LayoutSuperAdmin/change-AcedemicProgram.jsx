import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';

import {
  PutfetchVariables,
  fetchVariables,
} from '../../redux/states/variableIndicatorSlice';

const ChangeAPPopUp = ({ onClose, variableId, initialName}) => {
  const dispatch = useDispatch();
  const variables = useSelector((state) => state.variableIndicator.variables);
  const [variableName, setVariableName] = useState(initialName);

  const notifyE = () => {
    toast.error('Error al guardar la variable', {
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


  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const aditionData = {
        name: variableName,
        statusId: 1,
      };

      dispatch(PutfetchVariables({varId: variables.id , dataAdd: aditionData }))
        .unwrap()
        .then(() => {
          notifyS(); 
          onClose(); 
          dispatch(fetchVariables());
        });
    } catch (error) {
      console.error('Error al guardar la variable:', error);
      notifyE();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-10 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
      <ToastContainer />
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Actualizar programa acedemico</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Actualice la variable"
              value={variableName}
              onChange={(e) => setVariableName(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonPrimary
              icono={IconAdd}
              title="Agregar Variable"
              typeB="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeAPPopUp;
