import React,  { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import StageReactivatePopUp from './stageReactivatePopUp';


import ButtonWithoutIcon from '../Buttons/withoutIcon';

const StageBlockPopUp = ({ onClose }) => {

    const [showStageBlockPopUp, setShowStageBlockPopUp] = useState(true);
    const [showNewPopUp, setShowNewPopUp] = useState(false);

    const handleStageBlockPopUpClose = () => {
        setShowStageBlockPopUp(false);
      };
    
      const handleNewPopUpClose = () => {
        setShowNewPopUp(false);
      };
    
      const handleStageBlockPopUpConfirm = () => {
        setShowStageBlockPopUp(false);
        setShowNewPopUp(true);
      };

    return (
        <>
        {showStageBlockPopUp && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-md relative max-w-md z-60">
              <FaTimes
                className="absolute top-2 right-2 text-red-600 cursor-pointer"
                onClick={onClose}
              />
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-lg font-semibold text-blue-700">
                  Guardar Fechas de Etapas
                </h2>
              </div>
              <div className="flex items-center justify-center mb-4">
                <p className="text-center text-gray-800">
                  ¿Deseas enviar solicitud de reactivación de la etapa?
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <ButtonWithoutIcon
                  title="Cancelar"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-800"
                />
                <ButtonWithoutIcon
                  title="Aceptar"
                  onClick={handleStageBlockPopUpConfirm}
                  className="bg-blue-600 text-white"
                />
              </div>
            </div>
          </div>
        )}
        {showNewPopUp && <StageReactivatePopUp onClose={handleNewPopUpClose} />}
      </>
    );
  };

export default StageBlockPopUp;
