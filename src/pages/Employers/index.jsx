import React from 'react'

import LogOut from "../../components/Logout";
import LayoutEmployer from '../../components/LayoutEmployers'
const EmployersHome = () => {
  return (
    <LayoutEmployer>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>Employer Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutEmployer>
  )
}

export default EmployersHome