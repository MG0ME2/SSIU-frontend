import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/states/authSlice';

const LogOut = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEvent = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <div>
      <button className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded' onClick={logoutEvent}>Cerrar sesion</button>
    </div>
  );
};

export default LogOut;
