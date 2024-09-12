import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para las etapas, incluyendo el campo reason
const initialStagesState = [
  { id: 1, name: 'Definición de variables y indicadores', completed: false, active: true, reason: '' },
  { id: 2, name: 'Técnicas de recolección de información', completed: false, active: false, reason: '' },
  { id: 3, name: 'Aplicación del instrumento', completed: false, active: false, reason: '' },
  { id: 4, name: 'Resultado de instrumentos aplicados', completed: false, active: false, reason: '' },
  { id: 5, name: 'Análisis de los resultados', completed: false, active: false, reason: '' },
  { id: 6, name: 'Comunicar los resultados', completed: false, active: false, reason: '' },
];

const stageStatusPersistConfig = {
    key: 'stageStatus',
    storage,
  };

const stagesSlice = createSlice({
  name: 'stageStatus',
  initialState: initialStagesState,
  reducers: {
    completeStage: (state, action) => {
      const stageArray = Array.isArray(state) ? state : Object.values(state);
      const stage = stageArray.find((stage) => stage.id === action.payload);
      if (stage) {
        stage.completed = true;
        stage.active = false;
        const nextStage = stageArray.find((s) => s.id === action.payload + 1);
        if (nextStage) {
          nextStage.active = true;
        }
      }
    },    
    reactivateStage: (state, action) => {
      const stageArray = Array.isArray(state) ? state : Object.values(state);
      const stage = stageArray.find((stage) => stage.id === action.payload.id);
      if (stage) {
        stage.active = true;
        stage.completed = false;
        stage.reason = action.payload.reason || ''; // Guardar el motivo de reactivación
      }
    },
  },
});

// Exportar acciones
export const { completeStage, reactivateStage } = stagesSlice.actions;

// Exportar las acciones y el reducer
const persistedStageStatusReducer = persistReducer(
    stageStatusPersistConfig,
    stagesSlice.reducer
  );

export default persistedStageStatusReducer;
