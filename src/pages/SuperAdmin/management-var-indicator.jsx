import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import VariableIndicatorTable from '../../components/LayoutSuperAdmin/variableIndicatorTable';

const SuperAdminManagementVarAndIndica = () => {
  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <VariableIndicatorTable />
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperAdminManagementVarAndIndica;
