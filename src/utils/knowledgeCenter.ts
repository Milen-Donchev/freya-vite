import type { TFunction } from '@hooks/useTranslation';
import type { BreadcrumbItem, KnowledgeCenterItem, Topic } from '@types';

export const constructCrumbItems = (item: KnowledgeCenterItem | Topic, t: TFunction) => {
  const ancestors = item.ancestors as BreadcrumbItem[];

  const buildHref = (item: KnowledgeCenterItem | BreadcrumbItem) =>
    `/${item.entity_type === 'category' ? 'knowledge-center' : 'topics'}/${item.id}/${item.slug}`;

  return [
    {
      id: 'knowledge-center',
      title: t('knowledge-center.header_title', 'Knowledge center'),
      slug: '',
      image: {
        default: ''
      },
      href: `/knowledge-center`,
      current: false
    },
    ...ancestors.map((ancestor) => ({
      ...ancestor,
      href: buildHref(ancestor),
      current: false
    })),
    {
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: item.image,
      href: buildHref(item as BreadcrumbItem),
      current: true
    }
  ];
};
