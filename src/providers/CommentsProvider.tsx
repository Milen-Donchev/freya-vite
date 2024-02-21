import cloneDeep from 'lodash/cloneDeep';
import findLastIndex from 'lodash/findLastIndex';
import { useParams } from 'react-router-dom';
import cloneDeepWith from 'lodash/cloneDeepWith';
import sortBy from 'lodash/sortBy';
import find from 'lodash/find';
import React, { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

import type { Comment, CommentLink, FilterOption, Reaction, Attachment } from '@types';

import { findValueDeep, insertIntoPosition } from '@utils/arrayHelpers';
import { useQueryParams } from '@hooks/useQueryParams';

import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useLazyGetChildrenCommentsQuery,
  useLazyGetCommentsQuery,
  useReactToCommentMutation,
  useTogglePinCommentMutation
} from '@store/api/discussionApi';
import { useGetCurrentUserQuery } from '@store/api/userApi';
import { useLazyGetSpecificCommentQuery } from '@store/api/discussionApi';

type CommentCursors = { nextCursor: string | null; prevCursor: string | null };

type CommentContext = {
  comments: Comment[] | undefined;
  mainCommentCursors: CommentCursors;
  isLoading: boolean;
  isLoadingChildren: boolean;
  isLoadingEditComment: boolean;
  isLoadingSpecific: boolean;
  childrenRequestArgs: { id: number; url?: string } | null;
  editRequestArgs: { commentId: number; newCommentText: string; isAnonymous: boolean } | undefined;
  filterOptions: FilterOption[] | undefined;
  anchorCommentId: string | null;
  loadMoreComments: (parentId?: number, direction?: 'next' | 'prev') => void;
  clearAnchorCommentId: () => void;
  loadChildren: (parentId: number) => void;
  deleteComment: (commentId: number, parentCommentId?: number | null) => void;
  createComment: (
    comment: string,
    isAnonymous: boolean,
    parentId: number | null,
    pinOrderId: number | null,
    links?: CommentLink[],
    attachments?: Partial<Attachment>[]
  ) => void;
  reactToComment: (commentId: number, reactionType: Reaction['type']) => void;
  pinComment: (commentId: number) => void;
  editComment: (
    commentId: number,
    newCommentText: string,
    isAnonymous: boolean,
    links?: CommentLink[],
    attachments?: Attachment[]
  ) => void;
  orderComment: (order_by: string) => void;
};

/* istanbul ignore next */
const CommentsContext = createContext<CommentContext>({
  comments: [],
  mainCommentCursors: { nextCursor: null, prevCursor: null },
  isLoading: true,
  isLoadingChildren: true,
  isLoadingEditComment: false,
  isLoadingSpecific: true,
  childrenRequestArgs: null,
  editRequestArgs: undefined,
  filterOptions: [],
  anchorCommentId: null,
  loadMoreComments: () => {},
  clearAnchorCommentId: () => {},
  loadChildren: () => {},
  deleteComment: () => {},
  createComment: () => {},
  reactToComment: () => {},
  pinComment: () => {},
  editComment: () => {},
  orderComment: () => {}
});

