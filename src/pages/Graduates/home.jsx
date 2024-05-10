import React from 'react'

import LogOut from "../../components/Logout";
import LayoutGraduates from '../../components/LayoutGraduates'


const GraduatesHome = () => {
  return (
    <LayoutGraduates>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>Graduates Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutGraduates>
  )
}

export default GraduatesHome