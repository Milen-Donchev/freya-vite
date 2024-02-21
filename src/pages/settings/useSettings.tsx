import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useTranslation } from '@hooks/useTranslation';

import ProfileSettings from '@components/settings/ProfileSettings';
import LanguageSettings from '@components/settings/LanguageSettings';
import NotificationsSettings from '@components/settings/notifications/NotificationsSettings';

export const useSettings = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const SETTINGS = useMemo(
    () => [
      {
        icon: 'fa-user',
        title: t('settings.profile', 'Profile settings'),
        href: '/profile',
        isActive: pathname === '/settings' || pathname.startsWith('/settings/profile'),
        Component: <ProfileSettings />
      },
      // {
      //   icon: 'fa-lock',
      //   title: t('settings.privacy', 'Privacy settings'),
      //   href: '/privacy',
      //   isActive: pathname.startsWith('/settings/privacy'),
      //   Component: <></>
      // },
      {
        icon: 'fa-bell',
        title: t('settings.notifications', 'Notifications'),
        href: '/notifications',
        isActive: pathname.startsWith('/settings/notifications'),
        Component: <NotificationsSettings />
      },
      // {
      //   icon: 'fa-universal-access',
      //   title: t('settings.accessibility', 'Accessibility and availability'),
      //   href: '/accessibility',
      //   isActive: pathname.startsWith('/settings/accessibility'),
      //   Component: <></>
      // }
      {
        icon: 'fa-globe',
        title: t('settings.language_and_locale', 'Language and locale'),
        href: '/language',
        isActive: pathname.startsWith('/settings/language'),
        Component: <LanguageSettings />
      }
    ],
    [pathname]
  );

  return SETTINGS;
};
