import { BreadcrumbItem } from '@types';

export const crumbItemMock: BreadcrumbItem = {
  id: 1,
  current: true,
  href: '/',
  slug: 'some-slug',
  title: 'some-title',
  entity_type: 'category',
  image: { source: 'https://picsum.photos/200/300' }
};
