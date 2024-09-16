// middleware/serializableMiddleware.js
import { isPlainObject } from '@reduxjs/toolkit';

const serializableMiddleware = (store) => (next) => (action) => {
  if (isPlainObject(action.payload)) {
    return next(action);
  } else {
    console.warn('Non-serializable value detected:', action.payload);
  }
  return next(action);
};

export default serializableMiddleware;
