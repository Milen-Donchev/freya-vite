import React, { useState } from 'react';
import { useTranslation } from '@hooks/useTranslation';
import classNames from 'classnames';
import filter from 'lodash/filter';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';

import { configGet } from '@freya/config';
import { Routes } from '@models/Routes';
import { Breakpoints } from '@models/Breakpoints';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useDisableBodyScroll } from '@hooks/useDisableBodyScroll';

import Can from '@freya/components/can/Can';
import BurgerMenuButton from './BurgerMenuButton';
import MobileMenuProfileCard from './MobileMenuProfileCard';
import MobileNavigationButton from './MobileNavigationButton';
import LanguageSwitcher from '@components/ui/language-switcher/LanguageSwitcher';
import AppointmentButton from '@components/ui/buttons/AppointmentButton';

import { type NavItem, navigationItems } from '../navigationItems';
import { mobileLogo, navigationContainer } from './mobile-navigation.scss';

const MobileNavigation = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { isAuthenticated } = useAuthStatus();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const MOBILE_NAVIGATION = navigationItems();

  const mobileOnlyOptions = [
    {
      id: 11,
      title: t('sidebar.settings', 'Settings'),
      icon: 'fa-gear',
      count: 0,
      href: Routes.SETTINGS,
      placement: 'bottom',
      visible: isAuthenticated
    },
    {
      id: 12,
      title: t('sidebar.logout', 'Logout'),
      icon: 'fa-arrow-right-from-bracket',
      count: 0,
      href: Routes.LOGOUT,
      placement: 'bottom',
      visible: isAuthenticated
    }
  ] as NavItem[];

  const MOBILE_NAVIGATION_TOP = filter(
    MOBILE_NAVIGATION,
    (item: NavItem) => item.placement === 'top'
  );
  const MOBILE_NAVIGATION_BOTTOM = [
    ...filter(MOBILE_NAVIGATION, (item: NavItem) => item.placement === 'bottom'),
    ...(isAuthenticated ? mobileOnlyOptions : [])
  ];
  const logo = configGet('logoMobile') ?? configGet('logo');

  /* Fixes bug with being able to scroll body when burger menu is open */
  useDisableBodyScroll(isBurgerMenuOpen && width <= Breakpoints.SM);

  const toggleBurgerMenu = () => setIsBurgerMenuOpen((wasOpen) => !wasOpen);

  return (
    <>
      <div
        className="align-items-center d-flex d-sm-none justify-content-between fixed-top bg-white px-32 py-24 shadow-sm"
        data-testid="mobile-navigation">
        <div>
          <a href="/">
            <img src={logo} className={mobileLogo} />
          </a>
        </div>
        <div className="d-flex align-items-center">
          <div className="me-24">
            <LanguageSwitcher />
          </div>
          <BurgerMenuButton
            isBurgerMenuOpen={isBurgerMenuOpen}
            toggleBurgerMenu={() => toggleBurgerMenu()}
          />
        </div>
      </div>
      {isBurgerMenuOpen && (
        <div
          className={classNames(
            'd-flex flex-column d-sm-none position-fixed width-100 height-100 bg-white overflow-auto custom-scrollbar',
            navigationContainer
          )}>
          <p className="fs-18 fw-bold mb-0 pt-12 px-20">{t('common.menu', 'Menu')}</p>
          <MobileMenuProfileCard toggleBurgerMenu={toggleBurgerMenu} />
          <div className="flex-fill">
            {map(MOBILE_NAVIGATION_TOP, (option) => (
              <Can permissions={option.permissions} key={option.id}>
                <MobileNavigationButton navOption={option} toggleBurgerMenu={toggleBurgerMenu} />
              </Can>
            ))}
            <div className="text-center my-12 d-md-none">
              <AppointmentButton className="btn btn-outline-primary" />
            </div>
          </div>
          <div>
            {!isEmpty(MOBILE_NAVIGATION_BOTTOM) && <hr className="mx-20" />}
            {map(MOBILE_NAVIGATION_BOTTOM, (option) => (
              <Can permissions={option.permissions} key={option.id}>
                <MobileNavigationButton navOption={option} toggleBurgerMenu={toggleBurgerMenu} />
              </Can>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
