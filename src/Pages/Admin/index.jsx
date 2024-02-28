import React from 'react'

import LogOut from "../../Components/Logout";
import LayoutAdmin from '../../Components/LayoutAdmin'

const AdminHome = () => {
  return (
    <LayoutAdmin>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>Admin Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default AdminHome