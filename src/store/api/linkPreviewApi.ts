import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

export const linkPreviewApi = createApi({
  reducerPath: 'linkPreviewApi',
  baseQuery: (args: FetchArgs | string, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  endpoints: (builder) => ({
    scrape: builder.mutation({
      query: ({ url }) => ({
        url: apiRoute('/scrape'),
        method: 'POST',
        body: {
          url
        }
      })
    })
  })
});

export const { middleware: linkPreviewApiMiddleware, useScrapeMutation }: any = linkPreviewApi;
