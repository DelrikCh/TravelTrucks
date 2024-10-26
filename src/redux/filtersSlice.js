import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    location: '',
    equipment: [],
    type: [],
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    addEquipment: (state, action) => {
      if (!state.equipment.includes(action.payload)) {
        state.equipment.push(action.payload);
      }
    },
    removeEquipment: (state, action) => {
      state.equipment = state.equipment.filter((item) => item !== action.payload);
    },
    addType: (state, action) => {
      if (!state.type.includes(action.payload)) {
        state.type.push(action.payload);
      }
    },
    removeType: (state, action) => {
      state.type = state.type.filter((item) => item !== action.payload);
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
