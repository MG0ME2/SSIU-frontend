import React from 'react'

import LogOut from "../../components/Logout";
import LayoutQualityLeader from '../../components/LayoutQualityLeader'

const QualityLeaderHome = () => {
  return (
    <LayoutQualityLeader>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <h1 className='text-lg font-semibold'>Program Quality Leader Home</h1>
          <LogOut></LogOut>
        </div>
      </div>
    </LayoutQualityLeader>
  )
}

export default QualityLeaderHome 