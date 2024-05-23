import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/states/authSlice';

const ExitSesion = ({title, icono}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutEvent = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <button
    className="flex items-center gap-2 py-2 px-4 text-sm rounded-md bg-transparent border text-white font-semibold border-gray-500 hover:border-white hover:bg-gray-500  hover:text-white active:border-white hover:border-transparent hover:border-2 active:border-2"
    type="submit"
    onClick={ logoutEvent }>
    {title}
    <img src={icono} alt={title} className="w-4 h-4"/>
  </button>
  );
};

export default ExitSesion;
