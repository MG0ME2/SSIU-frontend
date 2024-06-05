import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import VariableIndicatorTable from '../../components/LayoutSuperAdmin/variableIndicatorTable';
import QuestionTable from '../../components/LayoutSuperAdmin/questionTable';

const SuperAdminManagementVarAndIndica = () => {

  const [questions, setQuestions] = useState([
    { question: 'Pregunta 1', type: 'Abierta', active: true },
    { question: 'Pregunta 2', type: 'Check', active: false },
  ]);


  const handleAddQuestion = () => {
    // Logic for adding a new question
  };

  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <VariableIndicatorTable/>
       
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
