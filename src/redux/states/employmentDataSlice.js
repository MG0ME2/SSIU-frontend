import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmploymentDataByUser = createAsyncThunk(
  'employmentData/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employment-data/by/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmploymentData = createAsyncThunk(
  'employmentData/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/employment-data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const employmentDataSlice = createSlice({
  name: 'employmentData',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmploymentDataByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmploymentDataByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEmploymentDataByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmploymentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmploymentData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateEmploymentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employmentDataSlice.reducer;
