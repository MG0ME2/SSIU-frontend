import {useContext} from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from '../../Context';

const LogOut = () => {    
  let context = useContext(AppContext)
  let navigate = useNavigate();

  const logoutEvent = () => {
    window.localStorage.clear();
    context.setIsLoggedIn(false)
    navigate('/');
  };
  
  return (
    <div>
      <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={logoutEvent}>Cerrar sesion</button>
    </div>
  );
};

export default LogOut;
