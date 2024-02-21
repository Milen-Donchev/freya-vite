import { KeyString } from './home';
import type { Image } from './ui';

export type DiscussionListData = {
  id: number;
  title: string;
  slug: string;
  image?: Image;
  comments_count: number;
  participants_count: number;
};

export type Profile = {
  id?: number;
  title?: string;
  image?: Image | null;
  slug?: string;
};

export type Discussion = {
  id: number;
  cover_image: Image;
  image: Image;
  private_description: string;
  public_description: string;
  title: string;
  all_comments_anonymized: boolean;
  allow_anonymous_comment: boolean;
  allow_comment_attachment: boolean;
  comments_count: number;
  participants_count: number;
  public_attachments: [];
  private_attachments: [];
  profile: Profile | null;
  profile_id: number;
  requires_approval: boolean;
  slug: string;
  visibility_title: Record<string, string>;
  moderators: [];
  participant?: Partial<DiscussionParticipant>;
  is_sellable: boolean;
  has_pending_order: boolean;
};

export type DiscussionParticipant = {
  email: string;
  id: number;
  image: Image;
  profile_id: number;
  status: 'joined' | 'invited' | 'pending' | 'rejected' | 'left';
  status_text: {
    title_status: KeyString;
    cta_status: KeyString;
  };
  title: string;
  type: 'administrator' | 'moderator' | 'creator' | null;
  type_title: Record<string, string>;
  slug: string;
};
