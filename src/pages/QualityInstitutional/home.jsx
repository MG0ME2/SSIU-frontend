import React from 'react'

import LogOut from "../../components/Logout";
import LayoutQualityInstitutional from '../../components/LayoutQualityInstitutional'

const QualityInstitutionalHome = () => {
  return (
    <LayoutQualityInstitutional>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>Institutional Quality Leader Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutQualityInstitutional>
  )
}

export default QualityInstitutionalHome