import { useForm } from "react-hook-form";

import LayoutH from "../../components/LayoutHome";
import IconRegister from "../../assets/Img/IconRegister.svg";
import IconHomeLogin from "../../assets/Img/IconHomeLogin.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import ButtonPrimary from "../../components/Buttons/primary.jsx";
import {login} from "../../redux/states/authSlice.js";


const  SignUpForm = () => {
  const [options, setOptions]=useState([]);
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [dniTypes, setDniTypes] = useState("");

  useEffect(() => {
    const getDniTypes = async () => {
      try {
        let dniTypes = JSON.parse(localStorage.getItem('dniTypes'));
        if (!dniTypes) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dni-types`);
          dniTypes = response.data;
          localStorage.setItem('dniTypes', JSON.stringify(dniTypes));
        }
        setOptions(dniTypes);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        localStorage.setItem('dniTypes', JSON.stringify('{id: 0, description: "hola"}'));
      }
    };
    getDniTypes();
},[]);

  const handleLogin = async (event) => {
    event.preventDefault();

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, form);

      if (data.status === parseInt("401")) {
        setErrorMessage(data);
      }else if(data.error){
        // comentario de jose
        setWarnignMessage(data.error)
        notify()
        console.log(data.error);
      }
      else {
        setToken(data.access_token);
        setUser(data.user);
        setIsLogged('true');
        navigate(`/${data.user.role[0].description}`)
      }
      dispatch(login(data.user));
  };

  // funcion register: registrar los difrentes campos
  // handlesubmit: gestionar el envio de datos, la accion de enviar los datos
  //
  const {
    register,
    handleSubmit,
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
          <div className="mb-2 flex flex-col gap-1 items-start">
            <select className="mt-1 p-2 border rounded w-full" value={dniTypes ? dniTypes : undefined}  onChange={(e) => setDniTypes(e.target.value)}>
              {JSON.parse(localStorage.getItem('dniTypes')).map(option => (
                  <option key={option.id} value={option.id}>{option.description}</option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex flex-col gap-1 items-center">
            <input
                type="text"
                placeholder="Ingresar numero de documento"
                className="mt-1 p-2 border rounded w-full"
                required={true}
                onChange={(e) => setDni(e.target.value)}
            />
          </div>

          <div className="mb-2 flex flex-col gap-2 items-center">
            <input
                type="email"
                placeholder="Ingresar correo institucional"
                className="mt-1 p-2 border rounded w-full"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
           <ButtonPrimary title={'Registrar'} icono={IconRegister} typeB='submit' to={''}/>
          </div>
        </form>
      </div>
    </LayoutH>
  );
};

export default SignUpForm;
