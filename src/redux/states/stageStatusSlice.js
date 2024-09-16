import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para las etapas, incluyendo el campo reason
const initialStagesState = {
  1: { id: 1, name: 'Definición de variables y indicadores', completed: false, inProgress: false, active: false, reason: '' },
  2: { id: 2, name: 'Técnicas de recolección de información', completed: false, inProgress: false, active: false, reason: '' },
  3: { id: 3, name: 'Aplicación del instrumento', completed: false, inProgress: false, active: false, reason: '' },
  4: { id: 4, name: 'Resultado de instrumentos aplicados', completed: false, inProgress: false, active: false, reason: '' },
  5: { id: 5, name: 'Análisis de los resultados', completed: false, inProgress: false, active: false, reason: '' },
  6: { id: 6, name: 'Comunicar los resultados', completed: false, inProgress: false, active: false, reason: '' },
};

const stageStatusPersistConfig = {
    key: 'stageStatus',
    storage,
};

const stagesSlice = createSlice({
  name: 'stageStatus',
  initialState: initialStagesState,
  reducers: {
    updateStages: (state, action) => {
      return action.payload; // Reemplaza el estado actual con el nuevo actualizado
    },
    startStage: (state, action) => {
      const stageId = action.payload;
      const stage = state[stageId];
      if (stage) {
        stage.active = true; // Activa la etapa
        stage.inProgress = true; // Marca como en progreso
      } else {
        console.error("Etapa no encontrada");
      }
    }, reactivateStage: (state, action) => {
      const { id, reason } = action.payload;
      const stage = state[id];
      if (stage) {
        stage.completed = false;
        stage.inProgress = false;
        stage.active = id === 1 ? true : false; // Solo la primera etapa se activa
        stage.reason = reason || '';
      } else {
        console.error("Etapa no encontrada", id);
      }
    },
  }
});

// Exportar acciones
export const { updateStages, startStage, reactivateStage } = stagesSlice.actions;

// Acción asíncrona para completar la etapa
export const completeStage = (stageId) => (dispatch, getState) => {
  const state = getState();
  const stageStatus = state.stageStatus;

  // Actualizar el estado de las etapas
  const updatedStages = stageStatus.map(stage => {
    if (stage.id === stageId) {
      return { ...stage, completed: true, active: false, inProgress: false };
    } else if (stage.id === stageId + 1) {
      return { ...stage, active: true, inProgress: false }; // Activa la siguiente etapa
    }
    return stage;
  });

  // Dispatch de la acción que actualiza el estado
  dispatch(updateStages(updatedStages));
};

// Exportar las acciones y el reducer
const persistedStageStatusReducer = persistReducer(
    stageStatusPersistConfig,
    stagesSlice.reducer
);

export default persistedStageStatusReducer;
