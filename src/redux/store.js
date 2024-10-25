// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import listReducer from './vehiclesSlice';

const store = configureStore({
  reducer: {
    vehicles: listReducer.vehiclesReducer,
    favoriteVehicles: listReducer.favoriteVehiclesReducer,
  },
});

export default store;
