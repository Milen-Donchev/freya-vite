import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { configGet } from '@freya/config';

import { apiRoute } from '@utils/api-route';

interface LoginProps {
  identity: string;
  password: string;
}

interface ForgottenPasswordProps {
  identity: string;
}

interface ResetPasswordProps {
  identity: string;
  code: string;
  password: string;
  password_confirmation: string;
}

interface RegisterProps {
  identity: string;
  password: string;
  password_confirmation: string;
}
export const authApi = createApi({
  reducerPath: 'authApi',
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
    login: builder.mutation({
      query: (loginData: LoginProps) => ({
        url: apiRoute('/auth/login'),
        method: 'POST',
        body: loginData
      }),
      transformErrorResponse: (response) => response.data
    }),
    register: builder.mutation({
      query: (registerData: RegisterProps) => ({
        url: apiRoute('/auth/register'),
        method: 'POST',
        body: registerData
      }),
      transformErrorResponse: (response) => response.data
    }),
    forgottenPassword: builder.mutation({
      query: (forgottenPasswordData: ForgottenPasswordProps) => ({
        url: apiRoute('/forgotten-password'),
        method: 'POST',
        body: forgottenPasswordData
      }),
      transformErrorResponse: (response) => response.data
    }),
    resetPassword: builder.mutation({
      query: (resetPasswordData: ResetPasswordProps) => ({
        url: apiRoute('/reset-password'),
        method: 'POST',
        body: resetPasswordData
      }),
      transformErrorResponse: (response) => response.data
    })
  })
});

export const {
  middleware: loginApiMiddleware,
  useLoginMutation,
  useForgottenPasswordMutation,
  useResetPasswordMutation,
  useRegisterMutation
} = authApi;
