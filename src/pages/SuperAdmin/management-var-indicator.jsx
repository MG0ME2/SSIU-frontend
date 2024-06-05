import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import VariableIndicatorTable from '../../components/LayoutSuperAdmin/variableIndicatorTable';
import QuestionTable from '../../components/LayoutSuperAdmin/questionTable';

const SuperAdminManagementVarAndIndica = () => {
  const [variables, setVariables] = useState([
    { name: 'VARIABLE 1', active: true },
    { name: 'VARIABLE 2', active: false },
    { name: 'VARIABLE 3', active: true },
    { name: 'VARIABLE 4', active: true },
  ]);

  const [indicators, setIndicators] = useState([
    { name: 'INDICADOR 1', active: true },
    { name: 'INDICADOR 2', active: false },
    { name: 'INDICADOR 3', active: true },
    { name: 'INDICADOR 4', active: true },
  ]);

  const [questions, setQuestions] = useState([
    { question: 'Pregunta 1', type: 'Abierta', active: true },
    { question: 'Pregunta 2', type: 'Check', active: false },
  ]);

  const handleAddVariable = () => {
    // Logic for adding a new variable
  };

  const handleAddIndicator = () => {
    // Logic for adding a new indicator
  };

  const handleAddQuestion = () => {
    // Logic for adding a new question
  };

  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <VariableIndicatorTable
          title="Gestión de Variables"
          searchPlaceholder="Buscar Variables"
          items={variables}
          addButtonLabel="Agregar Variable"
          onAddClick={handleAddVariable}
        />
        <VariableIndicatorTable
          title="Gestión de Indicadores"
          searchPlaceholder="Buscar Indicadores"
          items={indicators}
          addButtonLabel="Agregar Indicador"
          onAddClick={handleAddIndicator}
        />
        <QuestionTable
          items={questions}
          addButtonLabel="Agregar Pregunta"
          onAddClick={handleAddQuestion}
        />
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperAdminManagementVarAndIndica;
