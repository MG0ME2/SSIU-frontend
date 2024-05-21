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
   setUser: (state, action) => {
      state.user = action.payload.user;
    },
    token: (state, action) => {
      state.token = action.payload.token;
    },
    setDniType: (state, action) => { // Reducer para establecer el tipo de documento
      state.dniType = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.dniType = null; // Limpiar el tipo de documento al cerrar sesión
    },
  },
});

export const { setUser, token, login, setDniType, logout } = authSlice.actions;

// Acción asincrónica para cargar tipos de documento
export const loadDniTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dni-types`);
    if (response.data.length > 1) {
      dispatch(setDniType(response.data[0]));
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

export const authReducer = authSlice.reducer;