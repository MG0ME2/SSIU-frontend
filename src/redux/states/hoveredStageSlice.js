import { createSlice } from '@reduxjs/toolkit';

const hoveredStageSlice = createSlice({
  name: 'hoveredStage',
  initialState: {
    hoveredStage: null,
    error: null,
  },
  reducers: {
    setHoveredStage(state, action) {
      state.hoveredStage = action.payload;
    },
    clearHoveredStage(state) {
      state.hoveredStage = null;
    },
    // Si necesitas manejar errores, asegúrate de no almacenar objetos no serializables
    setError(state, action) {
      state.error = action.payload; // Asegúrate de que payload sea serializable
    },
  },
});

export const { setHoveredStage, clearHoveredStage, setError } = hoveredStageSlice.actions;
export default hoveredStageSlice.reducer;
