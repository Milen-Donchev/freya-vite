import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';

import { Routes } from '@models/Routes';
import { useAuthStatus } from '@hooks/useAuthStatus';

import image from './404.svg';

interface PageNotFoundProps {
  shouldForceFullscreenView?: boolean;
}

const PageNotFound = (props: PageNotFoundProps) => {
  const { shouldForceFullscreenView = false } = props;
  const { t } = useTranslation();
  const { isAuthenticated, isGuestLoginAllowed } = useAuthStatus();

  const isFullscreen = (!isAuthenticated && !isGuestLoginAllowed) || shouldForceFullscreenView;

  return (
    <div
      className={classNames('d-flex flex-wrap flex-md-fill', {
        'min-vh-md-100 p-32 p-md-0': isFullscreen
      })}>
      <div
        className={classNames(
          'col-12 col-md-5 col-lg-4 order-2 order-md-1 d-flex flex-column justify-content-center p-md-32 p-lg-48',
          {
            'bg-md-primary-200': isFullscreen
          }
        )}>
        <div className="text-center text-md-start">
          <p className="fs-80 fw-semibold mb-0">404</p>
          <p className="fs-32 fw-semibold">{t('page-not-found.title', 'Page not found!')}</p>
          <p className="fs-20 mb-24">{t('page-not-found.description', 'Page not found')}</p>
          <Link to={Routes.INDEX} replace className="btn btn-primary btn-xl width-100 mb-32">
            {t('page-not-found.cta', 'Home')}
          </Link>
        </div>
      </div>
      <div
        className={classNames(
          'col-12 col-md-7 col-lg-8 d-flex align-items-center justify-content-center order-1 order-md-2 overflow-hidden position-relative mb-36 mb-md-0',
          {
            'bg-md-white': isFullscreen
          }
        )}>
        <img
          src={image}
          alt="404"
          className="width-60 width-md-auto max-height-md-75 mw-md-100 position-md-absolute"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
