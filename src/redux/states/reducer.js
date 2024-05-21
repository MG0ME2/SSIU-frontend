import { ACTUALIZAR_VALOR } from './acciones';
 
const initialState = {
  valorEnRedux: false
};
 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTUALIZAR_VALOR:
      return {
        ...state,
        valorEnRedux: action.payload
      };
    default:
      return state;
  }
};
 
export default reducer;