import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';

import { Routes } from '@models/Routes';
import { resetTempAuth } from '@store/tempAuthSlice';

const AlreadyHaveProfilePartial = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToLogin = () => {
    dispatch(resetTempAuth(''));
    navigate(Routes.LOGIN, { replace: true });
  };

  return (
    <div className="width-100">
      <p className="mb-8">{t('register.already_have_profile', 'Already have profile?')}</p>
      <div
        onClick={handleToLogin}
        className="btn btn-outline-primary btn-xl width-100"
        data-testid="already-have-profile-login-btn">
        {t('common.login', 'Login')}
      </div>
    </div>
  );
};

export default memo(AlreadyHaveProfilePartial);
