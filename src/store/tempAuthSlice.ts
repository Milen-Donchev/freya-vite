/* SLICE USED EXPLICITLY DURING REGISTRATION
 ** Holds access token temporarily until the user finishes the registration
 ** and only then it gets transfered into the persisted authSlice
 */

import { createSlice } from '@reduxjs/toolkit';

const tempAuthSlice = createSlice({
  name: 'tempAuthSlice',
  initialState: {
    access_token: null as null | string,
    refresh_token: null as null | string,
    expires_in: null as null | string
  },
  reducers: {
    setTempAccessToken(state, action) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.expires_in = action.payload.expires_in;
    },
    resetTempAuth(state, action) {
      state.access_token = null;
      state.refresh_token = null;
      state.expires_in = null;
    }
  }
});

export const { setTempAccessToken, resetTempAuth } = tempAuthSlice.actions;

export default tempAuthSlice;
