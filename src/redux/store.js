// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import listReducer from './vehiclesSlice';
import filtersReducer from './filtersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const vehiclesPersistConfig = {
  key: 'vehicles',
  storage,
};

const favoriteVehiclesPersistConfig = {
  key: 'favoriteVehicles',
  storage,
};

const filtersPersistConfig = {
  key: 'filters',
  storage,
};

const persistedVehiclesReducer = persistReducer(vehiclesPersistConfig, listReducer.vehiclesReducer);
const persistedFavoriteVehiclesReducer = persistReducer(favoriteVehiclesPersistConfig, listReducer.favoriteVehiclesReducer);
const persistedFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);


const store = configureStore({
  reducer: {
    vehicles: persistedVehiclesReducer,
    favoriteVehicles: persistedFavoriteVehiclesReducer,
    filters: persistedFiltersReducer,
  },
});

export const persistor = persistStore(store);
export default store;
