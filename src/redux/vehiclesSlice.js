import { createSlice } from '@reduxjs/toolkit';

const vehiclesSlice = createSlice({
  name: 'vehiclesList',
  initialState: [],
  reducers: {
    setItems: (state, action) => action.payload,
    clearItems: () => [],
  },
});

export const { setItems: setVehiclesList, clearItems: clearVehiclesList } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
