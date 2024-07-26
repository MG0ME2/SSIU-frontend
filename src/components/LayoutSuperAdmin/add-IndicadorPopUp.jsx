import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';

import {
  PostfetchIndicators,
  fetchIndicators,
} from '../../redux/states/variableIndicatorSlice';

const AddIndicadorPopUp = ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const indicators = useSelector((state) => state.variableIndicator.indicators);
  const [indicadorName, setindIcadorName] = useState('');

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
        name: indicadorName,
        Status: 1,
      };

      dispatch(PostfetchIndicators({ dataAdd: aditionData }))
        .unwrap()
        .then(() => {
          notifyS(); 
          onClose(); 
        });
    } catch (error) {
      console.error('Error al guardar la variable:', error);
      notifyE();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Agregar nuevo indicador</h2>
        </div>
        <form onSubmit={handleSubmit}>
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
          <div className="flex items-center justify-center">
            <ButtonPrimary icono={IconAdd} title="Agregar indicador" typeB="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIndicadorPopUp;
