//import React, { useState } from 'react';
import LayoutH from '../../components/LayoutHome'
import ButtonPrimary from '../../components/Buttons/primary'
import IconLogin from "../../assets/Img/IconLogin.svg";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  
  return (
    <LayoutH>
      <div className="flex-grow flex items-center justify-center w-52 p-2">
        <div className="flex flex-col items-center gap-4">
          <ButtonPrimary title={'Iniciar Sesión'} icono={IconLogin} typeB={'button'} to={'/login'}/>
        </div>
        <ToastContainer/>
      </div>
    </LayoutH>
  )
  
}

export default Home;
