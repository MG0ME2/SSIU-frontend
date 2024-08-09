import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// redux
import {
  fetchIndicators,
  fetchQuestion,
  fetchVariables,
} from '../../redux/states/variableIndicatorSlice';
import {
  setSearchQueryVariable,
  setSearchQueryIndicator,
} from '../../redux/states/searchVariableIndicadorSlice';

// icon
import IconPencil from '../../assets/Img/IconPencil.svg';
import IconAdd from '../../assets/Img/IconAdd.svg';

// component
import ButtonOnclick from '../Buttons/onclick';
import AddVariablePopUp from './add-VariablePopUp';
import AddIndicadorPopUp from './add-IndicadorPopUp';
import AddQuestionPopUp from './add-QuestionPopUp';
import ChangeIndicadorPopUp from './change-IndicadorPopUp';
import ChangeVarPopUp from './change-VarPopUp';
import ChangeQuestPopUp from './change-QuestionPopUp';


const VariableIndicatorTable = () => {
  const dispatch = useDispatch();
  const variables = useSelector((state) => state.variableIndicator.variables);
  const indicators = useSelector((state) => state.variableIndicator.indicators);
  const preguntas = useSelector((state) => state.variableIndicator.questions);
  const token = useSelector((state) => state.auth.token);

  const searchQueryVariables = useSelector(
    (state) => state.searchVI.searchQueryVariable
  );
  const searchQueryIndicators = useSelector(
    (state) => state.searchVI.searchQueryIndicator
  );
//  console.log('prueba', searchQueryIndicators);

  const [showAddVariablePopup, setShowAddVariablePopup] = useState(false);
  const [showChangeVarPopup, setShowChangeVarPopup] = useState(false);

  const [showAddIndicatorPopup, setShowAddIndicatorPopup] = useState(false);
  const [showChangeIndicadorPopUp, setShowChangeIndicadorPopUp] = useState(false);

  const [showAddPreguntaPopup, setShowAddPreguntaPopup] = useState(false);
  const [showChangePreguntaPopup, setShowChangePreguntaPopup] = useState(false);


  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowI, setSelectedRowI] = useState(null);
  const [selectedRowQ, setSelectedRowQ] = useState(null);


  const handleRowClick = async (index) => {
    if (selectedRow !== index) {
    setSelectedRow(index);
    setSelectedRowI(null);
    setSelectedRowQ(null);
   // console.log('Row data V:', variables[index]);
    const rowData = variables[index];

    try {
    const indicatorsResult = await dispatch(
      fetchIndicators(rowData.id)
    ).unwrap();
    const rowData_ID = indicatorsResult[0];
    setSelectedRow(rowData);
    dispatch(fetchQuestion(rowData_ID.id));
  } catch (error) {
    console.error('Error fetching indicators:', error);
  }
} else {
  console.error('Selected row is undefined');
}
  };

  const handleRowClickI = (index) => {
    if (selectedRowI !== index) {
      setSelectedRowI(index);
      setSelectedRowQ(null);
      
      const rowData = indicators[index];
      dispatch(fetchQuestion(rowData.id));
    }
   // setSelectedRowI(index);
   // setSelectedRowQ(0);

    //console.log('Clicked row I:', index);
   // console.log('Row data I:', indicators[index]);

   //const rowDataId = indicators[index];

    //console.log('rowDataId_I: ', rowDataId.id);

    // dispatch(fetchQuestion(rowDataId.id));
  };

  const handleRowClickQ = (index) => {
    if (selectedRowQ !== index) {
      setSelectedRowQ(index);
    }
    // setSelectedRowQ(index);
    //console.log('Clicked row:', index);
    //console.log('Row data Q:', preguntas[index]);
  };

  //variable
  const handleAddVariableClick = () => {
    setShowAddVariablePopup(!showAddVariablePopup);
  };

  const handleChangeVarClick = () => {
    setShowChangeVarPopup(!showChangeVarPopup);
  };

  //indicador
  const handleAddIndicadorClick = () => {
    setShowAddIndicatorPopup(!showAddIndicatorPopup);
  };
    
  const handleChangeIndicadorClick = () => {
    setShowChangeIndicadorPopUp(!showChangeIndicadorPopUp);
  };

