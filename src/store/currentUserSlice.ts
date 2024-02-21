import { createSlice } from '@reduxjs/toolkit';
import type { Image } from '@types';

interface EntityProps {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  registration_status: 1 | 2;
  registration_status_title: { [key: string]: string };
}

export interface Consent {
  id: number;
  consent: string;
  value: boolean;
}

interface ProfileTypeProps {
  id: number;
  name: { [key: string]: string };
  roles: [];
  permissions: [];
  features?: [];
}

export interface UserProps {
  id: number;
  title: string;
  image: Image;
  is_verified: boolean;
  slug: string;
  is_cookie_consent_fullfield: boolean;
  entity: EntityProps;
  profile_type: ProfileTypeProps;
  consents: Consent[];
}

export interface CurrentUserProps {
  currentUser: UserProps | null;
}

const initialState: CurrentUserProps = {
  currentUser: null
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    resetCurrentUserSlice: () => {
      return initialState;
    }
  }
});

export const { setCurrentUser, resetCurrentUserSlice } = currentUserSlice.actions;
export default currentUserSlice;
