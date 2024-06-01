// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: {},
    employ: {},
    dniType: {},
    token: null,
    // Otros campos del usuario
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setEmploy: (state, action) => {
      state.employ = action.payload;
    },
    setDniType: (state, action) => {
      state.dniType = action.payload;
    },
    token: (state, action) => {
      state.token = action.payload;
    },
    // Otras acciones para actualizar el usuario
  },
});

export const { token ,setUsers, setDniType, setEmploy } = userSlice.actions;

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
export const userReducer = userSlice.reducer;
