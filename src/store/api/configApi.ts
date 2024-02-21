import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Locale } from '@models/Locale';
import type { Dictionary } from '@freya/types/dictionary';

import { configGet } from '@freya/config';
import { apiRoute } from '@utils/api-route';

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const locale = Cookies.get('locale') ?? configGet('fallbackLocale');
      if (locale) {
        headers.set('Accept-Language', locale);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getLocales: builder.query<Locale[], string>({
      query: () => apiRoute('/languages'),
      transformResponse: ({ data }: { data: Locale[] }) => ({
        ...data
      })
    }),
    getDictionary: builder.query<Dictionary, string>({
      query: () => apiRoute('/dictionary')
    })
  })
});

export const {
  middleware: configApiMiddleware,
  useLazyGetLocalesQuery,
  useGetDictionaryQuery
} = configApi;
