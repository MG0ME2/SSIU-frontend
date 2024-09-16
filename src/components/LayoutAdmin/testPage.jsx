import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';


import {
 completeStage
} from "../../redux/states/stageStatusSlice";// Asegúrate de ajustar la ruta de importación

const TestPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stageStatus = useSelector((state) => state.stageStatus);
  const isCycleConfigured = useSelector((state) => state.cycleConfigured);

  const notifyInf = () => {
    toast.info('Configura el ciclo antes de continuar', {
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


  const handleCompleteStage = (stageId) => {
    if (!isCycleConfigured) {
      notifyInf();
      return;
    }
    // Disparar la acción para completar la etapa
    dispatch(completeStage(stageId));

    // Redirigir al home
    navigate('/admin/home-ssiu');
  };
  

useEffect(() => {
  console.log("Estado actualizado de stageStatus:", stageStatus);
}, [stageStatus]);

  // Función para determinar el color de la etapa en función de su estado
  const getStageColor = (stage) => {
    if (stage.completed) return 'bg-green-500'; // Etapa completada
    if (stage.active) return 'bg-blue-500'; // Etapa activa
    return 'bg-blue-200'; // Etapa no iniciada
  };

  return (
    <div>
    <ToastContainer />
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Test Page</h1>
      <button
        onClick={() => handleCompleteStage(1)} // Cambia el ID según el que quieras probar
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Completar Etapa 1
      </button>
      <button
        onClick={() => navigate('/admin/home-ssiu')} // Regresa a la página principal
        className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
      >
        Regresar a Home
      </button>
    </div>
    </div>
  );
};

export default TestPages;
