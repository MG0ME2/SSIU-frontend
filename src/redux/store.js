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
//import { userSlice } from './states/userSlice';
import variableIndicatorReducer from './states/variableIndicatorSlice';


const authPersistConfig = {
  key: 'auth',
  storage,
};


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    variableIndicator: variableIndicatorReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //  redu: reducer,
  //  form: formReducer,
  //  middleware,
});

export const persistor = persistStore(store);

// import { createStore } from 'redux';
// import reducer from './states/reducer';
// const store = createStore(reducer);
// export default store;
