import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  variables: [],
  indicators: [],
  questions: [],
  status: 'idle',
  error: null,
};

/**
 * Esta función crea una acción asincrónica (thunk) llamada fetchVariables.
 Esta acción se utiliza para realizar una solicitud GET a la API para obtener variables.
 El primer argumento es un nombre único para la acción ('variableIndicator/fetchVariables').
 El segundo argumento es una función asincrónica que realiza la solicitud a la API y devuelve los datos obtenidos.
 */
export const fetchVariables = createAsyncThunk('variableIndicator/fetchVariables', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/status`); // Ajusta la URL según tu API
  return response.data;
});

export const fetchIndicators = createAsyncThunk('variableIndicator/fetchIndicators', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/status`); // Ajusta la URL según tu API
  return response.data;
});

const variableIndicatorSlice = createSlice({
  name: 'variableIndicator',
  initialState,
  reducers: {
    addVariable: (state, action) => {
      state.variables.push(action.payload);
    },
    addIndicator: (state, action) => {
      state.indicators.push(action.payload);
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariables.fulfilled, (state, action) => {
        state.variables = action.payload;
      })
      .addCase(fetchIndicators.fulfilled, (state, action) => {
        state.indicators = action.payload;
      });
  },
});

export const { addVariable, addIndicator, addQuestion } = variableIndicatorSlice.actions;
export default variableIndicatorSlice.reducer;