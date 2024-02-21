import React from "react";
import { NavLink } from 'react-router-dom'

const TeacherHome = () => {
  
  return (
      <div>
        <h1>teacher home</h1>
        <ul>
          <li> <NavLink to={'/teacher/page1'}> Page 1 </NavLink> </li>
          <li> <NavLink to={'/teacher/page2'}> Page 2 </NavLink> </li>
        </ul>
      </div>
    )
};

export default TeacherHome;
