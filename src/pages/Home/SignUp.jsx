import {useForm} from "react-hook-form";
import axios from "axios";
import {useState, useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {Link, json, useNavigate} from "react-router-dom";

import LayoutH from "../../components/LayoutHome";
import IconRegister from "../../assets/Img/IconRegister.svg";
import IconHomeLogin from "../../assets/Img/IconHomeLogin.svg";
import ButtonPrimary from "../../components/Buttons/primary.jsx";
import {useLocalStorage} from "../../components/localStorage/index.jsx";
import {login} from "../../redux/states/authSlice.js";


const SignUpForm = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [getDniTypesUL, setDniTypesUL] = useLocalStorage('dniTypes');
  const [getWarnignMessage, setWarnignMessage] = useLocalStorage('warnignLogin');
  
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [dniType, setDniType] = useState("");
  
  let navigate = useNavigate();
  
  //se utiliza para dejar inicializado el valor del State de options
  const jsonData = {
    data: []
  };
  
  //carga de los dniTypes en el Select
  useEffect(() => {
    const getDniTypes = async () => {
      try {
        if (!getDniTypesUL() || options) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dni-types`);
          if (response.data.length > 1) {
            setDniTypesUL(response.data);
            setOptions(getDniTypesUL());
          } else {
            setOptions(jsonData.data);
          }
        } else {
          setOptions(jsonData.data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        console.log('Error al obtener los datos:', error);
      }
    };
    getDniTypes();
  }, []);
  
  //evento que ejecuta la validacion y activacion del usuario
  
  const notifyW = () => {
    toast.warning(getWarnignMessage());
  }
  
  const notifyE = () => {
    toast.error(getWarnignMessage());
  }
  
  const notifyS = () => {
    toast.done(getWarnignMessage());
  }
  
  const handleSignUp = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const form = {
      email: formData.get("email"),
      dni: parseInt(formData.get("dni")),
      dniTypeId: parseInt(formData.get("dniType"))
    };
    
    console.log(form);
    
    const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/signup`, form);
    console.log(data)
    if (data.status === parseInt("401")) {
      console.log(data) // FALTANTE
    } else if (data.error) {
      setWarnignMessage(data.error)
      notifyW()
      console.log(data.error);
    } else {
      setWarnignMessage(data.success)
      notifyS()
      console.log(data.success)
      navigate(`/login`)
    }
  };
  
  //estructura del componente
  return (
    <LayoutH>
      <ToastContainer/>
      <div className="flex-grow flex items-center justify-center">
        <form className='w-72 h-96' onSubmit={handleSignUp}>
          <div className="flex items-center justify-center">
            <img
              src={IconHomeLogin}
              alt="Icono para home"
              className="h-20 w-20 mb-3"
            />
          </div>
          <h2 className="text-2xl text-center font-bold mb-2">Registro</h2>
          <div className="mb-2 flex flex-col gap-1 items-start">
            <select className="mt-1 p-2 border rounded w-full"
                    value={selectedOption ? selectedOption : undefined}
                    onChange={(e) => setSelectedOption(e.target.description)}
                    id="dniType"
                    name="dniType">
              <option key={0} value={0}>{"Seleccione"}</option>
              {options?.map(option => (
                <option key={option.id} value={option.id}>{option.description}</option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex flex-col gap-1 items-center">
            <input
              type="number"
              id="dni"
              name="dni"
              placeholder="Ingresar numero de documento"
              className="mt-1 p-2 border rounded w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required={true}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          
          <div className="mb-2 flex flex-col gap-2 items-center">
            <input
              type="email"
              id="email"
              name="email"
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
