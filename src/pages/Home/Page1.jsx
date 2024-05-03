//import React, { useState } from 'react';
import LayoutH from '../../components/LayoutHome'
import SuccessAlert from '../../components/Alerts/success';
import WarnignAlert from '../../components/Alerts/warning';
import ErrorAlert from '../../components/Alerts/error';
import InfoAlert from '../../components/Alerts/info';

function PageUno() {

  return (
    <LayoutH>
      
      <div className="flex-grow flex items-center justify-center w-52 p-2">        
        <p className='text-justify'>En caso de que la transacción no te pertenezca agradecemos comunicarte con nuestra línea de atención en Bogotá (601)
         4232230 o 018000945151 a nivel nacional, con el fin de brindarte una asesoría inmediata y oportuna de los movimientos
          realizados con tus productos.
         </p>
      </div>
    </LayoutH>
  )

}

export default PageUno;
