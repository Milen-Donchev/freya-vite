import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import { Routes } from '@models/Routes';
import { getImage } from '@utils/helpers';
import { useAuthStatus } from '@hooks/useAuthStatus';
import { useTranslation } from '@hooks/useTranslation';
import { useVisitMyProfile } from '@hooks/useVisitMyProfile';
import { useGetCurrentProfileQuery } from '@store/api/profileApi';

import Avatar from '@components/ui/avatar/Avatar';
import AppointmentButton from '@components/ui/buttons/AppointmentButton';
import LanguageSwitcher from '@components/ui/language-switcher/LanguageSwitcher';

const PageHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const { isAuthenticated, isGuestLoginAllowed } = useAuthStatus();
  const { goToMyProfile } = useVisitMyProfile({ skip: !isAuthenticated });
  const { data: profile } = useGetCurrentProfileQuery(
    {
      id: currentUser?.id
    },
    {
      skip: !isAuthenticated
    }
  );

  const isScheduleRoute =
    location.pathname.includes('meeting-save') || location.pathname.includes('schedule');

  const handleStepBack = () => {
    navigate(-1);
  };

  const goToSettings = (pathname: string = '') => {
    navigate(`${Routes.SETTINGS}${pathname}`);
  };

  return (
    <div className="py-36 width-100 d-none align-items-center justify-content-between d-sm-flex">
      <button
        className="btn btn-ghost-primary d-none d-md-flex align-items-center"
        disabled={isScheduleRoute}
        data-testid="step-back-btn"
        onClick={handleStepBack}>
        <i className="fa-regular fa-arrow-left me-8"></i>
        {t('common.back', 'Back')}
      </button>
      <div className="d-flex align-items-center justify-content-end gap-16 width-100">
        <AppointmentButton />
        {!isAuthenticated && <LanguageSwitcher className="mx-lg-24 transparentSelect" />}
        {isGuestLoginAllowed && !isAuthenticated && (
          <Link to={Routes.LOGIN} className="btn btn-lg btn-outline-primary">
            {t('common.login_or_register', 'Login')}
          </Link>
        )}
        {isAuthenticated && (
          <div
            className="d-flex align-items-center cursor-pointer gap-12"
            onClick={goToMyProfile}
            data-testid="my-profile-btn">
            <Avatar image={getImage(profile?.data?.image, 'thumb')} />
            <div className="text-primary-600 text-nowrap">
              {t('header-navigation.my_profile', 'My profile')}
            </div>
          </div>
        )}
        {isAuthenticated && (
          <Dropdown className="dropdown d-inline-block">
            <Dropdown.Toggle as="div" className="no-caret" id="profile-dropdown">
              <button className="btn btn-icon btn-primary-300 btn-sm flex-shrink-0">
                <i className="fa-regular fa-chevron-down" />
              </button>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item as="div" className="p-0">
                <div onClick={goToMyProfile} className="dropdown-item cursor-pointer">
                  <i className="fa-light fa-user text-primary-400 me-8" />
                  {t('header-navigation.my_profile', 'My profile')}
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="div" className="p-0">
                <div onClick={() => goToSettings()} className="dropdown-item cursor-pointer">
                  <i className="fa-light fa-gear text-primary-400 me-8" />
                  {t('header-navigation.settings', 'Settings')}
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="div" className="p-0">
                <div
                  onClick={() => goToSettings('/language')}
                  className="dropdown-item cursor-pointer">
                  <i className="fa-light fa-globe text-primary-400 me-8" />
                  {t('header-navigation.language', 'Language')}
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as="div" className="p-0">
                <Link to={Routes.LOGOUT} className="dropdown-item">
                  <i className="fa-light fa-arrow-right-from-bracket text-primary-400 me-8" />
                  {t('common.logout', 'Logout')}
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
