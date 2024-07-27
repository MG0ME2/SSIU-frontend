import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// redux
import {
fetchAcademicProgram
} from '../../redux/states/academicProgramSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';
import IconAdd from '../../assets/Img/IconAdd.svg';

// component
import ButtonIcon from '../Buttons/Icon';
import ButtonPrimary from '../Buttons/primary';
import ButtonOnclick from '../Buttons/onclick';

import ChangeAPPopUp from './change-AcedemicProgram'; 
import AddAcademicProgramsPopUp from './add-AcademicProgramPopUp';


const AcademicPrograms = () => {
  const dispatch = useDispatch();
  const [statuses, setStatuses] = useState([]);
  const academicProgram = useSelector((state) => state.academicProgram.data);

  const [showAddAcademicPopup, setshowAddAcademicPopup] = useState(false);
  const [showChangeAPPopUp, setShowChangeAPPopUp] = useState(false);


  const handleAddacademicClick = () => {
    setshowAddAcademicPopup(!showAddAcademicPopup);
  };
  
  const handleChangeIndicadorClick = () => {
    setShowChangeAPPopUp(!showChangeAPPopUp);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        dispatch(fetchAcademicProgram());
      } catch (error) {
        console.error('Error fetching academic programs:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log("Componente AcademicPrograms, datos de programas académicos:", academicProgram);
  }, [academicProgram]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
      Gestión de programas academicos
      </h2>
      <div className="max-h-80 overflow-y-auto mb-8">
        <table className="table-auto w-full mb-4 border border-gray-400">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Nombre del programa acedemico</th>
              <th className="border border-gray-400 px-4 py-2">Código del programa</th>
              <th className="border border-gray-400 px-4 py-2">Estado</th>
              <th className="border border-gray-400 px-4 py-2">Gestión</th>
            </tr>
          </thead>
          <tbody>
            {academicProgram.map((program, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{program.name}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">{program.code}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center">
                  <span className="text-green-500">
                    {program.status.description}
                    </span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                  <ButtonOnclick
                            icono={IconPencil}
                            onClick={handleChangeIndicadorClick}
                          />
                          {showChangeAPPopUp && (
                            <ChangeAPPopUp onClose={handleChangeIndicadorClick} />
                          )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ButtonOnclick title={'Agregar programa academico'} icono={IconAdd} onClick={handleAddacademicClick} />
        {showAddAcademicPopup && (
              <AddAcademicProgramsPopUp
                onClose={handleAddacademicClick}
              />
            )}
      </div>
    </div>
  );
};

export default AcademicPrograms;
