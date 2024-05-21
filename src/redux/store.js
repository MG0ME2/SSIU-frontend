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
import { authReducer } from './states/authSlice';

//import { reducer } from './states/reducer';
//const middleware = [...getDefaultMiddleware(), thunk];
const authPersistConfig = {
  key: 'auth',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // Añade aquí otros reducers si los tienes
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
