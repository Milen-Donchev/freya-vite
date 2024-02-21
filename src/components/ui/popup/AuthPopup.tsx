import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { setOriginRoute } from '@store/navigationSlice';
import { resetDiscussionApi } from '@store/api/discussionApi';

import { MarketingPopup, type MarketingPopupProps } from './MarketingPopup';

import authPopup from '@freya/assets/images/auth-popup.svg';

const AuthPopup = (props: MarketingPopupProps) => {
  const { isOpen, onHide } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onClick = (variant: 'login' | 'register') => {
    dispatch(setOriginRoute(location));
    if (!!matchPath(Routes.DISCUSSION, location.pathname)) {
      dispatch(resetDiscussionApi());
    }
    navigate(`/${variant}`);
  };

  return (
    <MarketingPopup
      show={isOpen}
      onHide={onHide}
      image={authPopup}
      body={
        <div>
          <h2 className="fs-24 mb-18">{t('common.auth_popup_title', "Sign in now, it's free!")}</h2>
          <p className="fs-14 mb-40">
            {t(
              'common.auth_popup_description',
              'This feature is available only for registered users. Please sign in or register to get full access to the platform.'
            )}
          </p>
          <div className="d-flex flex-column flex-sm-row gap-20">
            <button
              onClick={() => onClick('register')}
              className="btn btn-primary-500 width-100 btn-lg">
              {t('common.register', 'Register')}
            </button>
            <button
              onClick={() => onClick('login')}
              className="btn btn-lg btn-outline-primary-500 width-100">
              {t('common.login', 'Login')}
            </button>
          </div>
        </div>
      }
    />
  );
};

export default AuthPopup;
