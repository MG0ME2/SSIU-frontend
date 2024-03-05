import React, { useState,FocusEvent  } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import LayoutGraduates from "../../Components/LayoutGraduates";
import ImgGraduat from "../../Assets/Img/ReemplaceImg.svg";
import IconDelete from "../../Assets/Img/IconDelete.svg";
import IconUpload from "../../Assets/Img/IconUpload.svg";
import IconSave from "../../Assets/Img/IconSave.svg";



function DatosPersonales() {
  const { register } = useForm();
  return (
    <div className="grid grid-cols-2 gap-x-8">
      <div className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Traer nombre de la BD"
          className="mt-1 p-2 border rounded"
          disabled
        />
        <select
          className="mt-1 p-2 border rounded w-full"
          {...register("typeDni")}
        >
          <optgroup label="Tipo de documento">
            <option disabled selected hidden>
              Tipo de documento
            </option>
            <option value="T.I">Tarjeta de identidad</option>
            <option value="C.C">Cedula de ciudadania</option>
          </optgroup>
        </select>
        <input
          type="text"
          placeholder="Correo personal"
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Traer apellido de la BD"
          className="mt-1 p-2 border rounded "
          disabled
        />
        <input
          type="text"
          placeholder="Numero de identificación"
          className="mt-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Correo alternativo"
          className="mt-1 p-2 border rounded"
        />
      </div>
    </div>
  );
}
 
function DatosLaborales() {

  return (
    <div className="grid grid-cols-2 gap-x-8">
      <div className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Empresa actual"
          className="mt-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Dirección de la empresa"
          className="mt-1 p-2 border rounded"
        />
        <label>fecha inicial de contrato</label>
        <input
          type="date"
          placeholder="Fecha inicio del contrato"
          className="mt-1 p-2 border rounded"
        />
      </div>
      <div className="flex flex-col justify-center">
        <input
          type="text"
          placeholder="Contacto de la empresa"
          className="mt-1 p-2 border rounded "
        />
        <input
          type="text"
          placeholder="Cargo de la empresa"
          className="mt-1 p-2 border rounded"
        />
        <label>fecha final de contrato</label>
        <input
          type="date"
          placeholder="Seleccione una fecha"
          class="mt-1 p-2 border rounded w-full"
         />
      </div>
    </div>
  );
}

const GraduatesPerfil = () => {
  const [activeTab, setActiveTab] = useState("datos");

  const tab = (tabs) => {
    setActiveTab(tabs);
  };

  return (
    <LayoutGraduates>
      <div className="flex flex-grow items-center justify-center flex-col mb-12">
        <div className="flex justify-center">
          <img
            src={ImgGraduat}
            alt="Icono para graduado"
            className="h-20 w-20 mb-3"
          />
        </div>
        <div className="flex mt-1">
          <button className="flex bg-[#28537E] text-white px-2 py-0 rounded hover:bg-[#46525e] items-center w-auto h-auto mr-6">
            <span className="text-xs">Eliminar imagen</span>
            <img src={IconDelete} alt="Ícono sesión" className="px-2 w-8 h-8" />
          </button>
          <button className="flex bg-[#28537E] text-white px-2 py-0 rounded hover:bg-[#46525e] items-center w-auto h-auto ml-2">
            <span className="ml-1 text-xs">Cargar imagen</span>
            <img src={IconUpload} alt="Ícono sesión" className="px-2 w-8 h-8" />
          </button>
        </div>
        <div>
          <p className="flex text-[#428BCA] justify-center text-base mt-2 mb-2">
            <NavLink to="/graduates/Perfil">Cambiar contraseña</NavLink>
          </p>
        </div>

        {/* Tab */}
        <div className="flex flex-col items-center">
          <div className="flex justify-center w-full px-4 py-2 rounded-t-lg">
            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "datos"
                  ? "px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none"
                  : "bg-[#777777] bg-opacity-10"
              }`}
              onClick={() => tab("datos")}
              aria-selected={activeTab === "datos"}
            >
              Datos Personales
            </button>

            <button
              className={`px-4 py-2 rounded-t-lg ${
                activeTab === "laborales"
                  ? "px-4 py-2 border-b-2 border-[#28537E] text-blue-500 hover:text-[#28537E] focus:outline-none"
                  : "bg-[#777777] bg-opacity-10"
              }`}
              onClick={() => tab("laborales")}
              aria-selected={activeTab === "laborales"}
            >
              Datos Laborales
            </button>
          </div>

          <div className=" mx-auto max-w-lg">
            {activeTab === "datos" ? <DatosPersonales /> : <DatosLaborales />}
          </div>
        </div>

        {/*bton*/}
        <div className="flex justify-start">
        <button className="flex bg-[#28537E] text-white px-2 py-0 rounded hover:bg-[#46525e] items-center w-auto h-auto">
            <span className="text-xs">Guardar</span>
            <img src={IconSave} alt="Ícono sesión" className="px-2 w-8 h-8" />
          </button>
        </div>

      </div>
    </LayoutGraduates>
  );
};

export default GraduatesPerfil;
