import React from 'react';
import map from 'lodash/map';
import { useLocation, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useSettings } from './useSettings';
import { Breakpoints } from '@models/Breakpoints';
import { useTranslation } from '@hooks/useTranslation';
import { useWindowDimensions } from '@hooks/useWindowDimensions';

import CardFrame from '@components/ui/frames/CardFrame';
import RowButton from '@components/ui/buttons/RowButton';
import SettingsBackButtonFrame from '@freya/components/settings/SettingsBackButtonFrame';

const SettingsPage = () => {
  const navigate = useNavigate();
  const settings = useSettings();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { width } = useWindowDimensions();

  const ActiveSetting = settings.find((s) => s.isActive);
  const isXL = width >= Breakpoints.XL;
  const isMainRoute = pathname === Routes.SETTINGS;
  const isNestedRoute = pathname.split('/').length > 3;

  const goBackToSettings = () => navigate(Routes.SETTINGS);

  // Prevent users from manually changing the url to unallowed route
  if (!ActiveSetting && !isMainRoute) {
    goBackToSettings();
    return null;
  }

  return (
    <>
      <h3 className="mb-20 text-primary-600 d-none d-sm-block">
        {t('settings.header', 'Settings and privacy')}
      </h3>
      <div className="row g-20 mb-20 height-100">
        {(isXL || isMainRoute) && (
          <div className="col-12 col-xl-4">
            <CardFrame className="height-100 p-20 px-sm-0 py-sm-40">
              <h3 className="mb-20 d-block d-sm-none fs-18">
                {t('settings.header', 'Settings and privacy')}
              </h3>
              {map(settings, ({ icon, title, href, isActive }) => (
                <RowButton
                  key={href}
                  icon={icon}
                  title={title}
                  onClick={() => navigate(`${Routes.SETTINGS}${href}`)}
                  isActive={isXL && isActive}
                  iconSize="fs-16"
                  className="px-sm-40 py-12"
                  titleClassName="ps-12"
                  animateButtons={false}
                />
              ))}
            </CardFrame>
          </div>
        )}

        {!!ActiveSetting && (isXL || !isMainRoute) && (
          <div className="col-12 col-xl-8">
            <CardFrame className="height-100 p-20 p-sm-40">
              <SettingsBackButtonFrame
                title={ActiveSetting.title}
                onClick={goBackToSettings}
                showButton={!isXL && !isMainRoute && !isNestedRoute}>
                {ActiveSetting.Component}
              </SettingsBackButtonFrame>
            </CardFrame>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsPage;
