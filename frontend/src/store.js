import { Reducer, configureStore } from '@reduxjs/toolkit';

const preloadedState = {};

const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  preloadedState,
  middleware: [],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
