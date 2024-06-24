import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Definir la acción asincrónica para actualizar las fechas de las etapas
export const updateStageDates = createAsyncThunk(
  'etapa/updateDates',
  async ({ userId, etapas }, { rejectWithValue }) => {
    try {
      // Simular la llamada a la API para guardar las fechas en la base de datos
      // Aquí deberías hacer la llamada real a tu backend para guardar las fechas
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/stages/${userId}`,
        etapas
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Definir el slice de etapa
const stageSlice = createSlice({
  name: 'etapa',
  initialState: {
    etapas: [], // Estado inicial vacío para las fechas de las etapas
    loading: false, // Estado para controlar el estado de carga
    error: null, // Estado para manejar errores
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateStageDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStageDates.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar el estado con las nuevas fechas de las etapas
        state.etapas = action.payload;
      })
      .addCase(updateStageDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stageSlice.reducer;
