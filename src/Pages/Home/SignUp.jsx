import React from "react";
import { useForm } from "react-hook-form";

import LayoutH from "../../Components/LayoutHome";
import IconRegister from "../../Assets/Img/IconRegister.svg";
import IconHomeLogin from "../../Assets/Img/IconHomeLogin.svg";

const SignUpForm = () => {
  // funcion register: registrar los difrentes campos
  // handlesubmit: gestionar el envio de datos, la accion de enviar los datos
  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Data hace referencia a los datos de el formulario que va a recibir la funcion
  const onSubmit = (data) => {};
  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center">
        <form className='w-72 h-96' onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-center">
            <img
              src={IconHomeLogin}
              alt="Icono para home"
              className="h-20 w-20 mb-3"
            />
          </div>
          <h2 className="text-2xl text-center font-bold mb-2">Registro</h2>
          <div className="mb-3 flex flex-col gap-1 items-center">
            <label className="font-semibold">Nombre completo</label>
            <input
              type="text"
              placeholder="Ingresar nombre completo"
              className="mt-1 p-2 border rounded w-full"
              {...register("nombre", {
                required: true,
                maxLength: 100,
              })}
            />
            {errors.nombre?.type === "required" && <p className="font-extralight text-sm text-red-600">El campo es requerido</p>}
            {errors.nombre?.type === "maxLength" && (
              <p className="font-extralight text-sm text-red-600">El campo debe tener menos de 100 caracteres</p>
            )}
          </div>
          <div className="mb-2 flex flex-col gap-1 items-center">
            <label className="font-semibold">Tipo de documento</label>
            <select className="mt-1 p-2 border rounded w-full" {...register("typeDni")}>
              <option value="T.I">Tarjeta de identidad</option>
              <option value="C.C">Cedula de ciudadania</option>
            </select>
          </div>
          <div className="mb-2 flex flex-col gap-1 items-center">
            <label className="font-semibold">Numero de documento</label>
            <input
              type="text"
              placeholder="Ingresar numero de documento"
              className="mt-1 p-2 border rounded w-full"
              {...register("dni", {
                required: true,
                maxLength: 11,
              })}
            />
            {errors.dni?.type === "required" && <p className="font-extralight text-sm text-red-600">El campo es requerido</p>}
            {errors.dni?.type === "maxLength" && (
              <p className="font-extralight text-sm text-red-600">El campo debe tener menos de 11 caracteres</p>
            )}
          </div>
          <div className="mb-2 flex flex-col gap-2 items-center">
            <label className="font-semibold">Correo Institucional</label>
            <input
              type="text"
              placeholder="Ingresar correo institucional"
              className="mt-1 p-2 border rounded w-full"
              {...register("email", {
                required: true,
                maxLength: 100,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              })}
            />
            {errors.email?.type === "required" && <p className="font-extralight text-sm text-red-600">El campo es requerido</p>}
            {errors.email?.type === "maxLength" && (
              <p className="font-extralight text-sm text-red-600">El campo debe tener menos de 100 caracteres</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="font-extralight text-sm text-red-600">El campo debe ser un correo</p>
            )}
            <button
                type="submit"
                className="flex bg-[#28537E] text-white px-2 py-0 
                rounded hover:bg-[#46525e] 
                items-center justify-center w-36 h-9 mb-3"
            >
                <span className=" text-xs">Registrarse</span>
                <img
                src={IconRegister}
                alt="Ícono sesión"
                className="px-2 w-8 h-8"
                />
            </button>
          </div>
        </form>
      </div>
    </LayoutH>
  );
};

export default SignUpForm;
