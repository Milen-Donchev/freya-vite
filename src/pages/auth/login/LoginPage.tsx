import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';

import { Routes } from '@models/Routes';

import LoginForm from '@components/login/LoginForm';

import { loginGrid, formWrapper, footerWrapper } from './login-page.scss';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <div className={`${loginGrid} width-320`}>
      <div className={`${formWrapper} align-self-md-start`}>
        <LoginForm />
      </div>
      <div className={`${footerWrapper} align-self-md-end mt-48`}>
        <p className="mb-8">{t('login.no_account', "You don't have an account?")}</p>
        <Link to={Routes.REGISTER} className="btn btn-outline-primary btn-xl width-100">
          {t('common.register', 'Register')}
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
