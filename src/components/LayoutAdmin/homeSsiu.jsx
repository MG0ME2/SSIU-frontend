import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconDate from "../../assets/Img/IconDate.svg";
import IconStart from "../../assets/Img/IconStart.svg";
import IconOnlyCheck from "../../assets/Img/IconOnlyCheck.svg";

import ButtonOnclick from "../Buttons/onclick";

import ConfigDatePopUp from "./configDatePopUp";
import TestPage from "./testPage";
//import StageBlockPopUp from './stageBlockPopUp';

import {
  setHoveredStage,
  clearHoveredStage,
} from "../../redux/states/hoveredStageSlice";

import {
  // completeStage,
  reactivateStage,
} from "../../redux/states/stageStatusSlice";

function HomeSSIU() {
  const dispatch = useDispatch();
  const stageStatusObject = useSelector((state) => state.stageStatus);
  const hoveredStage = useSelector((state) => state.hoveredStage.hoveredStage);

  const navigate = useNavigate();
  const [showConfigDatePopUp, setShowConfigDatePopUp] = useState(false);
  const [cycleStarted, setCycleStarted] = useState(false);
  const [requestReason, setRequestReason] = useState("");

  // Convertir el objeto de estado en un array
  const stageStatus = Array.isArray(stageStatusObject)
    ? stageStatusObject
    : Object.values(stageStatusObject).filter((item) => item.id !== undefined);

  if (!Array.isArray(stageStatus)) {
    console.log(
      "Error: El estado de las etapas no está disponible o no es un array."
    );
    return <div>Error: El estado de las etapas no está disponible.</div>;
  }

  console.log(
    "Tipo de stageStatus:",
    Array.isArray(stageStatus) ? "Array" : "No es un Array"
  );

  const handleAddDateMDIClick = () => {
    setShowConfigDatePopUp(!showConfigDatePopUp);
  };

  const handleMouseEnter = (stageId) => {
    dispatch(setHoveredStage(stageId));
  };

  const handleMouseLeave = () => {
    dispatch(clearHoveredStage());
  };

  const handleStartCycle = () => {
    setCycleStarted(true);
    navigate("/admin/test-status-page");
  };

  const handleStageClick = (stageId) => {
    const stage = stageStatus.find((stage) => stage.id === stageId);
    if (cycleStarted && stage.active) {
      navigate("/admin/test-status-page");
    }
  };

   const handleCompleteStage = (stageId) => {
     dispatch(completeStage(stageId));
   };

  const handleReactivateStage = (stageId) => {
    if (requestReason.trim() !== "") {
      dispatch(reactivateStage({ id: stageId, reason: requestReason }));
      setRequestReason("");
    } else {
      alert("Debes proporcionar un motivo para reactivar la etapa.");
    }
  };

  const getStageText = (stageId) => {
    switch (stageId) {
      case 1:
        return "Definición de variables y indicadores";
      case 2:
        return "Técnicas de recolección de información";
      case 3:
        return "Aplicación del instrumento";
      case 4:
        return "Resultado de instrumentos aplicados";
      case 5:
        return "Análisis de los resultados";
      case 6:
        return "Comunicar los resultados";
      default:
        return "";
    }
  };

  const getStageColor = (stage) => {
    if (stage.completed) return "bg-green-300";
    if (stage.active) return "bg-blue-100";
    return "bg-blue-300";
  };

  return (
    <div className="flex flex-grow items-center justify-center flex-col mb-4">
      <div className="text-lg font-semibold mb-4 ml-0">
        Medición de Impacto a Graduados
      </div>

      <div className="flex items-center justify-between mb-4 ml-0 space-x-4">
        <ButtonOnclick
          title={"Configurar ciclo de medición"}
          icono={IconDate}
          onClick={handleAddDateMDIClick}
          disabled={cycleStarted}
        />
        {showConfigDatePopUp && (
          <ConfigDatePopUp onClose={handleAddDateMDIClick} />
        )}

        {!cycleStarted && (
          <ButtonOnclick
            title={"Iniciar Ciclo"}
            icono={IconStart}
            onClick={handleStartCycle}
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full place-items-center relative">
        {stageStatus.map((stage) => (
          <div key={`stage-${stage.id}`} className="flex flex-col items-center">
            {/* Nombre de la etapa encima del círculo, visible solo en hover */}
            <div
              className={`mb-2 transition-opacity duration-300 ${
                hoveredStage === stage.id ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-slate-950 text-center px-4">
                {getStageText(stage.id)}
              </span>
            </div>

            <div
              className={`relative group w-32 h-32 flex items-center justify-center rounded-full ${getStageColor(
                stage
              )} overflow-hidden cursor-pointer`}
              onMouseEnter={() => handleMouseEnter(stage.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleStageClick(stage.id)}
              style={{
                transition: "transform 0.3s",
                transform:
                  hoveredStage === stage.id ? "translateY(3rem)" : "none",
              }}
            >
              {/* Icono de check */}
              <img
                src={IconOnlyCheck}
                className={`absolute transform transition duration-300 ${
                  hoveredStage === stage.id ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* Texto de la etapa dentro del círculo */}
              {hoveredStage === stage.id && (
                <div className="absolute inset-0 flex items-center justify-center transition duration-300">
                  <span className="text-slate-950 text-center">{`Etapa ${stage.id}`}</span>
                </div>
              )}
            </div>

            {stage.status === "completed" && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Motivo para reactivar"
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() => handleReactivateStage(stage.id)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Solicitar Reactivación
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeSSIU;
