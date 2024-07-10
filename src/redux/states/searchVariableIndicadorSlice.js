import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQueryVariable: '',
  searchQueryIndicator: '',
};

const searchVariableIndicadorSlice = createSlice({
  name: 'searchVI',
  initialState,
  reducers: {
    setSearchQueryVariable(state, action) {
      state.searchQueryVariable = action.payload;
    },
    setSearchQueryIndicator(state, action) {
      state.searchQueryIndicator = action.payload;
    },
    clearSearchQueryVariable(state) {
      state.searchQueryVariable = '';
    },
    clearSearchQueryIndicator(state) {
      state.searchQueryIndicator = '';
    },
  },
});

export const {
  setSearchQueryVariable,
  setSearchQueryIndicator,
  clearSearchQueryVariable,
  clearSearchQueryIndicator
} = searchVariableIndicadorSlice.actions;
export default searchVariableIndicadorSlice.reducer;
