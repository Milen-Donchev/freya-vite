import type { FileType } from '@freya/utils/attachments';
import { BreadcrumbItem, Discussion, Image, Profile } from '@types';

export interface KnowledgeCenterItem {
  id: number;
  entity_type: 'category' | 'topic';
  image: Image;
  slug: string;
  title: Record<string, string>;
  description?: Record<string, string>;
  children?: KnowledgeCenterItem[];
  children_count?: number;
  topics?: any[];
  topics_count?: number;
  ancestors?: BreadcrumbItem[];
}

export interface Topic {
  id: number;
  category_id: number;
  image: Image;
  title: Record<string, string>;
  slug: string;
  description: Record<string, string>;
  created_at: string;
  updated_at: string;
  profiles: Profile[];
  profiles_count: number;
  discussions: Discussion[];
  discussions_count: number;
  tagged_articles: TArticle[];
  tagged_articles_count: number;
  articles: TArticle[];
  articles_count: number;
  ancestors?: BreadcrumbItem[];
}

export interface Attachment {
  id: number;
  name: string;
  path: string;
  resource_type: FileType;
  size: string;
  type: string;
  deleteUrl?: string;
}

export interface TArticle {
  attachments: Attachment[];
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: Image;
  slug: string;
  topic: Topic;
  topic_id: number;
  type: 'knowledge' | 'faq';
  type_title: Record<string, string>;
  created_at: string;
  updated_at: string;
}
