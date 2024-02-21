import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { configGet } from '@freya/config';

export const cloudUploadApi = createApi({
  reducerPath: 'cloudUploadApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const locale = Cookies.get('locale') ?? configGet('fallbackLocale');
      if (locale) {
        headers.set('Accept-Language', locale);
      }
      headers.set('accept', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: ({ file, url }: { file: File; url: string }) => ({
        url: url,
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })
    }),
    delete: builder.mutation({
      query: ({ deleteUrl }: { deleteUrl: string }) => ({
        url: deleteUrl,
        method: 'DELETE'
      })
    })
  })
});

export const {
  middleware: cloudUploadApiMiddleware,
  useUploadMutation,
  useDeleteMutation
} = cloudUploadApi;
