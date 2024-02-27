import React from "react";
import { NavLink } from 'react-router-dom'

import LayoutT from '../../Components/LayoutTeacher'
import LogOut from "../../Components/Logout";

const TeacherHome = () => {
  
  return (
    <LayoutT>
      <div className="flex items-center m-7">
        <div>
        <h1>teacher home</h1>
        <ul>
          <li> <NavLink to={'/teacher/page1'}> Page 1 </NavLink> </li>
          <li> <NavLink to={'/teacher/page2'}> Page 2 </NavLink> </li>
          <li> <LogOut /></li>
        </ul>
        </div>
      </div>
    </LayoutT>
    )
};

export default TeacherHome;
