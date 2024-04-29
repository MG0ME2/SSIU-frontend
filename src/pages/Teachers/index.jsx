import React from "react";
import { NavLink } from 'react-router-dom'

import LayoutT from '../../components/LayoutTeacher'
import LogOut from "../../components/Logout";

const TeacherHome = () => {
  
  return (
    <LayoutT>
      <div className="flex items-center m-7">
        <div className='flex justify-center items-center gap-8'>
          <div>
            <h1 className='text-lg font-semibold'>Teacher home</h1>
            <ul className="list-none hover:list-disc">
              <li> <NavLink to={'/teacher/page1'}> Page 1 </NavLink> </li>
              <li> <NavLink to={'/teacher/page2'}> Page 2 </NavLink> </li>
            </ul>
          </div>
          <div>
            <LogOut></LogOut>
          </div>
        </div>
      </div>
    </LayoutT>
    )
};

export default TeacherHome;
