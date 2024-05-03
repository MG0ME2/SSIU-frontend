import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const SuccessAlert = () => {
  return (
    <div
      role="alert"
      className="absolute top-0 right-0 w-1/3 mr-4 mt-4 shadow-xl opacity-95"
    >
      <div class="bg-green-500 text-white text-md font-bold h-8 rounded-t px-4 py-1 flex items-center gap-2">
        <CheckCircleIcon className="size-6 text-white" />
        <p>Correcto</p>
      </div>
      <div class="border border-t-0 border-[#ADE7C6] bg-green-100 h-7 text-sm rounded-b px-5 py-1 text-green-500">
        <p>Succesfull</p>
      </div>
    </div>
  );
};

export default SuccessAlert;
