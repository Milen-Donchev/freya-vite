import { createApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import type {
  Discussion,
  Comment,
  Reaction,
  CreateCommentBody,
  GetCommentsData,
  CommentLink,
  Attachment
} from '@types';

import { apiRoute } from '@utils/api-route';
import { QueryParams } from '@models/QueryParams';
import { ParticipantStatus } from '@models/Discussion';
import { baseQueryWithReauth } from '@store/helpers/baseQueryWithReauth';

export const discussionApi = createApi({
  reducerPath: 'discussionApi',
  baseQuery: (args: FetchArgs | string, api, extraOptions) =>
    baseQueryWithReauth(args, api, { ...extraOptions }),
  tagTypes: ['DISCUSSION', 'COMMENTS', 'SUBCOMMENTS'],
  endpoints: (builder) => ({
    getDiscussions: builder.query({
      query: ({ page, title }) => {
        const params: { page?: string; search?: string } = {};

        if (page >= 1) {
          params.page = page.toString();
        }

        if (title !== '') {
          params.search = title;
        }

        return apiRoute('/discussions', params);
      }
    }),
    getDiscussion: builder.query<Discussion, any>({
      query: (id: string) => apiRoute(`/discussions/${id}`),
      transformResponse: (result: { data: Discussion }) => result.data,
      providesTags: ['DISCUSSION']
    }),
    getComments: builder.query<GetCommentsData, any>({
      query: ({ id, cursor, order_by }: { id: string; cursor?: string; order_by?: string }) => {
        const queryParams = new URLSearchParams();
        cursor && queryParams.append(QueryParams.COMMENT_CURSOR, cursor);
        return apiRoute(`/comments/discussion/${id}/${order_by ?? ''}?${queryParams.toString()}`);
      },
      providesTags: ['COMMENTS']
    }),
    getChildrenComments: builder.query<GetCommentsData, any>({
      query: ({ id, cursor }: { id: string; cursor?: string }) => {
        const queryParams = new URLSearchParams();
        cursor && queryParams.append(QueryParams.COMMENT_CURSOR, cursor);
        return apiRoute(`/comments/${id}/children?${queryParams.toString()}`);
      }
    }),
    getSpecificComment: builder.query({
      query: ({ id }: { id: string }) => apiRoute(`/comments/${id}`)
    }),
    createComment: builder.mutation<Comment, any>({
      query: ({
        comment,
        is_anonymous,
        commentableId,
        parentId = null,
        pinOrderId = null,
        links = [],
        attachments
      }: CreateCommentBody) => ({
        url: apiRoute('/comments'),
        method: 'POST',
        body: {
          text: comment,
          is_anonymous,
          parent_id: parentId,
          commentable_type: 'discussion',
          commentable_id: commentableId,
          pin_order_id: pinOrderId ?? 0,
          links,
          attachments
        }
      }),
      transformResponse: (result: { data: Comment }) => result.data
    }),
    togglePinComment: builder.mutation({
      query: (commentId: number) => ({
        url: apiRoute(`/comments/${commentId}/pin`),
        method: 'PUT'
      })
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: apiRoute(`/comments/${commentId}`),
        method: 'DELETE'
      })
    }),
    reactToComment: builder.mutation({
      query: ({
        commentId,
        reactionType
      }: {
        commentId: number;
        reactionType: Reaction['type'];
      }) => ({
        url: apiRoute(`comments/${commentId}/react`),
        method: 'PUT',
        body: {
          type: reactionType
        }
      })
    }),
    editComment: builder.mutation({
      query: ({
        commentId,
        newCommentText,
        isAnonymous,
        links = [],
        attachments
      }: {
        commentId: number;
        newCommentText: string;
        isAnonymous: boolean;
        links?: CommentLink[];
        attachments?: Partial<Attachment>[];
      }) => ({
        url: apiRoute(`comments/${commentId}`),
        method: 'PUT',
        body: {
          text: newCommentText,
          is_anonymous: isAnonymous,
          links,
          attachments
        }
      })
    }),
    getParticipants: builder.query({
      query: ({ id, params }: { id: string; params?: { page?: string; search?: string } }) =>
        apiRoute(`participants/discussion/${id}`, params)
    }),
    joinDiscussion: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['DISCUSSION']),
      query: ({ entity_id }: { entity_id: number }) => ({
        url: apiRoute(`/participants/discussion/${entity_id}`),
        method: 'POST',
        body: {}
      })
    }),
    changeDiscussionStatus: builder.mutation({
      invalidatesTags: (_, error) => (error ? [] : ['DISCUSSION']),
      query: ({ profile_id, status }: { profile_id: number; status: ParticipantStatus }) => ({
        url: apiRoute(`/participants/${profile_id}`),
        method: 'PUT',
        body: {
          status
        }
      })
    })
  })
});

export const invalidateDiscussion = () => discussionApi.util.invalidateTags(['DISCUSSION']);
export const resetDiscussionApi = discussionApi.util.resetApiState;

export const {
  middleware: discussionApiMiddleware,
  useGetDiscussionsQuery: useGetDiscussions,
  useGetDiscussionQuery: useGetDiscussion,
  useLazyGetSpecificCommentQuery,
  useLazyGetChildrenCommentsQuery,
  useLazyGetCommentsQuery,
  useLazyGetDiscussionQuery,
  useLazyGetDiscussionsQuery,
  useCreateCommentMutation,
  useTogglePinCommentMutation,
  useDeleteCommentMutation,
  useReactToCommentMutation,
  useEditCommentMutation,
  useGetParticipantsQuery,
  useJoinDiscussionMutation,
  useChangeDiscussionStatusMutation
} = discussionApi;
