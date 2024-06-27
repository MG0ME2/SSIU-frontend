import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';

export const fetchAcademicDataByUser = createAsyncThunk(
  'academicData/fetchByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/academic-data/by/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAcademicData = createAsyncThunk(
  'academicData/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/academic-data/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const academicDataSlice = createSlice({
  name: 'academicData',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicDataByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicDataByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAcademicDataByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAcademicData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcademicData.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateAcademicData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default academicDataSlice.reducer;
