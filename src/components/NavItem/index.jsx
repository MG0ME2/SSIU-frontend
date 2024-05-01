import React from "react";
import { useNavigate } from "react-router-dom";

const NavItem = ({to, currentPath, children}) => {
  let navigate = useNavigate();
  const goEvent = () => {
    navigate(to);
  };

  const isActive = currentPath === to;
  const activeStyle = "bg-gray-600 border-l-4 border-l-white px-1";

  return (
    <button
        className={`flex items-center text-xs hover:font-semibold px-2 cursor-pointer w-full hover:bg-gray-500 py-2 rounded-r-md hover:shadow-md ${isActive ? activeStyle : undefined}`}
        onClick={goEvent}
        >
        {children}
    </button>
  );
};

export default NavItem;
