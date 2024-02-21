import type { Discussion } from './discussion';
import type { Attachment } from './knowledgeCenter';
import type { Image, Meta } from './ui';

export type Comment = {
  id: number;
  comment: string;
  profile: {
    id: number;
    title: string;
    slug: string;
    image: Record<string, string>;
  };
  profile_id: number;
  children_count: number;
  children_cursors?: {
    next?: string;
    prev?: string;
  };
  reactions_count: number;
  status: string | null;
  commentable: Discussion;
  children: Comment[];
  reactions: Reaction[];
  depth: number;
  pin_order_id: number | null;
  created_at: string;
  updated_at: string;
  is_anonymous?: boolean;
  is_from_admin?: boolean;
  nextLink?: Links['next'];
  links?: CommentLink[];
  attachments?: Attachment[];
};

export type Links = {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
};

export type Reaction = {
  type: string;
  comment_id: number;
  profile: {
    id: number;
    title: string;
    image: Image;
  };
};

export type GetCommentsData = {
  data: Comment[];
  links: Links;
  meta: Meta;
};

export type CreateCommentBody = {
  comment: string;
  is_anonymous: boolean;
  commentableId: string;
  parentId: number | null;
  pinOrderId: number | null;
  links?: CommentLink[];
  attachments?: File[];
};

export type FilterOption = {
  title: {
    [key: string]: string;
  };
  slug: string;
};

export interface CommentLink {
  title: string;
  url: string;
  description: string;
  has_preview?: boolean;
  image?: string;
}
