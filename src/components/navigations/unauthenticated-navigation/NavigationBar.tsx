import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { configGet } from '@freya/config';
import { useTranslation } from '@hooks/useTranslation';

import LanguageSwitcher from '@components/ui/language-switcher/LanguageSwitcher';

const NavigationBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logo = configGet('logo');

  return (
    <nav
      className="d-none d-sm-flex justify-content-between align-items-center fixed-top bg-white px-32 py-20 shadow-sm"
      data-testid="navigation-bar">
      <div>
        <a href="/">
          <img src={logo} alt="sineo_logo" loading="lazy" className="width-16" />
        </a>
      </div>
      <ul className="d-flex align-items-center gap-12 list-unstyled m-0">
        <li>
          <button
            className="btn btn-ghost-primary btn-lg"
            data-testid="login-button"
            onClick={() => navigate(Routes.LOGIN)}>
            {t('common.login', 'Login')}
          </button>
        </li>
        <li>
          <button
            className="btn btn-primary btn-lg"
            data-testid="register-button"
            onClick={() => navigate(Routes.REGISTER)}>
            {t('common.register', 'Register')}
          </button>
        </li>
        <li className="ms-16">
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
