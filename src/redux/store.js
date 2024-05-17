/**
 * almacena y administra el estado global de la aplicación en Redux
 */

import {configureStore} from '@reduxjs/toolkit';
import authReducer from './states/authSlice';
import formReducer from './states/loginFormSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
  },
});