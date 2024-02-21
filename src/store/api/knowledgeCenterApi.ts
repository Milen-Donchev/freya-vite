import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import type { TArticle, KnowledgeCenterItem, Links, Meta, Topic } from '@types';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

type GetCategoriesResponseData = {
  data: KnowledgeCenterItem[] | KnowledgeCenterItem;
  links: Links;
  meta: Meta;
};

export const knowledgeCenterApi = createApi({
  reducerPath: 'knowledgeCenterApi',
  baseQuery: (args: FetchArgs | string, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponseData, string | undefined>({
      query: (id) => ({
        url: apiRoute(id ? `categories/${id}` : 'categories'),
        method: 'GET'
      })
    }),
    getTopic: builder.query<Topic, string>({
      query: (id) => ({
        url: apiRoute(`topics/${id}`),
        method: 'GET'
      })
    }),
    getArticle: builder.query<TArticle, string>({
      query: (id) => ({
        url: apiRoute(`articles/${id}`),
        method: 'GET'
      })
    })
  })
});

export const {
  middleware: knowledgeCenterApiMiddleware,
  useGetCategoriesQuery: useGetCategories,
  useGetTopicQuery: useGetTopic,
  useGetArticleQuery: useGetArticle
} = knowledgeCenterApi;

export const resetKnowledgeCenterApi = knowledgeCenterApi.util.resetApiState;
