import { createSlice } from '@reduxjs/toolkit';

// A function to generate a reusable slice for any list
const createListSlice = (name) => {
  return createSlice({
    name,
    initialState: [],
    reducers: {
      setItems: (state, action) => {
        return action.payload;
      },
      clearItems: (state) => {
        return [];
      },
      addItem: (state, action) => {
        state.push(action.payload);
      },
      removeItem: (state, action) => {
        return state.filter(item => item.id !== action.payload.id);
      },
    },
  });
};

// Export function to create slices for specific lists
export const createVehiclesSlice = createListSlice('vehiclesList');
export const createFavoriteVehiclesSlice = createListSlice('favoriteVehicles');

export const { setItems: setVehiclesList, clearItems: clearVehiclesList, addItem: addVehicle, removeItem: removeVehicle } = createVehiclesSlice.actions;
export const { setItems: setFavoriteVehicles, clearItems: clearFavoriteVehicles, addItem: addToFavorite, removeItem: removeFromFavorite } = createFavoriteVehiclesSlice.actions;

export default {
  vehiclesReducer: createVehiclesSlice.reducer,
  favoriteVehiclesReducer: createFavoriteVehiclesSlice.reducer,
};
