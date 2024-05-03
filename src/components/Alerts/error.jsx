import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ErrorAlert = () => {
  return (
    <div
      role="alert"
      className="absolute top-0 right-0 w-1/3 mr-4 mt-4 shadow-xl opacity-95"
    >
      <div class="bg-[#FE3D31] text-white text-md font-bold h-8 rounded-t px-4 py-1 flex items-center gap-2">
        <ExclamationCircleIcon className="size-6 text-white" />
        <p>Error</p>
      </div>
      <div class="border border-t-0 border-red-400 h-7 text-sm rounded-b bg-red-100 px-5 py-1 text-[#FE3D31]">
        <p>No se encontro usuario</p>
      </div>
    </div>
  );
};

export default ErrorAlert;