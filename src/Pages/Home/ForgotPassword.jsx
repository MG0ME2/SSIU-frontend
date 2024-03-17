import React from "react";
import {PaperAirplaneIcon} from '@heroicons/react/24/solid';

import LayoutH from "../../Components/LayoutHome";

const ForgotPassword = () => {
  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3">
            <p className="font-bold text-2xl">Olvidaste tu contraseña?</p>
            <p className="text-center font-normal text-lg">
              No te preocupes! Por favor ingresa tu correo institucional
              asociado <br />a la cuenta que deseas recuperar para verificar que
              eres tu.
            </p>
          </div>
          <div className="mb-3 flex flex-col items-center gap-3">
            <input
              type="text"
              placeholder="Ingresar correo institucional"
              className="mt-1 p-2 text-center font-extralight text-lg border-2 border-[#28537E]  rounded w-80 h-11"
            />
            <button
              type="submit"
              className="flex bg-[#28537E] text-white px-2 py-0 
              rounded hover:bg-[#46525e] 
              items-center justify-center w-36 h-9 mb-3 gap-3"
            >
              <span className="ml-1 text-lg">Enviar   </span>
              <PaperAirplaneIcon className="h-5 w-5 text-white"></PaperAirplaneIcon>
            </button>
          </div>
        </div>
      </div>
    </LayoutH>
  );
};

export default ForgotPassword;
