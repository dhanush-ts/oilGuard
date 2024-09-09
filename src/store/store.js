import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/SampleSlice'; // Import your slice reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // Add your slices here
  },
});

export default store;