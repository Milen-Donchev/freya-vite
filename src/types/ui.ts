import { FilterOption } from './comments';

export type Image = {
  default?: string;
  small?: string;
  source?: string;
  thumb?: string;
};

export type PaginationLink = {
  active: boolean;
  label: string;
  page: string;
  url: null | string;
};

export type Meta = {
  links: PaginationLink[] | [];
  total: number;
  current_page?: number;
  from?: number;
  last_page?: number;
  path?: string;
  per_page?: number;
  to?: string;
  filter_types?: FilterOption[];
  next_cursor?: string;
  prev_cursor?: string;
};

export type CustomError = {
  message: string;
  errors?: {
    password?: string;
    email?: string;
  };
};

export type Language = {
  title: string;
  locale: string;
  is_fallback: boolean;
};

export type Predicate<T> = (item: T) => boolean;

export interface BreadcrumbItem {
  id: number | string;
  slug: string;
  href: string;
  current: boolean;
  title: Record<string, string> | string;
  image?: Image;
  entity_type?: 'category' | 'topic';
}
