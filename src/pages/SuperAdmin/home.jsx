import React from 'react'

import LogOut from "../../components/Logout";
import LayoutSuperAdmin from '../../components/LayoutSuperAdmin'

const SuperAdminHome = () => {
  return (
    <LayoutSuperAdmin>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>SuperAdmin Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutSuperAdmin>
  )
}

export default SuperAdminHome