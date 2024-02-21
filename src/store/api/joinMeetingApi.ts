import { createApi, type FetchArgs } from '@reduxjs/toolkit/query/react';
import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

export const joinMeetingApi = createApi({
  reducerPath: 'joinMeetingsApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: [],
  endpoints: (builder) => ({
    joinMeeting: builder.mutation({
      query: (id) => ({
        url: apiRoute(`/meeting/${id}/join`),
        method: 'GET'
      }),
      invalidatesTags: []
    })
  })
});

export const { middleware: joinMeetingApiMiddleware, useJoinMeetingMutation } = joinMeetingApi;

export const resetJoinMeetingApi = joinMeetingApi.util.resetApiState;
