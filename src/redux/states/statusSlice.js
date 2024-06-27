import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



export const fetchStatus = createAsyncThunk(
  'status/fetchStatus',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/status`);
    return response.data;
  }
);

// Define la configuración de persistencia para el slice de autenticación
const statusPersistConfig = {
  key: 'status',
  storage,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    status: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
  },
});

export const persistedStatusReducer = persistReducer(
    statusPersistConfig,
  statusSlice.reducer
);

export default persistedStatusReducer;