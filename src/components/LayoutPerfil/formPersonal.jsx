import { useForm } from 'react-hook-form';
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocalStorage} from "../localStorage/index.jsx";
function DatosPersonales() {
    const { register } = useForm();
    const [options, setOptions] = useState([]);
    const [optionGenders, setOptionGenders] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    ///
    const [getDniTypesUL, setDniTypesUL] = useLocalStorage('dniTypes');
    const [getStatusUL, setStatusUL] = useLocalStorage('status');
    const [getUser, setUser] = useLocalStorage('user');

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
        if (!getStatusUL() || optionGenders) {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/genders`);
          if (response.data.length > 1) {
            setStatusUL(response.data);
            setOptionGenders(getStatusUL());
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



    return (
          <div className="grid grid-cols-2 gap-x-8">
              <div className="flex flex-col justify-center gap-4">
                  <input
                      type="text"
                      placeholder="Traer nombre de la BD"
                      className="mt-1 p-2 border rounded"
                      defaultValue={getUser().name}
                      // onChange={getUser().name}
                  />
                  <select className="mt-1 p-2 border rounded w-full"
                          value={selectedOption ? setSelectedOption(options[getUser().dni_type.id].description) : undefined}
                          // onChange={() => setSelectedOption(options[getUser().dni_type.id].description)}
                          id="dniType"
                          name="dniType">
                      <option key={0} value={0}>{"Seleccione su tipo de documento"}</option>
                      {options?.map(option => (
                          <option key={option.id} value={option.id}>{option.description}</option>
                      ))}
                  </select>
                  <select className="mt-1 p-2 border rounded w-full"
                          value={selectedOption ? selectedOption : undefined}
                          // onChange={(e) => setSelectedOption(e.target.description)}
                          id="status"
                          name="status">
                      <option key={0} value={0}>{"Seleccione su genero"}</option>
                      {optionGenders?.map(option => (
                          <option key={option.id} value={option.id}>{option.description}</option>
                      ))}
                  </select>
                  <input
                      type="text"
                      placeholder="Correo Institucional"
                      className="mt-1 p-2 border rounded"
                      defaultValue={getUser().email}
                      // onChange={getUser().email}
                  />
              </div>
              <div className="flex flex-col justify-center gap-4">
                  <input
                      type="text"
                      placeholder="Traer apellido de la BD"
                      className="mt-1 p-2 border rounded "
                      defaultValue={getUser().last_name}
                      // onChange={getUser().last_name}
                  />
                  <input
                      type="text"
                      placeholder="Numero de identificación"
                      className="mt-1 p-2 border rounded"
                      defaultValue={getUser().dni}
                      // onChange={getUser().dni}
                  />
                  <input
                      type="text"
                      placeholder="Correo alternativo"
                      className="mt-1 p-2 border rounded"
                      defaultValue={(getUser().alt_email ? getUser().alt_email : '')}
                      // onChange={(getUser().alt_email ? getUser().alt_email : '')}
                  />
                  <input
                      type="text"
                      placeholder="Numero de telefono"
                      className="mt-1 p-2 border rounded"
                      defaultValue={getUser().phone_number}
                      // onChange={getUser().phone_number}
                  />
              </div>
          </div>
    );
  }

export default DatosPersonales;