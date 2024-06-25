import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hoveredStage: null,
};

const hoveredStageSlice  = createSlice({
  name: 'stageH',
  initialState,
  reducers: {
    setHoveredStage: (state, action) => {
      state.hoveredStage = action.payload;
    },
    clearHoveredStage: (state) => {
      state.hoveredStage = null;
    },
  },
});

export const { setHoveredStage, clearHoveredStage } = hoveredStageSlice .actions;

export default hoveredStageSlice.reducer;
