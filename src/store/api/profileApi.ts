import { createApi, type FetchArgs } from '@reduxjs/toolkit/query/react';

import { apiRoute } from '@utils/api-route';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';
import type { ProfileFeature } from '@freya/types/profile';

interface EditProfileProps {
  id: number;
  formData: any;
}

interface GetProfileTypeArgs {
  id: number;
  entity: 'user' | 'page';
}

interface GetProfileTypeResult {
  id: number;
  title: Record<string, string>;
  features?: ProfileFeature[];
}

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: (args: FetchArgs, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['PROFILES'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: ({ id }) => ({
        url: apiRoute(`/profiles/${id}/user`),
        method: 'GET'
      }),
      providesTags: ['PROFILES']
    }),
    getCurrentProfile: builder.query({
      query: ({ id }) => ({
        url: apiRoute(`/profiles/${id}/user/edit`),
        method: 'GET'
      }),
      providesTags: ['PROFILES']
    }),
    getProfileType: builder.query<GetProfileTypeResult, GetProfileTypeArgs>({
      query: ({ id, entity }) => ({
        url: apiRoute(`/profile-types/${id}/${entity}`),
        method: 'GET'
      })
    }),
    getProfileTypes: builder.query({
      query: ({ entity, registration_visibility }) => ({
        url: apiRoute(
          `/profile-types/${entity}${
            registration_visibility ? `?registration_visibility=${registration_visibility}` : ''
          }`
        ),
        method: 'GET'
      }),
      providesTags: ['PROFILES']
    }),
    getAllProfiles: builder.query({
      query: ({ page, profileTypeId }) => {
        return {
          url: apiRoute(
            page && page >= 1
              ? `profiles${profileTypeId ? `/${profileTypeId}?page=` : '?page='}${page}`
              : `profiles${profileTypeId ? `/${profileTypeId}` : ''}`
          ),
          method: 'GET'
        };
      }
    }),
    getProfilesWithSchedules: builder.query({
      query: ({ page }) => ({
        url: apiRoute(
          page && page >= 1
            ? `/profiles/selectable?has_schedule=1&page=${page}`
            : `/profiles/selectable?has_schedule=1`
        ),
        method: 'GET'
      }),
      providesTags: ['PROFILES']
    }),
    getProfileSchedules: builder.query({
      query: ({
        id,
        start_date,
        end_date
      }: {
        id: number;
        start_date: string;
        end_date: string;
      }) => ({
        url: apiRoute(`/profiles/${id}/user/schedule/${start_date}/${end_date}`),
        method: 'GET'
      }),
      providesTags: ['PROFILES']
    }),
    editProfile: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['PROFILES']),
      query: ({ id, formData }: EditProfileProps) => ({
        url: apiRoute(`/profiles/${id}/user`),
        method: 'PUT',
        body: formData
      }),
      transformErrorResponse: (response) => response.data
    }),
    setUserConsents: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['PROFILES']),
      query: ({ id, formData }: EditProfileProps) => ({
        url: apiRoute(`/profiles/${id}/user/consents`),
        method: 'PATCH',
        body: {
          consents: formData
        }
      })
    })
  })
});

export const {
  middleware: profileApiMiddleware,
  useGetProfileQuery,
  useGetCurrentProfileQuery,
  useLazyGetCurrentProfileQuery,
  useGetProfileTypeQuery,
  useLazyGetProfileTypeQuery,
  useGetProfileTypesQuery,
  useGetAllProfilesQuery,
  useLazyGetProfileTypesQuery,
  useEditProfileMutation,
  useSetUserConsentsMutation,
  useGetProfilesWithSchedulesQuery,
  useGetProfileSchedulesQuery
} = profileApi;

export const resetProfileApi = profileApi.util.resetApiState;
