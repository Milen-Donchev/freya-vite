import { createSlice } from '@reduxjs/toolkit';
import { addSeconds } from 'date-fns';

export interface AuthStateProps {
  access_token: string | null;
  refresh_token: string | null;
  expires_in: number;
  expires_in_timestamp: string | null;
  isRegistrationCompleted: boolean;
  originRoute: string | null;
}

const initialState: AuthStateProps = {
  access_token: null,
  refresh_token: null,
  expires_in: 0,
  expires_in_timestamp: null,
  isRegistrationCompleted: false,
  originRoute: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.expires_in = action.payload.expires_in;
      state.expires_in_timestamp = action.payload.expires_in
        ? addSeconds(new Date(), action.payload.expires_in).toUTCString()
        : null;
    },
    resetAuthSlice: () => {
      return initialState;
    },
    setIsRegistrationCompleted: (state, action) => {
      state.isRegistrationCompleted = action.payload;
    }
  }
});

export const { setAuthData, resetAuthSlice, setIsRegistrationCompleted } = authSlice.actions;
export default authSlice;
