import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudyTypes = createAsyncThunk(
  'studyTypes/fetchStudyTypes',
  async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/study-types`);
      return response.data;
  }
);

const studyTypesSlice = createSlice({
  name: 'studyTypes',
  initialState: {
    studys: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudyTypes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudyTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studys = action.payload;
      })
      .addCase(fetchStudyTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default studyTypesSlice.reducer;
