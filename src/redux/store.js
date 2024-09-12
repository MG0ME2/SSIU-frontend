/**
 * almacena y administra el estado global de la aplicación en Redux
 */
import { configureStore } from '@reduxjs/toolkit';
//import { thunk } from 'redux-thunk';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Slices
import { persistedAuthReducer } from './states/authSlice';
import variableIndicatorReducer from './states/variableIndicatorSlice';
import companySectorReducer from './states/companySectorSlice';
import academicDataReducer from './states/academicDataSlice';
import employmentDataReducer from './states/employmentDataSlice';
import studyTypesReducer from './states/studyTypesSlice';
import persistedPhotoReducer from './states/photoSlice';
import persistedStageReducer from './states/stageSlice'; 
import hoveredStageReducer from './states/hoveredStageSlice';
import persistedStatusReducer from './states/statusSlice';
import searchVariableIndicadorReducer from './states/searchVariableIndicadorSlice';
import academicProgramReducer from './states/academicProgramSlice';
import persistedStageStatusReducer from './states/stageStatusSlice'


const authPersistConfig = {
  key: 'auth',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    variableIndicator: variableIndicatorReducer,
    companySector: companySectorReducer,
    academicData: academicDataReducer,
    employmenData: employmentDataReducer,
    studyTypes: studyTypesReducer,
    photo: persistedPhotoReducer,
    stage: persistedStageReducer,
    hoveredStage: hoveredStageReducer,
    status: persistedStatusReducer,
    searchVI: searchVariableIndicadorReducer,
    academicProgram: academicProgramReducer,
    stageStatus: persistedStageStatusReducer
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);