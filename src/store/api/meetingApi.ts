/* istanbul ignore file */
import { createApi, type FetchArgs } from '@reduxjs/toolkit/query/react';

import type {
  CreateMeetingProps,
  Meeting,
  UpdateMeetingProps,
  UpdateParticipantInfoProps
} from '@freya/types/meeting';
import type { Meta } from '@freya/types/ui';
import type { Links } from '@freya/types/comments';
import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

interface GetMeetingsData {
  data: Meeting[];
  meta: Meta;
  links: Links;
}

export const meetingApi = createApi({
  reducerPath: 'meetingApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['MEETINGS', 'GET_MEETINGS'],
  endpoints: (builder) => ({
    getMeeting: builder.query({
      query: ({ id }) => ({
        url: apiRoute(`/meetings/${id}`),
        method: 'GET'
      }),
      transformErrorResponse: (response) => response.data as Meeting,
      providesTags: ['MEETINGS']
    }),
    createMeeting: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['MEETINGS', 'GET_MEETINGS']),
      query: (meeting: CreateMeetingProps) => ({
        url: apiRoute(`/meetings`),
        method: 'POST',
        body: meeting
      }),
      transformErrorResponse: (response) => response.data as Meeting
    }),
    updateMeetingParticipantsInfo: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['MEETINGS', 'GET_MEETINGS']),
      query: ({ id, body }: { id: number; body: UpdateParticipantInfoProps }) => ({
        url: apiRoute(`/meeting-participants/${id}`),
        method: 'PATCH',
        body: body
      }),
      transformErrorResponse: (response) => response.data as Meeting
    }),
    updateMeeting: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['MEETINGS', 'GET_MEETINGS']),
      query: ({ id, meeting }: { id: number; meeting: UpdateMeetingProps }) => ({
        url: apiRoute(`/meetings/${id}`),
        method: 'PUT',
        body: meeting
      }),
      transformErrorResponse: (response) => response.data as Meeting
    }),
    getMeetings: builder.query<GetMeetingsData, any>({
      query: ({ page }) => ({
        url: apiRoute(page && page >= 1 ? `meetings?page=${page}` : `meetings`),
        method: 'GET'
      }),
      providesTags: ['GET_MEETINGS']
    }),
    cancelMeeting: builder.mutation({
      query: (id) => ({
        url: apiRoute(`/meetings/${id}/cancel`),
        method: 'PATCH'
      }),
      invalidatesTags: ['GET_MEETINGS']
    }),
    updateParticipants: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['MEETINGS']),
      query: ({ meetingId, participants }: { meetingId: number; participants: string[] }) => ({
        url: apiRoute(`/meetings/${meetingId}`),
        method: 'PATCH',
        body: {
          participants: participants
        }
      }),
      transformErrorResponse: (response) => response.data as Meeting
    })
  })
});

export const {
  middleware: meetingApiMiddleware,
  useGetMeetingQuery,
  useLazyGetMeetingQuery,
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useUpdateMeetingParticipantsInfoMutation,
  useGetMeetingsQuery,
  useCancelMeetingMutation,
  useUpdateParticipantsMutation
} = meetingApi;

export const resetMeetingApi = meetingApi.util.resetApiState;
