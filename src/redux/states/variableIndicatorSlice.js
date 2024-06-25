/**
 * este slice correponde a los estado del super admin (tablas)
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  variables: [],
  indicators: [],
  questions: [],
  programAcademics: [],
  status: 'idle',
  error: null,
};

//const token = useSelector((state) => state.auth.token);

/**
 * Esta función crea una acción asincrónica (thunk) llamada fetchVariables.
 Esta acción se utiliza para realizar una solicitud GET a la API para obtener variables.
 El primer argumento es un nombre único para la acción ('variableIndicator/fetchVariables').
 El segundo argumento es una función asincrónica que realiza la solicitud a la API y devuelve los datos obtenidos.
 */
export const fetchVariables = createAsyncThunk(  'variable/fetchVariables',  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/variable`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  console.log('fetchVariables: ',response.data);
return response.data.sort((a, b) => a.id - b.id);
});

export const fetchIndicators = createAsyncThunk('indicators/fetchIndicators', async ( parameter, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/indicator/by/${parameter}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  console.log('fetchIndicators: ',response.data);
  
  return response.data.sort((a, b) => a.id - b.id);
});

export const fetchQuestion = createAsyncThunk('question/fetchQuestion', async ( parameter, { getState }) => {
  const token = getState().auth.token;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/question/by/${parameter}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  console.log('fetchQuestion: ',response.data);
  return response.data;
});

export const fetchProgramAcedemic = createAsyncThunk('programAcademic/fetchQuestion', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/academic-program`);
  return response.data;
});

export const reactivateStage = createAsyncThunk('stages/reactivateStage', async (stageId) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/stage/${stageId}`, { active: true });
  return response.data;
});

const variableIndicatorSlice = createSlice({
  name: 'variableIndicator',
  initialState,
  reducers: {
    addVariable: (state, action) => {
      state.variables.push(action.payload);
    },
    addIndicator: (state, action) => {
      state.indicators.push(action.payload);
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    addProgramAcedemic: (state, action) => {
      state.programAcademics.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariables.fulfilled, (state, action) => {
        state.variables = action.payload;
      })
      .addCase(fetchIndicators.fulfilled, (state, action) => {
        state.indicators = action.payload;
      })
      .addCase(fetchQuestion.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(fetchProgramAcedemic.fulfilled, (state, action) => {
        state.programAcademics = action.payload;
      })
      .addCase(reactivateStage.fulfilled, (state, action) => {
        // Actualizar el estado de active en la etapa reactivada
        const { id } = action.payload;
        const index = state.programAcademics.findIndex(stage => stage.id === id);
        if (index !== -1) {
          state.programAcademics[index].active = true;
        }
      });
  },
});

export const { addVariable, addIndicator, addQuestion, addProgramAcedemic } = variableIndicatorSlice.actions;
export default variableIndicatorSlice.reducer;