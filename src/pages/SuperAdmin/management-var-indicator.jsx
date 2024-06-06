import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import VariableIndicatorTable from '../../components/LayoutSuperAdmin/variableIndicatorTable';
import QuestionTable from '../../components/LayoutSuperAdmin/questionTable';

const SuperAdminManagementVarAndIndica = () => {
  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <VariableIndicatorTable />
        <div className="mt-8">
          <QuestionTable />
        </div>
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperAdminManagementVarAndIndica;
