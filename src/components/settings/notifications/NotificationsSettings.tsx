import map from 'lodash/map';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { useNotificationSettings, type SettingKey } from './useNotificationSettings';

import RowButton from '@components/ui/buttons/RowButton';
import SettingsBackButtonFrame from '@components/settings/SettingsBackButtonFrame';

const NotificationsSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { settings } = useNotificationSettings();

  const activeSetting = pathname.split('/').length === 4 && pathname.split('/')[3];

  const openNotificationSetting = (key: SettingKey) => {
    navigate(`${Routes.SETTINGS}/notifications/${key}`);
  };

  const goBackToNotifications = () => navigate(`${Routes.SETTINGS}/notifications`);

  const ActiveSetting = settings.find((s) => s.key === activeSetting);

  if (activeSetting && !!ActiveSetting)
    return (
      <SettingsBackButtonFrame title={ActiveSetting.title} onClick={goBackToNotifications}>
        {ActiveSetting.Component}
      </SettingsBackButtonFrame>
    );

  return (
    <>
      <h3 className="d-none d-sm-block">{t('settings.notifications', 'Notifications')}</h3>
      <p className="mb-24 text-gray-300">
        {t(
          'settings.notifications_description',
          'Choose what type of notifications you would like to receive.'
        )}
      </p>

      {map(settings, ({ key, title, subtitle }) => (
        <RowButton
          key={key}
          title={title}
          subtitle={subtitle}
          isActive={false}
          className="py-12"
          onClick={() => openNotificationSetting(key)}
        />
      ))}
    </>
  );
};

export default NotificationsSettings;
