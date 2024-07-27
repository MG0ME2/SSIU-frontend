import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';

export const fetchAcademicProgram = createAsyncThunk(
  'academicProgram/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/academic-program`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAcademicProgram = createAsyncThunk(
  'academicProgram/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/academic-program${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAcademicProgram = createAsyncThunk(
  'academicProgram/create',
  async ({ dataAdd }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/academic-program`, 
        dataAdd,
        { headers }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const academicProgramSlice = createSlice({
  name: 'academicProgram',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAcademicProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAcademicProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcademicProgram.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateAcademicProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAcademicProgram.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcademicProgram.fulfilled, (state, action) => {
        state.loading = false;
        // Puedes actualizar el estado con los datos devueltos si es necesario
        state.data.push(action.payload); // Ejemplo: agregar los nuevos datos al estado
      })
      .addCase(createAcademicProgram.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default academicProgramSlice.reducer;
