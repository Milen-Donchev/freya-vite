import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { configGet } from '@freya/config';
import { normalizePath } from '@utils/helpers';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

export const fileUploadApi = createApi({
  reducerPath: 'fileUploadApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  endpoints: (builder) => ({
    createUrl: builder.mutation({
      query: ({ file, prefix }: { file: File; prefix: string }) => ({
        url: normalizePath(configGet('uploadUrl') + '/upload/create-url'),
        method: 'POST',
        body: {
          key: normalizePath(`${prefix}/${file.name}`)
        }
      })
    }),
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
  middleware: fileUploadApiMiddleware,
  useUploadMutation,
  useCreateUrlMutation,
  useDeleteMutation
} = fileUploadApi;
