import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const photoPersistConfig = {
  key: 'photo',
  storage: storage,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState: {
    photoUrl: '',
  },
  reducers: {
    setPhotoUrl: (state, action) => {
      state.photoUrl = action.payload;
    },
  },
});

const persistedPhotoReducer = persistReducer(photoPersistConfig, photoSlice.reducer);

export const { setPhotoUrl } = photoSlice.actions;
export default persistedPhotoReducer;