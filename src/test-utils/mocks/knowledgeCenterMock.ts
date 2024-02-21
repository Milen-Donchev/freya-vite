import type { Attachment, TArticle, Topic } from '@types';

export const topicMock: Topic = {
  id: 1,
  articles: [],
  articles_count: 0,
  category_id: 1,
  created_at: 'created-at-timestamp',
  discussions: [],
  discussions_count: 0,
  profiles: [],
  profiles_count: 0,
  tagged_articles: [],
  tagged_articles_count: 0,
  updated_at: 'update-at-timestamp',
  image: { source: 'https://picsum.photos/200/300' },
  slug: 'some-slug',
  title: { en: 'some-title' },
  ancestors: [],
  description: { en: 'some-description' }
};

export const articleMock: TArticle = {
  id: 1,
  attachments: [
    {
      id: 1,
      name: 'whatever.jpg',
      path: 'some-path',
      size: '29gb',
      resource_type: 'image'
    },
    {
      id: 2,
      name: 'video-whatever.mp4',
      path: 'video-path-1',
      size: '2gb',
      resource_type: 'video'
    }
  ] as Attachment[],
  created_at: 'created-at-timestamp',
  description: { en: 'some-description' },
  image: { source: 'https://picsum.photos/200/300' },
  slug: 'some-slug',
  title: { en: 'some-title' },
  topic: topicMock,
  topic_id: 1,
  type: 'faq',
  type_title: { en: 'some-type-title' },
  updated_at: 'updated-at-timestamp'
};
