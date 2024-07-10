import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import axios
  from 'axios';

// redux
import {
  fetchIndicators,
  fetchQuestion,
  fetchVariables,
} from '../../redux/states/variableIndicatorSlice';

// icon
import IconPencil
  from '../../assets/Img/IconPencil.svg';
import IconAdd
  from '../../assets/Img/IconAdd.svg';

// component
import ButtonIcon
  from '../Buttons/Icon';
import ButtonOnclick
  from '../Buttons/onclick';
import AddVariablePopUp
  from './add-VariablePopUp';
import AddIndicadorPopUp
  from './add-IndicadorPopUp';
import AddQuestionPopUp
  from './add-QuestionPopUp.jsx';

const VariableIndicatorTable = () => {
  const dispatch = useDispatch();
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);
  const preguntas = useSelector((state) => state.variableIndicator.questions);
  const token = useSelector((state) => state.auth.token);
  
  const [showAddVariablePopup, setShowAddVariablePopup] = useState(false);
  const [showAddIndicatorPopup, setShowAddIndicatorPopup] = useState(false);
  const [showAddPreguntaPopup, setShowAddPreguntaPopup] = useState(false);
  
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowI, setSelectedRowI] = useState(0);
  const [selectedRowQ, setSelectedRowQ] = useState(0);
  
  const handleRowClick = async (index) => {
    setSelectedRow(index);
    setSelectedRowI(0);
    setSelectedRowQ(0);
    //console.log('Clicked row V:', index);
    console.log('Row data V:', variables[index]);
    
    const rowDataId = variables[index];
    //console.log('rowDataId_V: ', rowDataId.id);
    const indicatorsResult = await dispatch(fetchIndicators(rowDataId.id)).unwrap();
    
    //console.log('indicators: --> ', indicatorsResult);
     const rowDataId_I = indicatorsResult[0];
     //console.log('rowDataId_I: ', rowDataId_I.id);
     dispatch(fetchQuestion(rowDataId_I.id));
  };
  
  const handleRowClickI = (index) => {
    setSelectedRowI(index);
    setSelectedRowQ(0);
    //console.log('Clicked row I:', index);
    console.log('Row data I:', indicators[index]);
    
    const rowDataId = indicators[index];
    //console.log('rowDataId_I: ', rowDataId.id);
    dispatch(fetchQuestion(rowDataId.id));
  };
  
  const handleRowClickQ = (index) => {
    setSelectedRowQ(index);
    //console.log('Clicked row:', index);
    console.log('Row data Q:', preguntas[index]);
  };
  
  const handleAddVariableClick = () => {
    setShowAddVariablePopup(!showAddVariablePopup);
  };
  
  const handleAddIndicadorClick = () => {
    setShowAddIndicatorPopup(!showAddIndicatorPopup);
  };
  
  const handleAddPreguntaClick = () => {
    setShowAddPreguntaPopup(!showAddPreguntaPopup);
  };
  
  // const handleAddIndicatorSubmit = (newIndicatorData) => {
  //   // Lógica para agregar el nuevo indicador
  //   // Actualiza el estado de indicadores y cierra el popup
  //   setShowAddIndicatorPopup(false);
  //   console.log('Nuevo indicador:', newIndicatorData);
  //   // Aquí podrías tener lógica adicional, como enviar los datos al backend
  // };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseV = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/variable`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        
        //console.log('data variable: ', responseV.data);
        dispatch(fetchVariables());
        
        //console.log('dato inicial: ', selectedRow ? selectedRow : 0);
        
        const rowDataV = responseV.data.sort((a, b) => a.id - b.id);
        //console.log('handleRowClick_V: ', rowDataV);
        
        const rowDataIdV = rowDataV[selectedRow ? selectedRow : 0];
        //console.log('handleRowClick_V id: ', rowDataIdV.id);
        
        const responseI = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/indicator/by/${rowDataIdV.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        //console.log('data indicator: ', responseI.data);
        dispatch(fetchIndicators(rowDataIdV.id));
        
        const rowDataI = responseI.data.sort((a, b) => a.id - b.id);
        //console.log('handleRowClick_V: ', rowDataI);
        
        const rowDataIdI = rowDataI[selectedRowI ? selectedRowI : 0];
        //console.log('handleRowClick_V id: ', rowDataIdI.id);
        
        const responseQ = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/question/by/${rowDataIdI.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
        //console.log('data question: ', responseQ.data);
        
        dispatch(fetchQuestion(rowDataIdI.id));
        
      } catch (error) {
        console.error('Error fetching Variables:', error);
      }
    };
    
    fetchData();
  }, [dispatch]);
  
  return (
    <div
      id={'contenedor'}>
      <div
        id={'variables_indicadores'}
        className="mb-4">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: '#28537E' }}>
          Gestión
          de
          variables
          e
          indicadores
        </h2>
        <div
          className="flex">
          <div
            id={'slice_1'}
            className="w-1/2 mr-4">
            <div
              className="mb-4">
              <input
                type="text"
                placeholder="Buscar variables"
                className="border p-2 rounded w-full"
              />
            </div>
            <div
              className="overflow-y-auto h-40 max-h-40 mb-4">
              <table
                className="table-auto w-full border border-gray-400"
              >
                <thead
                  className="bg-gray-200 text-gray-700">
                <tr>
                  <th
                    className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200 ">Nombre
                  </th>
                  <th
                    className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200 ">Estado
                  </th>
                  <th
                    className="border border-gray-400 px-1 py-1 sticky top-0 bg-gray-200 ">Gestión
                  </th>
                </tr>
                </thead>
                <tbody>
                {variables.map((variable, index) => (
                  <tr
                    key={index}
                    id={index}
                    onClick={() => handleRowClick(index)}
                    className={`cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}>
                    <td
                      className="border px-2 py-1">
                      <div
                        className="flex justify-center items-center">
                        {variable.name}
                      </div>
                    </td>
                    <td
                      className="border px-2 py-1">
                      <div
                        className="flex justify-center items-center">
                        <span
                          className="text-green-500">
                          {variable.status.description}
                        </span>
                      </div>
                    </td>
                    <td
                      className="border px-1 py-1 text-center">
                      <div
                        className="flex justify-center items-center">
                        <ButtonIcon
                          icono={IconPencil} />
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            
            <ButtonOnclick
              title={'Agregar variable'}
              icono={IconAdd}
              onClick={handleAddVariableClick}
            
            />
            {showAddVariablePopup && (
              <AddVariablePopUp
                onClose={handleAddVariableClick}
              />
            )}
          </div>
          
          <div
            id={'slice_2'}
            className="w-1/2">
            <div
              className="mb-4">
              <input
                type="text"
                placeholder="Buscar indicadores"
                className="border p-2 rounded w-full"
              />
            </div>
            <div
              className="overflow-y-auto h-40 max-h-40 mb-4">
              <table
                className="table-auto w-full border border-gray-400">
                <thead
                  className="bg-gray-200 text-gray-700">
                <tr>
                  <th
                    className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">Nombre
                  </th>
                  <th
                    className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">Estado
                  </th>
                  <th
                    className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">Gestión
                  </th>
                </tr>
                </thead>
                <tbody>
                {indicators.map((indicator, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClickI(index)}
                    className={`cursor-pointer ${selectedRowI === index ? 'bg-blue-200' : ''}`}>
                    <td
                      className="border px-2 py-1">
                      <div
                        className="flex justify-center items-center">
                        {indicator.name}
                      </div>
                    </td>
                    <td
                      className="border px-2 py-1">
                      <div
                        className="flex justify-center items-center">
                        <span
                          className="text-green-500">
                          {indicator.status.description}
                        </span>
                      </div>
                    </td>
                    <td
                      className="border px-1 py-1 text-center">
                      <div
                        className="flex justify-center items-center">
                        <ButtonIcon
                          icono={IconPencil} />
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <ButtonOnclick
              title={'Agregar indicador'}
              icono={IconAdd}
              onClick={handleAddIndicadorClick} />
            {showAddIndicatorPopup && (
              <AddIndicadorPopUp
                onClose={handleAddIndicadorClick}
              />
            )}
          
          </div>
        </div>
      </div>
      
      <div
        id={'preguntas'}>
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: '#28537E' }}>
          Gestión
          de
          preguntas
        </h2>
        <div
          className="overflow-y-auto h-48 mb-4 max-h-48">
          <table
            className="table-auto w-full border border-gray-400">
            <thead
              className="bg-gray-200 text-gray-700">
            <tr>
              <th
                className="border border-gray-400 px-4 py-2">Pregunta
              </th>
              <th
                className="border border-gray-400 px-4 py-2">Tipo
                de
                Pregunta
              </th>
              <th
                className="border border-gray-400 px-4 py-2">Estado
              </th>
              <th
                className="border border-gray-400 px-4 py-2">Gestión
              </th>
            </tr>
            </thead>
            <tbody>
            {preguntas.map((pregunta, index) => (
              <tr
                key={index}
                onClick={() => handleRowClickQ(index)}
                className={`cursor-pointer ${selectedRowQ === index ? 'bg-blue-200' : ''}`}>
                <td
                  className="border px-4 py-2">
                  <div
                    className="flex justify-center items-center">{pregunta.description}</div>
                </td>
                <td
                  className="border px-4 py-2">
                  <div
                    className="flex justify-center items-center">{pregunta.typeQuestion.description}</div>
                </td>
                <td
                  className="border px-4 py-2">
                  <div
                    className="flex justify-center items-center">
                    <span
                      className={pregunta.active ? 'text-green-500' : 'text-red-500'}>
                      {pregunta.status.description}
                    </span>
                  </div>
                </td>
                <td
                  className="border px-4 py-2 text-center">
                  <div
                    className="flex justify-center items-center">
                    <ButtonIcon
                      icono={IconPencil} />
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <ButtonOnclick
          title={'Agregar preguntas'}
          icono={IconAdd}
          onClick={handleAddPreguntaClick} />
        {showAddPreguntaPopup && (
          <AddQuestionPopUp
            onClose={handleAddPreguntaClick}
          />
        )}
      
      </div>
    </div>
  );
};

export default VariableIndicatorTable;
