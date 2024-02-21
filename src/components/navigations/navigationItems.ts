import filter from 'lodash/filter';

import { Routes } from '@models/Routes';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useTranslation } from '@hooks/useTranslation';

import { useNotifications } from '@providers/SocketProvider';
import { configGet } from '@freya/config';

export interface NavItem {
  id: number;
  title: string;
  icon: string;
  count: number;
  href: string;
  placement: 'top' | 'bottom';
  childrenRoutes?: string[];
  permissions?: string[];
  visible: boolean;
}

export const navigationItems = (): NavItem[] => {
  const { t } = useTranslation();
  const { unseenNotificationsCount } = useNotifications();
  const {
    isAuthenticated,
    isGuestLoginAllowed,
    canVisitDiscussions,
    canVisitKnowledgeCenter,
    canVisitProfiles,
    canVisitProducts
  } = useAuthStatus();

  const hasAccess = isAuthenticated || isGuestLoginAllowed;

  const items: NavItem[] = [
    // {
    //   id: 1,
    //   title: t('sidebar.dashboard', 'Dashboard'),
    //   icon: 'fa-objects-column',
    //   count: 0,
    //   href: '/dashboard',
    //   placement: 'top',
    //   permissions: [],
    //   visibility: 'authenticated'
    // },
    {
      id: 2,
      title: t('sidebar.home', 'Home'),
      icon: 'fa-objects-column',
      count: 0,
      href: '/',
      placement: 'top',
      permissions: [],
      visible: !hasAccess
    },
    {
      id: 3,
      title: t('sidebar.groups', 'Groups'),
      icon: 'fa-user-group',
      count: 0,
      href: '/discussions',
      placement: 'top',
      permissions: isAuthenticated ? ['view_any_discussion'] : [],
      visible: canVisitDiscussions
    },
    {
      id: 4,
      title: t('sidebar.knowledge-center', 'Knowledge center'),
      icon: 'fa-book',
      count: 0,
      href: '/knowledge-center',
      placement: 'top',
      childrenRoutes: ['/topics'],
      permissions: isAuthenticated ? ['view_any_category'] : [],
      visible: canVisitKnowledgeCenter
    },
    {
      id: 5,
      title: t('sidebar.meetings', 'Meetings'),
      icon: 'fa-calendar-check',
      count: 0,
      href: '/meetings',
      placement: 'top',
      permissions: [],
      visible: isAuthenticated
    },
    {
      id: 6,
      title: t('sidebar.profiles', 'Profiles'),
      icon: 'fa-user-tie-hair',
      count: 0,
      href: '/profiles',
      placement: 'top',
      permissions: [],
      visible: canVisitProfiles
    },
    {
      id: 7,
      title: t('sidebar.notifications', 'Notifications'),
      icon: 'fa-bell',
      count: unseenNotificationsCount,
      href: '/notifications',
      placement: 'top',
      permissions: [],
      visible: isAuthenticated
    },
    {
      id: 8,
      title: t('sidebar.products', 'Products'),
      icon: 'fa-ballot-check',
      count: 0,
      href: Routes.PRODUCTS,
      placement: 'top',
      permissions: [],
      visible: canVisitProducts
    },
    {
      id: 9,
      title: t('sidebar.terms', 'Terms'),
      icon: 'fa-file-contract',
      count: 0,
      href: configGet('termsUrl'),
      placement: 'bottom',
      permissions: [],
      visible: true
    },
    {
      id: 10,
      title: t('sidebar.contacts', 'Contacts'),
      icon: 'fa-address-book',
      count: 0,
      href: '/contacts',
      placement: 'bottom',
      permissions: [],
      visible: true
    }
  ];

  return filter(items, (item: NavItem) => item.visible);
};
