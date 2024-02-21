import { type FetchArgs, createApi } from '@reduxjs/toolkit/query/react';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '../helpers/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['USER_DATA'],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: apiRoute('/auth/me'),
        method: 'GET'
      }),
      providesTags: ['USER_DATA']
    })
  })
});

export const {
  middleware: userApiMiddleware,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery
} = userApi;

export const resetUserApi = userApi.util.resetApiState;
