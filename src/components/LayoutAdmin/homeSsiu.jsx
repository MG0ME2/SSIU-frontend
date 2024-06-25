import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconDate from '../../assets/Img/IconDate.svg';
import IconStart from '../../assets/Img/IconStart.svg';
import IconOnlyCheck from '../../assets/Img/IconOnlyCheck.svg';

import ButtonPrimary from '../Buttons/primary';
import ButtonOnclick from '../Buttons/onclick';

import ConfigDatePopUp from './configDatePopUp';

import { setHoveredStage, clearHoveredStage } from '../../redux/states/hoveredStageSlice'

function HomeSSIU() {
  const dispatch = useDispatch();
  const [showConfigDatePopUp, setShowConfigDatePopUp] = useState(false);
  const hoveredStage = useSelector((state) => state.hoveredStage.hoveredStage);

  const handleAddDateMDIClick = () => {
    setShowConfigDatePopUp(!showConfigDatePopUp);
  };

  const handleMouseEnter = (stage) => {
    dispatch(setHoveredStage(stage));
  };

  const handleMouseLeave = () => {
    dispatch(clearHoveredStage());
  };

  const getStageText = (stage) => {
    switch (stage) {
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
  
  return (
    <div className="flex flex-grow items-center justify-center flex-col mb-4">

      <div className="text-lg font-semibold mb-4 ml-0">
        Medición de Impacto a Graduados
      </div>

      <div className="flex items-center justify-between mb-4 ml-0 space-x-4">
        <ButtonOnclick
          title={'Configurar ciclo de medición'}
          icono={IconDate}
          onClick={handleAddDateMDIClick}
        />
        {showConfigDatePopUp && (
          <ConfigDatePopUp onClose={handleAddDateMDIClick} />
        )}

        <ButtonPrimary
          title={'Iniciar Ciclo'}
          icono={IconStart}
          typeB="button"
          to={'/admin/home-ssiu/activeStage1'}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full place-items-center">
  {[1, 2, 3, 4, 5, 6].map((stage) => (
    <div
      key={`stage-${stage}`}
      className="relative group w-32 h-32 flex items-center justify-center rounded-full bg-blue-100 overflow-hidden"
      onMouseEnter={() => handleMouseEnter(stage)}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s' }}
    >
      {/* Mostrar el ícono de check si no hay hover */}
      <img
        src={IconOnlyCheck}
        className={`absolute transform transition duration-300 ${hoveredStage === stage ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Mostrar el texto de la etapa dentro del círculo si hay hover */}
      {hoveredStage === stage && (
        <div className="absolute inset-0 flex items-center justify-center transition duration-300">
          <span className="text-slate-950 text-center px-4">{`Etapa ${stage}`}</span>
        </div>
      )}
      
      {/* Mostrar el texto que corresponde a la etapa fuera del círculo si hay hover */}
      {hoveredStage === stage && (
        <div className="absolute top-[-5rem] flex items-center justify-center w-full">
          <div className="bg-white shadow-md rounded-full py-2 px-4">
            <h1 className="text-slate-950 text-center">{getStageText(stage)}</h1>
          </div>
        </div>
      )}
    </div>
  ))}
</div>


    </div>
  );
}

export default HomeSSIU;
