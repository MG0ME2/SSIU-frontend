export const ACTUALIZAR_VALOR = 'ACTUALIZAR_VALOR';
 
export const actualizarValor = (nuevoValor) => ({

  type: ACTUALIZAR_VALOR,

  payload: nuevoValor

});