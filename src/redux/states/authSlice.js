/**
 * Este slice maneja el estado de autenticación de tu aplicación,
 *  incluyendo el usuario, el token y el estado de inicio de sesión.
 * 
 * Exportado el reductor authReducer del slice authSlice, 
 * que luego se utiliza en la configuración del store de Redux.
 */

import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define una acción asincrónica para iniciar sesión
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDniType = createAsyncThunk(
  'dniType/fetchDniType',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dniType`);
    return response.data;
  }
);

export const fetchUsersData = createAsyncThunk(
  'user/fetchUsersData',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
    return response.data;
  }
);



// Define la configuración de persistencia para el slice de autenticación
const authPersistConfig = {
  key: 'auth',
  storage,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    token: null,
    isLoggedIn: false,
    dniType: [],
  },
  reducers: {
    login: (state, action) => {
      //recibe la acción y se almacena el estado
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(fetchDniType.fulfilled, (state, action) => {
        state.dniType = action.payload;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const {  login, logout } = authSlice.actions;
export const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);