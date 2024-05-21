import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
//import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, setDniType } from '../../redux/states/authSlice.js';

function DatosLaborales() {
  //useState
  const [options, setOptions] = useState([]);
  const [optionGenders, setOptionGenders] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { user, dniType } = useSelector((state) => state.auth);

  //

  return (
    <div className="grid grid-cols-2 gap-x-8 ">
      <div className="flex flex-col justify-center gap-4">
        <input
          type="text"
          placeholder="Empresa actual"
          className="mt-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Correo de contacto de la empresa"
          className="mt-1 p-2 border rounded"
        />
        <div>
          <select
            className="mt-1 p-2 border rounded w-full"
            value={selectedOption ? selectedOption : user.dni_type.id}
            onChange={(e) => setSelectedOption(e.target.value)}
            id="sector"
            name="sector"
          >
            <option key={user.dni_type.id} value={user.dni_type.id}>
              {' '}
              {user.dni_type.description}
            </option>
            {options?.map((option) => {
              if (option.id === user.dni_type.id) {
                return null; // Devolver null para excluir este dato del mapeo
              }
              return (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <input
          type="text"
          placeholder="Contacto de la empresa"
          className="mt-1 p-2 border rounded "
        />
        <input
          type="text"
          placeholder="Cargo en la empresa"
          className="mt-1 p-2 border rounded"
        />
        <div>
          <select
            className="mt-1 p-2 border rounded w-full"
            value={selectedOption ? selectedOption : user.dni_type.id}
            onChange={(e) => setSelectedOption(e.target.value)}
            id="typeNation"
            name="typeNation"
          >
            <option key={user.dni_type.id} value={user.dni_type.id}>
              {' '}
              {user.dni_type.description}
            </option>
            {options?.map((option) => {
              if (option.id === user.dni_type.id) {
                return null; // Devolver null para excluir este dato del mapeo
              }
              return (
                <option key={option.id} value={option.id}>
                  {option.description}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default DatosLaborales;
