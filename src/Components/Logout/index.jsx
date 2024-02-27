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
      <button onClick={logoutEvent}>Cerrar sesion</button>
    </div>
  );
};

export default LogOut;
