// redux/states/cycleConfigSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configured: false, // Estado inicial para saber si el ciclo está configurado
};

const cycleConfigSlice = createSlice({
  name: 'cycleConfig',
  initialState,
  reducers: {
    setCycleConfigured: (state, action) => {
      state.configured = action.payload;
    },
  },
});

// Exportar acciones
export const { setCycleConfigured } = cycleConfigSlice.actions;

// Exportar el reducer
export default cycleConfigSlice.reducer;
