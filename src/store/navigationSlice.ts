import { createSlice } from '@reduxjs/toolkit';
import type { Location } from 'react-router-dom';

type InitialState = {
  originRoute: Location | null;
};

const initialState: InitialState = {
  originRoute: null
};

const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    setOriginRoute(state, action) {
      state.originRoute = action.payload;
    },
    resetOriginRoute(state) {
      state.originRoute = null;
    }
  }
});

export const { setOriginRoute, resetOriginRoute } = navigationSlice.actions;

export default navigationSlice;
