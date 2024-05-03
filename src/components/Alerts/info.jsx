import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const InfoAlert = () => {
  return (
    <div
      role="alert"
      className="absolute top-0 right-0 w-1/3 mr-4 mt-4 shadow-xl opacity-95"
    >
      <div class="bg-[#357EBD] text-white text-md font-bold h-8 rounded-t px-4 py-1 flex items-center gap-2">
        <InformationCircleIcon className="size-6 text-white" />
        <p>Cuidado</p>
      </div>
      <div class="border border-t-0 border-[#357EBD] bg-blue-100 h-7 text-sm rounded-b px-5 py-1 text-[#357EBD]">
        <p>Warning</p>
      </div>
    </div>
  );
};

export default InfoAlert;