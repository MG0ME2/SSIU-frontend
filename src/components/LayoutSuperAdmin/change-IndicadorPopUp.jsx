import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import ButtonPrimary from '../Buttons/primary';
import IconAdd from '../../assets/Img/IconAdd.svg';
import { fetchIndicators } from '../../redux/states/variableIndicatorSlice';


const ChangeVarPopUp = ({ onClose, onSubmit }) => {

  const dispatch = useDispatch();
  const indicators = useSelector((state) => state.variableIndicator.indicators);

  const [indicadorName, setindIcadorName] = useState('');
  const [SelectIndicadorStatus, setSelectedStatusId] = useState('');
  const [indicadorAsociaVar, setindIcadorAsociaVar] = useState('');

  
  const notifyE = () => {
    toast.error('Error al actualizar los datos', {
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
    toast.success('Se actualizaron los datos exitosamente', {
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


  useEffect(() => {
    const fetchGetIndicators = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/indicator`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setindIcadorName(response.data.description);
        setSelectedStatusId(response.data.statusId);

    } catch (error) {
        console.error("Error fetching Indicators:", error);
      }
    }; 

    fetchGetIndicators();
}, [dispatch]);


  const handleUpdate = async (e) => {
    e.preventDefault();
   // const formData = new FormData(e.currentTarget);
    // Validar y enviar los datos del nuevo indicador
    const updateIndicator = {
      name: indicadorName,
      status: SelectIndicadorStatus,
    };

    const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/indicator/${indicators.id}`,
        form
      );
    
      if (data.status === 401) {
        notifyE();
      } else {
        dispatch(fetchIndicators(data));
        notifyS();
      }
    //console.log("Submit data:", newindicadorData);

  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-15 z-40">
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold">Actualizar indicador</h2>
        </div>
        <form onSubmit={handleUpdate}>
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
              placeholder="Actualice indicador"
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

export default ChangeVarPopUp;
