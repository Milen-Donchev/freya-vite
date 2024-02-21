import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { setOriginRoute } from '@store/navigationSlice';

import authCard from '../../assets/images/auth-card.svg';

const ScheduleAuthCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routerLocation = useLocation();

  const handleOnClick = (route: string) => {
    dispatch(setOriginRoute(routerLocation));
    navigate(route);
  };

  return (
    <div className="row row-cols-1 row-cols-md-2 g-36">
      <div className="col">
        <h3 className="mb-0">{t('authentication.patient_details', 'Patient details')}</h3>
        <p className="mb-40">
          {t(
            'authentication.login_or_register_message',
            'Please register or log in to your profile'
          )}
        </p>
        <div className="text-center">
          <button
            onClick={() => handleOnClick(Routes.REGISTER)}
            className="btn btn-primary btn-lg width-100">
            {t('common.register', 'Register')}
          </button>
          <p className="my-12">{t('authentication.or', 'or')}</p>
          <button
            onClick={() => handleOnClick(Routes.LOGIN)}
            className="btn btn-outline-primary btn-lg width-100">
            {t('common.login', 'Login')}
          </button>
          <button
            onClick={() => handleOnClick(Routes.FORGOTTEN_PASSWORD)}
            className="btn btn-link text-primary">
            {t('login.forgotten_password', 'Forgotten password?')}
          </button>
        </div>
      </div>
      <div className="col align-self-center">
        <img src={authCard} alt="intro" className="width-100" loading="lazy" />
      </div>
    </div>
  );
};

export default ScheduleAuthCard;
