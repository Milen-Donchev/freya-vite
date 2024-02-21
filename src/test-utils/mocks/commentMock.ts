import type { Comment } from '@types';

import { discussionMock } from './discussionMock';

export const commentMock: Comment = {
  id: 1,
  children: [],
  children_count: 1,
  comment: 'some text',
  created_at: 'some date',
  pin_order_id: 1,
  depth: 0,
  profile: {
    id: 1,
    title: 'Milen Donchev',
    slug: 'milen-donchev',
    image: {
      default: 'https://picsum.photos/200'
    }
  },
  profile_id: 1,
  reactions: [
    {
      type: 'like',
      comment_id: 1,
      profile: {
        id: 1,
        title: 'Milen Donchev',
        image: {
          default: 'https://picsum.photos/200'
        }
      }
    }
  ],
  reactions_count: 0,
  updated_at: 'some date',
  commentable: discussionMock,
  status: ''
};