const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();

  const { data: user } = useGetCurrentUserQuery('');
  const [getChildren, { isFetching: isFetchingChildren, originalArgs: childrenRequestArgs }] =
    useLazyGetChildrenCommentsQuery();
  const [
    getSpecificComment,
    { isFetching: isFetchingSpecificComment, isLoading: isLoadingSpecificComment }
  ] = useLazyGetSpecificCommentQuery();
  const [getComments, { isFetching, isLoading }] = useLazyGetCommentsQuery();
  const [deleteCommentTrigger] = useDeleteCommentMutation();
  const [createCommentTrigger] = useCreateCommentMutation();
  const [reactToCommentTrigger] = useReactToCommentMutation();
  const [togglePin] = useTogglePinCommentMutation();
  const [editCommentTrigger, { isLoading: isLoadingEditComment, originalArgs: editRequestArgs }] =
    useEditCommentMutation();

  const [comments, setComments] = useState<{
    data: Comment[];
    cursors: CommentCursors;
  }>({ data: [], cursors: { nextCursor: null, prevCursor: null } });

  const [filterOptions, setFilterOptions] = useState<FilterOption[]>();
  // Used to determine which comment the page should auto scroll to
  const [anchorCommentId, setAnchorCommentId] = useState<string | null>(null);

  const { getParam } = useQueryParams();

  const findLastPinnedCommentIndex = () =>
    findLastIndex(comments?.data, (comment: Comment) => comment.pin_order_id !== 0);

  /**
   * =====================
   * LOAD SPECIFIC COMMENT
   * =====================
   */
  const loadSpecificComment = async (id: string) => {
    try {
      const { data, meta } = await getSpecificComment({ id }).unwrap();
      const commentsData = {
        data,
        cursors: {
          nextCursor: meta.next_cursor,
          prevCursor: meta.prev_cursor
        }
      };
      setComments(commentsData);
      setAnchorCommentId(id);
    } catch (error) {
      // TODO:: Show toast for error.
      // Load initial comments as fallback UI.
      loadInitialComments();
    }
  };

  /**
   * =====================
   * LOAD INITIAL COMMENTS
   * =====================
   */
  const loadInitialComments = async () => {
    try {
      const orderParam = getParam('ORDER_COMMENT_BY');
      const getCommentsParams = orderParam ? { id, order_by: orderParam } : { id };
      const { data, meta } = await getComments(getCommentsParams).unwrap();

      const commentsData = {
        data,
        cursors: {
          nextCursor: meta?.next_cursor ?? null,
          prevCursor: meta?.prev_cursor ?? null
        }
      };

      setComments(commentsData);

      meta?.filter_types && setFilterOptions(meta.filter_types);
    } catch (error) {
      // TODO:: Show toast for error.
    }
  };

  /**
   * ==================
   * LOAD MORE COMMENTS
   * ==================
   */
  const loadMoreComments = async (parentId?: number, direction: 'prev' | 'next' = 'next') => {
    try {
      const orderParam = getParam('ORDER_COMMENT_BY');
      // Main comments
      if (!parentId) {
        const { data, meta } = await getComments({
          id,
          cursor: comments.cursors[direction === 'next' ? 'nextCursor' : 'prevCursor'],
          order_by: orderParam
        }).unwrap();
        /* istanbul ignore next */
        setComments((prevComments) => ({
          data:
            direction === 'next'
              ? [...prevComments.data, ...data]
              : [...data, ...prevComments.data],
          cursors: {
            nextCursor:
              direction === 'next' ? meta?.next_cursor ?? null : comments.cursors.nextCursor,
            prevCursor:
              direction === 'prev' ? meta?.prev_cursor ?? null : comments.cursors.prevCursor
          }
        }));
        /* istanbul ignore next */
        setAnchorCommentId(String(data[0].id));
      }

      // Subcomments
      if (parentId) {
        const parentComment = findValueDeep(comments.data, (comment) => comment.id === parentId);
        const cursors = parentComment?.children_cursors;
        const cursor = cursors && cursors[direction];
        await loadChildren(parentId, cursor, direction);
      }
    } catch (error) {
      // TODO:: Show toast for error.
    }
  };

  /**
   * =============
   * LOAD CHILDREN
   * =============
   */
  const loadChildren = async (
    parentId: number,
    cursor?: string,
    direction: 'next' | 'prev' = 'next'
  ) => {
    try {
      const { data: fetchedComments, meta } = await getChildren({ id: parentId, cursor }).unwrap();
      const newComments = cloneDeepWith(comments.data, (comment: Comment) => {
        if (comment?.id === parentId) {
          return {
            ...comment,
            children: comment?.children
              ? direction === 'next'
                ? [...comment.children, ...fetchedComments]
                : [...fetchedComments, ...comment.children]
              : [...fetchedComments],
            children_cursors: {
              next:
                direction === 'next' ? meta?.next_cursor ?? null : comment.children_cursors?.next,
              prev:
                direction === 'prev' ? meta?.prev_cursor ?? null : comment.children_cursors?.prev
            }
          };
        }
      });
      setComments((prevComments) => ({ ...prevComments, data: newComments }));
      setAnchorCommentId(String(fetchedComments[0].id));
    } catch (error) {
      // TODO:: Show toast for error.
    }
  };

  /**
   * ==============
   * DELETE COMMENT
   * ==============
   */
  const deleteComment = async (commentId: number, parentId: null | number = null) => {
    const prevState = cloneDeep(comments.data);
    try {
      if (!parentId) {
        const newState = prevState?.filter((comment) => comment.id !== commentId);
        setComments((prevComments) => ({ ...prevComments, data: newState }));
      } else {
        const newState = cloneDeepWith(comments.data, (comment: Comment) => {
          if (comment?.id === parentId) {
            return {
              ...comment,
              children_count: comment?.children_count - 1,
              children: cloneDeep(comment.children).filter((comment) => comment.id !== commentId)
            };
          }
        });
        setComments((prevComments) => ({ ...prevComments, data: newState }));
      }
      await deleteCommentTrigger(commentId).unwrap();
    } catch (error) {
      setComments((prevComments) => ({ ...prevComments, data: prevState }));
      // TODO:: Show toast for error.
    }
  };

  /**
   * ==============
   * CREATE COMMENT
   * ==============
   */
  const createComment = async (
    comment: string,
    isAnonymous: boolean,
    parentId: number | null = null,
    pinOrderId: null | number = null,
    links?: CommentLink[],
    attachments?: Partial<Attachment>[]
  ) => {
    try {
      const returnedComment = await createCommentTrigger({
        comment,
        is_anonymous: isAnonymous,
        commentableId: id!,
        parentId,
        pinOrderId,
        links,
        attachments
      }).unwrap();

      const newComment = { ...returnedComment, children: [], reactions: [] };

      const lastPinnedIndex = findLastPinnedCommentIndex();

      const newComments = parentId
        ? cloneDeepWith(comments.data, (comment) => {
            if (comment?.id === parentId) {
              return {
                ...comment,
                children: comment?.children ? [newComment, ...comment.children] : [newComment],
                children_count: comment?.children_count ? comment.children_count + 1 : 1
              };
            }
          })
        : comments.data.length !== 0
        ? lastPinnedIndex === -1
          ? [newComment, ...cloneDeep(comments.data)]
          : insertIntoPosition(comments.data, lastPinnedIndex, newComment, true)
        : [newComment];

      setComments((prevComments) => ({ ...prevComments, data: newComments }));
      setAnchorCommentId(String(returnedComment.id));
    } catch (error) {
      // TODO:: Show toast for error.
    }
  };

  /**
   * ============
   * PIN COMMENT
   * ============
   */
  const pinComment = async (commentId: number) => {
    const previousComments = cloneDeep(comments);
    const currentComment = find(comments.data, ({ id }: Comment) => commentId === id);

    try {
      const newComments = cloneDeepWith(comments.data, (comment: Comment) => {
        if (comment?.id === commentId) {
          const newComment = cloneDeep(comment);
          newComment?.pin_order_id === 0
            ? (newComment.pin_order_id = 1)
            : (newComment.pin_order_id = 0);
          return newComment;
        }
      });

      setComments((prevComments) => ({
        ...prevComments,
        data:
          currentComment?.pin_order_id === 0
            ? sortBy(newComments, ({ id }: Comment) => (commentId === id ? 0 : 1))
            : newComments
      }));

      await togglePin(commentId).unwrap();
    } catch (error) {
      setComments(previousComments);
      // TODO:: Show toast for error.
    }
  };

  /**
   * ================
   * REACT TO COMMENT
   * ================
   */
  const reactToComment = async (commentId: number, reactionType: Reaction['type']) => {
    const previousComments = cloneDeep(comments);
    try {
      const comment = findValueDeep(comments.data, (comment) => comment.id === commentId);
      const alreadyReacted = !!comment?.reactions.find(
        (reaction) => reaction.profile.id === user?.data?.id
      );

      const newReaction: Reaction = {
        comment_id: commentId,
        profile: {
          id: user?.data?.id,
          title: user?.data?.title,
          image: user?.data?.image
        },
        type: reactionType
      };

      const newComments = cloneDeepWith(comments.data, (comment: Comment) => {
        if (comment?.id === commentId) {
          const newComment = cloneDeep(comment);
          alreadyReacted
            ? newComment.reactions.splice(
                newComment.reactions.findIndex((react) => react.profile.id === user?.data?.id),
                1
              )
            : newComment.reactions.unshift(newReaction);

          return newComment;
        }
      });

      setComments((prevComments) => ({ ...prevComments, data: newComments }));

      await reactToCommentTrigger({ commentId, reactionType }).unwrap();
    } catch (error) {
      setComments(previousComments);
      // TODO:: Show toast for error.
    }
  };

  /**
   * ============
   * EDIT COMMENT
   * ============
   */
  const editComment = async (
    commentId: number,
    newCommentText: string,
    isAnonymous: boolean,
    links?: CommentLink[],
    attachments?: Partial<Attachment>[]
  ) => {
    const previousComments = cloneDeep(comments);
    try {
      const response = await editCommentTrigger({
        commentId,
        newCommentText,
        isAnonymous,
        links,
        attachments
      }).unwrap();

      const newState = cloneDeepWith(comments.data, (commentObj: Comment) => {
        if (commentObj?.id === commentId) {
          return {
            ...commentObj,
            comment: response?.data?.comment,
            is_anonymous: response?.data?.is_anonymous,
            profile: response?.data?.profile,
            links: response?.data?.links,
            attachments: response?.data?.attachments
          };
        }
      });
      setComments((prevComments) => ({ ...prevComments, data: newState }));
    } catch (error) {
      setComments(previousComments);
      // TODO:: Show toast for error.
    }
  };

  /**
   * ============
   * ORDER COMMENT
   * ============
   */
  const orderComment = async (order_by: string) => {
    try {
      const { data, meta } = await getComments({ id, order_by }).unwrap();
      setComments({
        data,
        cursors: {
          nextCursor: meta.next_cursor ?? null,
          prevCursor: meta.prev_cursor ?? null
        }
      });
    } catch (error) {
      // TODO:: Show toast for error.
    }
  };

  useEffect(() => {
    const anchorCommentId = getParam('ANCHOR_COMMENT_ID');
    if (anchorCommentId) {
      loadSpecificComment(anchorCommentId);
    } else {
      loadInitialComments();
    }
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        comments: comments.data,
        mainCommentCursors: comments.cursors,
        isLoading: isLoading || isFetching,
        isLoadingChildren: isFetchingChildren,
        isLoadingSpecific: isFetchingSpecificComment || isLoadingSpecificComment,
        filterOptions,
        isLoadingEditComment,
        childrenRequestArgs,
        editRequestArgs,
        anchorCommentId,
        loadMoreComments,
        clearAnchorCommentId: () => setAnchorCommentId(null),
        loadChildren,
        deleteComment,
        createComment,
        reactToComment,
        pinComment,
        editComment,
        orderComment
      }}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsProvider;

export const useComments = () => useContext(CommentsContext);
