import { createSlice } from '@reduxjs/toolkit';

const favoriteVehiclesSlice = createSlice({
  name: 'favoriteVehicles',
  initialState: {
    ids: [],
  },
  reducers: {
    clear: (state) => {
      state.ids = [];
    },
    switchFavorite: (state, action) => {
        if (state.ids.includes(action.payload)) {
            state.ids = state.ids.filter((item) => item !== action.payload);
        } else {
            state.ids.push(action.payload);
        }
    }
  },
});

// Exporting actions with specific names
export const { 
  clear,
  switchFavorite,
} = favoriteVehiclesSlice.actions;

export default favoriteVehiclesSlice.reducer;
