/* istanbul ignore file */
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { isFuture } from 'date-fns';
import Cookies from 'js-cookie';

import type { RootState } from '@store/store';

import { apiRoute } from '@utils/api-route';
import { setAuthData, resetAuthSlice } from '@store/authSlice';
import { resetCurrentUserSlice } from '@store/currentUserSlice';
import { configGet } from '@freya/config';

const mutex = new Mutex();

const prepareQueryHeaders = async (headers: any, { getState }: any) => {
  const access_token = (getState() as RootState).authSlice.access_token;
  const temp_access_token = (getState() as RootState).tempAuthSlice.access_token;
  const locale = Cookies.get('locale') ?? configGet('fallbackLocale');

  if (access_token || (!access_token && temp_access_token)) {
    headers.set('Authorization', `Bearer ${access_token ?? temp_access_token}`);
  }
  if (locale) {
    headers.set('Accept-Language', locale);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  prepareHeaders: prepareQueryHeaders
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const apiState = api.getState() as RootState;
  const accessToken = apiState?.authSlice?.access_token;
  const accessTokenExpireTimestamp = apiState?.authSlice?.expires_in_timestamp;
  const isTokenValid = accessTokenExpireTimestamp && isFuture(new Date(accessTokenExpireTimestamp));

  if (isTokenValid) return await baseQuery(args, api, extraOptions);

  // acquire the mutex to ensure only one request is being made at a time
  const release = await mutex.acquire();

  try {
    // execute the query
    let result = await baseQuery(args, api, extraOptions);

    // check if the response indicates the access token has expired
    if (!!accessToken && result.error && result.error.status === 401) {
      // refresh the access token
      const response = await fetch(apiRoute(`/auth/refresh`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: apiState.authSlice.refresh_token
        })
      });

      if (response.ok) {
        const res = await response.json();
        const { access_token, refresh_token, expires_in } = res;

        // update the auth state with the new access token
        api.dispatch(setAuthData({ access_token, refresh_token, expires_in }));

        // retry the original query with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // if the refresh token has also expired, sign the user out
        api.dispatch(resetAuthSlice());
        api.dispatch(resetCurrentUserSlice());
      }
    }

    return result;
  } finally {
    // release the mutex to allow other requests to proceed
    release();
  }
};
