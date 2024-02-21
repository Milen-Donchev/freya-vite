import isEmpty from 'lodash/isEmpty';
import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import type { Links, Meta, Notification } from '@types';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

interface GetNotificationsResponseData {
  data: Notification[];
  meta: Meta;
  links: Links;
}

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: (args: FetchArgs | string, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['GET_NOTIFICATIONS'],
  endpoints: (builder) => ({
    getNotifications: builder.query<GetNotificationsResponseData, any>({
      query: ({ page }) => ({
        url: apiRoute(page && page >= 1 ? `notifications?page=${page}` : `notifications`),
        method: 'GET'
      }),
      providesTags: ['GET_NOTIFICATIONS']
    }),
    readNotification: builder.mutation({
      query: (notificationId) => ({
        url: apiRoute('notifications/read'),
        method: 'PATCH',
        body: !isEmpty(notificationId)
          ? {
              id: notificationId
            }
          : null
      })
    }),
    seeNotifications: builder.mutation({
      query: () => ({
        url: apiRoute('notifications/see'),
        method: 'PATCH'
      }),
      invalidatesTags: ['GET_NOTIFICATIONS']
    })
  })
});

export const {
  middleware: notificationApiMiddleware,
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useSeeNotificationsMutation
} = notificationApi;

export const resetNotificationApi = notificationApi.util.resetApiState;
