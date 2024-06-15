import React from 'react';
import { useState } from 'react';

import LayoutSuperAdmin from '../../components/LayoutSuperAdmin';
import RequestStage from '../../components/LayoutSuperAdmin/requestStage';

const SuperAdminRequestSatges = () => {
  return (
    <LayoutSuperAdmin>
      <div className="p-4">
        <RequestStage />
      </div>
    </LayoutSuperAdmin>
  );
};

export default SuperAdminRequestSatges;