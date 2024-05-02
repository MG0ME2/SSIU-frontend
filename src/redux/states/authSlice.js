/***
 * Maneja el estado de autenticación del usuario
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
 //se utilizará para identificar este slice en el store de Redux
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    //manejar el cierre de seción
 //   logout(state) {
 //      state.isAuthenticated = false;
 //      state.user = null;
  //   },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
