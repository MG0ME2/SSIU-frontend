import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
 completeStage
} from "../../redux/states/stageStatusSlice";// Asegúrate de ajustar la ruta de importación

const TestPages = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stageStatus = useSelector((state) => state.stageStatus);

  const handleCompleteStage = (stageId) => {
    console.log("Completar etapa con ID:", stageId);
    if (!stageId) {
      console.error("stageId no está definido o es inválido");
      return;
    }
    
    dispatch(completeStage(stageId));

      // Espera que el estado se actualice
  setTimeout(() => {
    console.log("Estado actualizado de stageStatus después de completar la etapa:", stageStatus);
  }, 1000); // Ajusta el tiempo si es necesario
};

useEffect(() => {
  console.log("Estado actualizado de stageStatus:", stageStatus);
}, [stageStatus]);



  return (
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
  );
}

export default TestPages;
