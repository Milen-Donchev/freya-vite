import type { Discussion } from '@types';

export const discussionMock: Discussion = {
  id: 1,
  cover_image: { default: '' },
  image: { default: '' },
  private_description: '',
  public_description: '',
  private_attachments: [],
  public_attachments: [],
  title: '',
  slug: '',
  all_comments_anonymized: false,
  allow_anonymous_comment: true,
  allow_comment_attachment: false,
  comments_count: 0,
  participants_count: 0,
  profile: null,
  profile_id: 1,
  requires_approval: false,
  visibility_title: { en: 'Open' },
  moderators: [],
  is_sellable: false,
  has_pending_order: false
};
