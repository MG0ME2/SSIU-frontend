import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import AcademicPrograms from '../../components/LayoutSuperAdmin/programAcademic';

const SuperAdminManagementAcademicData = () => {
  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <AcademicPrograms />
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperAdminManagementAcademicData;
