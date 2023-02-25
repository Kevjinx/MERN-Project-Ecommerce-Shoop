import { configureStore } from '@reduxjs/toolkit';

const preloadedState = {};

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  preloadedState,
  middleware: [],
  devTools: true,
});

export default store;
