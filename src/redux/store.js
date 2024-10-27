import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice';
import filtersReducer from './filtersSlice';
import favoriteVehiclesReducer from './favoriteVehiclesSlice';
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

const persistedVehiclesReducer = persistReducer(vehiclesPersistConfig, vehiclesReducer);
const persistedFavoriteVehiclesReducer = persistReducer(favoriteVehiclesPersistConfig, favoriteVehiclesReducer);
const persistedFiltersReducer = persistReducer(filtersPersistConfig, filtersReducer);


const store = configureStore({
  reducer: {
    vehicles: persistedVehiclesReducer,
    favoriteVehicles: persistedFavoriteVehiclesReducer,
    filters: persistedFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
