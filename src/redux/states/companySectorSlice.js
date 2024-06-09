import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanySectors = createAsyncThunk(
  'companySector/fetchCompanySectors',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company-sector`);
    return response.data;
  }
);

const companySectorSlice = createSlice({
  name: 'companySector',
  initialState: {
    sectors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanySectors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanySectors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sectors = action.payload;
      })
      .addCase(fetchCompanySectors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default companySectorSlice.reducer;