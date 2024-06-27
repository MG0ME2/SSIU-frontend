import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import axios from 'axios';


// Put 
export const fetchStageDatesPut = createAsyncThunk(
  'stagePut/fetchStageDatesPut',
  async ({ stageId, stag }, { rejectWithValue }) => {
    try {
      //Mapea los datos que se requieren para crear las fechas
      const DataAditional = stag.map(stage => ({
        ...stage,
        description: `etapa ${stage.id}`,
        type_MDI: `medición de impacto a graudao`,
        status_id: 1,
        academic_program_id: 1,
      }));

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/stage/${stageId}`,
        DataAditional
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get
export const fetchStageDatesGet = createAsyncThunk(
  'stageGet/fetchStageDatesGet',
  async ({ dato }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/stage/academic-program/1`,
        dato
      );
      console.log("slice: ",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Post
export const fetchStageDatesPost = createAsyncThunk(
  'stagePost/fetchStageDatesPost',
  async ({ stag }, { rejectWithValue }) => {
    try {
      //Mapea los datos que se requieren para crear las fechas
      const DataAditional = stag.map((stage, index) => ({
        ...stage,
        description: `etapa ${index + 1}`,
        type_MDI: `medición de impacto a graudao`,
        status_id: 1,
        academic_program_id: 1,
      }));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/stage`,
        DataAditional
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Configuración de persistencia
const stagePersistConfig = {
  key: 'stage',
  storage,
};

// Definir el slice de stage
const stageSlice = createSlice({
  name: 'stage',
  initialState: {
    stages: {}, // Estado inicial vacío para las fechas de las stages
    loading: false, // Estado para controlar el estado de carga
    error: null, // Estado para manejar errores
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStageDatesPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStageDatesPut.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload.stages;
      })
      .addCase(fetchStageDatesGet.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload.stages;
      })
      .addCase(fetchStageDatesPost.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload.stages;
      })
      .addCase(fetchStageDatesPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const persistedStageReducer = persistReducer(stagePersistConfig, stageSlice.reducer);

export default persistedStageReducer;