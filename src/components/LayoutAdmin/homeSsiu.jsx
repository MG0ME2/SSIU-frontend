import React, { useEffect, useState } from 'react';

import IconDate from '../../assets/Img/IconDate.svg';
import IconStart from '../../assets/Img/IconStart.svg';

import ButtonPrimary from '../Buttons/primary';
import ButtonOnclick from '../Buttons/onclick';

import ConfigDatePopUp from './configDatePopUp';

function HomeSSIU() {
  const [showConfigDatePopUp, setShowConfigDatePopUp] = useState(false);

  const handleAddDateMDIClick = () => {
    setShowConfigDatePopUp(!showConfigDatePopUp);
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
          title={'Iniciar Cliclo'}
          icono={IconStart}
          typeB="button"
          to={'/admin/home-ssiu'}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-full place-items-center">
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 1</span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 2</span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 3</span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 4</span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 5</span>
        </div>
        <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-100">
          <span className="text-blue-700 font-semibold">Etapa 6</span>
        </div>
      </div>
    </div>
  );
}

export default HomeSSIU;
