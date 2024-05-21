/**
 * Este slice maneja el estado de autenticación de tu aplicación,
 *  incluyendo el usuario, el token y el estado de inicio de sesión.
 * 
 * Exportado el reductor authReducer del slice authSlice, 
 * que luego se utiliza en la configuración del store de Redux.
 */

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    dniType: {},
  },
  reducers: {
    login: (state, action) => {
      //recibe la acción y se almacena el estado
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {  login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;