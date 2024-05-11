import {useForm} from 'react-hook-form';
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocalStorage} from "../localStorage/index.jsx";
import ButtonPrimary from "../Buttons/primary.jsx";
import IconSaves from "../../assets/Img/IconSaves.svg";
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";


function DatosPersonales() {
  //useState
  const {register} = useForm();
  const [options, setOptions] = useState([]);
  const [optionGenders, setOptionGenders] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  
  ///Formulario
  
  //local storage
  const [getDniTypesUL, setDniTypesUL] = useLocalStorage('dniTypes');
  const [getGendersUl, setGendersUl] = useLocalStorage('status');
  const [getUser, setUser] = useLocalStorage('user');
  const [getWarnignMessage, setWarnignMessage] = useLocalStorage('warnignLogin');
  
  //Alertas
  const notifyW = () => {
    toast.warning(getWarnignMessage());
  }
  
  const notifyE = () => {
    toast.error(getWarnignMessage());
  }
  
  const notifyS = () => {
    toast.done(getWarnignMessage());
  }
  
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
    
    const getGenders = async () => {
      try {
        if (!getGendersUl() || optionGenders) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/genders`);
          if (response.data.length > 1) {
            setGendersUl(response.data);
            setOptionGenders(getGendersUl());
            // setSelectedOption(options[getUser().dni_type.id].description);
          } else {
            setOptionGenders(jsonData.data);
          }
        } else {
          setOptionGenders(jsonData.data);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        console.log('Error al obtener los datos:', error);
      }
    };
    getGenders();
  }, []);
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    
    const inputDniType = document.getElementById('dniType');
    const inputDni = document.getElementById('dni');
    const inputEmail = document.getElementById('email');
    
    const form = {
      name: formData.get("name"),
      last_name: formData.get("last_name"),
      dni: inputDni.disabled ? getUser().dni : parseInt(formData.get("dni")),
      dniTypeId: inputDniType.disabled ? getUser().dni_type.id : parseInt(formData.get("dniType")),
      email: inputEmail.disabled ? getUser().email : formData.get("email"),
      alt_email: formData.get("alt_email").length > 1 ? formData.get("alt_email") : null,
      phone_number: parseInt(formData.get("phone_number")),
      genderId: parseInt(formData.get("gender")),
    };
    console.log(form)
    
    const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/${getUser().id}`, form);

    if (data.status === parseInt("401")) {
      console.log(data)
    } else {
      console.log(data);
      setUser(data);
      setWarnignMessage("Se actualizaron los datos exitosamente")
      notifyS()
    }
  };
  
  return (
    <div>
      <form className="flex flex-col gap-4 items-center" onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-x-8">
          <div className="flex flex-col justify-center gap-4">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Traer nombre de la BD"
              className="mt-1 p-2 border rounded"
              defaultValue={getUser().name}
            />
            <select className="mt-1 p-2 border rounded w-full"
                    value={selectedOption ? selectedOption : undefined}
                    onChange={(e) => setSelectedOption(e.target.description)}
                    disabled
                    id="dniType"
                    name="dniType">
              <option key={getUser().dni_type.id}
                      value={getUser().dni_type.id}>{getUser().dni_type.description}</option>
              {options?.map(option => {
                if (option.id === getUser().dni_type.id) {
                  return null; // Devolver null para excluir este dato del mapeo
                }
                return (
                  <option key={option.id} value={option.id}>{option.description}</option>
                )
              })}
            </select>
            <select className="mt-1 p-2 border rounded w-full"
                    value={selectedOption ? selectedOption : undefined}
                    onChange={(e) => setSelectedOption(e.target.description)}
                    id="gender"
                    name="gender">
              <option key={getUser().gender.id} value={getUser().gender.id}>{getUser().gender.description}</option>
              {optionGenders?.map(option => {
                if (option.id === getUser().gender.id) {
                  return null; // Devolver null para excluir este dato del mapeo
                }
                return (
                  <option key={option.id} value={option.id}>{option.description}</option>
                )
              })}
            </select>
            <input
              type="mail"
              id="email"
              name="email"
              required
              disabled
              placeholder="Correo Institucional"
              className="mt-1 p-2 border rounded"
              defaultValue={getUser().email}
            />
          </div>
          
          <div className="flex flex-col justify-center gap-4">
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              placeholder="Traer apellido de la BD"
              className="mt-1 p-2 border rounded "
              defaultValue={getUser().last_name}
            />
            <input
              type="number"
              id="dni"
              name="dni"
              required
              disabled
              placeholder="Numero de identificación"
              className="mt-1 p-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              defaultValue={getUser().dni}
            />
            <input
              type="email"
              id="alt_email"
              name="alt_email"
              placeholder="Correo alternativo"
              className="mt-1 p-2 border rounded"
              defaultValue={(getUser().alt_email ? getUser().alt_email : '')}
            />
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              required
              placeholder="Numero de telefono"
              className="mt-1 p-2 border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              defaultValue={getUser().phone_number}
            />
          </div>
        </div>
        
        <ButtonPrimary
          title={'Guardar'}
          icono={IconSaves}
          typeB="submit"
        />
      </form>
    </div>
  );
}

export default DatosPersonales;