//pregunta
  const handleAddPreguntaClick = () => {
    setShowAddPreguntaPopup(!showAddPreguntaPopup);
  };

  const handleChangePreguntaClick = () => {
    setShowChangePreguntaPopup(!showChangePreguntaPopup);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const responseV = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/variable`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       //console.log('data variable: ', responseV.data);
  //       dispatch(fetchVariables());

  //       //console.log('dato inicial: ', selectedRow ? selectedRow : 0);

  //       const rowDataV = responseV.data.sort((a, b) => a.id - b.id);
  //       //console.log('handleRowClick_V: ', rowDataV);

  //       const rowDataIdV = rowDataV[selectedRow ? selectedRow : 0];
  //       //console.log('handleRowClick_V id: ', rowDataIdV.id);

  //       const responseI = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/indicator/by/${rowDataIdV.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       //console.log('data indicator: ', responseI.data);
  //       dispatch(fetchIndicators(rowDataIdV.id));

  //       const rowDataI = responseI.data.sort((a, b) => a.id - b.id);
  //       //console.log('handleRowClick_V: ', rowDataI);

  //       const rowDataIdI = rowDataI[selectedRowI ? selectedRowI : 0];
  //       //console.log('handleRowClick_V id: ', rowDataIdI.id);

  //       const responseQ = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/question/by/${rowDataIdI.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       //console.log('data question: ', responseQ.data);

  //       dispatch(fetchQuestion(rowDataIdI.id));
  //     } catch (error) {
  //       console.error('Error fetching Variables:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);


  useEffect(() => {
    dispatch(fetchVariables());
    dispatch(fetchIndicators());
    dispatch(fetchQuestion());
}, [dispatch]);

  // console.log('prueba, antes', searchQueryIndicators);

  const filteredVariables = variables.filter((variable) =>
    variable.name?.toLowerCase().includes(searchQueryVariables.toLowerCase())
  );

  const filteredIndicators = indicators.filter((indicator) =>
    indicator.name?.toLowerCase().includes(searchQueryIndicators.toLowerCase())
  );

  // console.log('prueba, antes', searchQueryIndicators);

  return (
    <div id={'contenedor'}>
      <div id={'variables_indicadores'} className="mb-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
          Gestión de variables e indicadores
        </h2>
        {/* VARIABLES */}
        <div className="flex">
          <div id={'slice_1'} className="w-1/2 mr-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar variables"
                className="border p-2 rounded w-full"
                value={searchQueryVariables}
                onChange={(e) =>
                  dispatch(setSearchQueryVariable(e.target.value))
                }
              />
            </div>
            <div className="overflow-y-auto h-40 max-h-40 mb-4">
              <table className="table-auto w-full border border-gray-400">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200 ">
                      Nombre
                    </th>
                    <th className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200 ">
                      Estado
                    </th>
                    <th className="border border-gray-400 px-1 py-1 sticky top-0 bg-gray-200 ">
                      Gestión
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVariables.map((variable, index) => (
                    <tr
                      key={index}
                      id={index}
                      onClick={() => handleRowClick(index)}
                      className={`cursor-pointer ${
                        selectedRow === index ? 'bg-blue-200' : ''
                      }`}
                    >
                      <td className="border px-2 py-1">
                        <div className="flex justify-center items-center">
                          {variable.name}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="flex justify-center items-center">
                          <span className="text-green-500">
                            {variable.status.description}
                          </span>
                        </div>
                      </td>
                      <td className="border px-1 py-1 text-center">
                        <div className="flex justify-center items-center">
                          <ButtonOnclick
                            icono={IconPencil}
                            onClick={() => {
                              handleChangeVarClick();
                              setSelectedRow(variable);
                            }}
                          />
                          {showChangeVarPopup && (
                            <ChangeVarPopUp 
                            onClose={handleChangeVarClick}
                            variable={selectedRow}
                             />
                          )}
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
              <AddVariablePopUp onClose={handleAddVariableClick} />
            )}
          </div>

          {/* INDICADOR */}
          <div id={'slice_2'} className="w-1/2">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar indicadores"
                className="border p-2 rounded w-full"
                value={searchQueryIndicators}
                onChange={(e) =>
                  dispatch(setSearchQueryIndicator(e.target.value))
                }
              />
            </div>
            <div className="overflow-y-auto h-40 max-h-40 mb-4">
              <table className="table-auto w-full border border-gray-400">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">
                      Nombre
                    </th>
                    <th className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">
                      Estado
                    </th>
                    <th className="border border-gray-400 px-2 py-1 sticky top-0 bg-gray-200">
                      Gestión
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIndicators.map((indicator, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClickI(index)}
                      className={`cursor-pointer ${
                        selectedRowI === index ? 'bg-blue-200' : ''
                      }`}
                    >
                      <td className="border px-2 py-1">
                        <div className="flex justify-center items-center">
                          {indicator.name}
                        </div>
                      </td>
                      <td className="border px-2 py-1">
                        <div className="flex justify-center items-center">
                          <span className="text-green-500">
                            {indicator.status.description}
                          </span>
                        </div>
                      </td>
                      <td className="border px-1 py-1 text-center">
                        <div className="flex justify-center items-center">
                        <ButtonOnclick
                            icono={IconPencil}
                            //onClick={handleChangeIndicadorClick}
                            //
                            onClick={() => {
                              handleChangeIndicadorClick();
                              setSelectedRowI(indicator);
                            }}
                          />
                          {showChangeIndicadorPopUp && (
                            <ChangeIndicadorPopUp onClose={handleChangeIndicadorClick}
                            //
                            indicador={selectedRowI}
                             />
                          )}
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
              onClick={handleAddIndicadorClick}
            />
            {showAddIndicatorPopup && (
              <AddIndicadorPopUp onClose={handleAddIndicadorClick} />
            )}
          </div>
        </div>
      </div>
      {/* PREGUNTAS */}
      <div id={'preguntas'}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#28537E' }}>
          Gestión de preguntas
        </h2>
        <div className="overflow-y-auto h-48 mb-4 max-h-48">
          <table className="table-auto w-full border border-gray-400">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Pregunta</th>
                <th className="border border-gray-400 px-4 py-2">
                  Tipo de Pregunta
                </th>
                <th className="border border-gray-400 px-4 py-2">Estado</th>
                <th className="border border-gray-400 px-4 py-2">Gestión</th>
              </tr>
            </thead>
            <tbody>
              {preguntas.map((pregunta, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClickQ(index)}
                  className={`cursor-pointer ${
                    selectedRowQ === index ? 'bg-blue-200' : ''
                  }`}
                >
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center">
                      {pregunta.description}
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center">
                      {pregunta.typeQuestion.description}
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center">
                      <span
                        className={
                          pregunta.active ? 'text-green-500' : 'text-red-500'
                        }
                      >
                        {pregunta.status.description}
                      </span>
                    </div>
                  </td>
                  <td className="border px-1 py-1 text-center">
                    <div className="flex justify-center items-center ">
                      <ButtonOnclick
                        icono={IconPencil}
                        //onClick={handleChangePreguntaClick}
                        //
                        onClick={() => {
                          handleChangePreguntaClick();
                          setSelectedRowQ(preguntas[selectedRowQ]);
                        }}
                      />
                          {showChangePreguntaPopup && (
                            <ChangeQuestPopUp onClose={handleChangePreguntaClick} />
                          )}
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
          onClick={handleAddPreguntaClick}
          className="mt-4" 
        />
        {showAddPreguntaPopup && (
          <AddQuestionPopUp onClose={handleAddPreguntaClick} />
        )}
      </div>
    </div>
  );
};

export default VariableIndicatorTable;
