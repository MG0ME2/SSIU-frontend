import {useNavigate} from "react-router-dom";

import {useLocalStorage} from '../../components/localStorage'

const LogOut = () => {
  const [getIsLogged, setIsLogged] = useLocalStorage('isLogged');
  let navigate = useNavigate();
  
  const logoutEvent = () => {
    window.localStorage.clear();
    //setIsLogged('false');
    navigate('/');
  };
  
  return (
    <div>
      <button
        className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'
        onClick={logoutEvent}>Cerrar sesion
      </button>
    </div>
  );
};

export default LogOut;
