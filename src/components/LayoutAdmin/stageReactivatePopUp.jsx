import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import ButtonWithoutIcon from '../Buttons/withoutIcon';

const StageReactivatePopUp = ({ onClose }) => {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative max-w-md z-60">
        <FaTimes
          className="absolute top-2 right-2 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-blue-800">
            PROGRAMA: INGENIERIA DE SISTEMAS
            <br />
            ETAPA: 1
          </h2>
          <p className="text-gray-800">
            Indica el motivo para la solicitud de reactivación
          </p>
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border rounded resize-none"
            rows="4"
            placeholder="Escribe tu motivo aquí..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <ButtonWithoutIcon
            title="Cancelar"
            onClick={onClose}
            className="bg-gray-300 text-gray-800"
          />
          <ButtonWithoutIcon
            title="Enviar"
            onClick={() => {
              console.log('Motivo enviado:', reason);
              onClose();
            }}
            className="bg-blue-600 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default StageReactivatePopUp;
