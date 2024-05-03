import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const WarnignAlert = () => {
  return (
    <div
      role="alert"
      className="absolute top-0 right-0 w-1/3 mr-4 mt-4 shadow-xl opacity-95"
    >
      <div class="bg-[#FFB800] text-white text-md font-bold h-8 rounded-t px-4 py-1 flex items-center gap-2">
        <ExclamationCircleIcon className="size-6 text-white" />
        <p>Cuidado</p>
      </div>
      <div class="border border-t-0 border-[#FFB800] bg-yellow-100 h-7 text-sm rounded-b px-5 py-1 text-[#FFB800]">
        <p>Warning</p>
      </div>
    </div>
  );
};

export default WarnignAlert;