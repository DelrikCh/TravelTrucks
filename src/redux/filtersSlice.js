// src/redux/filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    equipment: new Set(),
    type: new Set(),
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    addEquipment: (state, action) => {
      state.equipment.add(action.payload);
    },
    removeEquipment: (state, action) => {
      state.equipment.delete(action.payload);
    },
    addType: (state, action) => {
      state.type.add(action.payload);
    },
    removeType: (state, action) => {
      state.type.delete(action.payload);
    },
  },
});

// Exporting actions with specific names
export const { 
  setLocation,
  addEquipment,
  removeEquipment,
  addType,
  removeType,
} = filtersSlice.actions;

export default filtersSlice.reducer;
