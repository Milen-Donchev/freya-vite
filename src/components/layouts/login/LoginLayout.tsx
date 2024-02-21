import React from 'react';
import { Outlet } from 'react-router-dom';

import { configGet } from '@freya/config';

import LanguageSwitcher from '@freya/components/ui/language-switcher/LanguageSwitcher';

import intro from './intro.svg';
import { loginLogo } from './login-layout.scss';

const LoginLayout = () => {
  const logo = configGet('logo');

  return (
    <div>
      <div className="d-flex flex-wrap min-vh-100 gap-0" data-testid="login-layout">
        <div className="col-12 col-md-6 col-lg-5 col-xl-4 order-2 order-md-1 bg-primary-200 d-flex justify-content-center p-32 p-md-48 rounded-top-4 rounded-top-md-0">
          <Outlet />
        </div>
        <div className="col-12 col-md-6 col-lg-7 col-xl-8 d-flex flex-column order-1 order-md-2">
          <div className="d-flex d-md-block width-100 align-items-center justify-content-between p-32 p-md-48">
            <div className="d-flex justify-content-end order-2 order-md-1">
              <div>
                <LanguageSwitcher />
              </div>
            </div>
            <div className="margin-auto text-md-center mt-md-48 order-1 order-md-2">
              <img src={logo} alt="logo" className={loginLogo} loading="lazy" />
            </div>
          </div>
          <div className="d-flex justify-content-center width-100 flex-fill align-items-end overflow-hidden position-relative">
            <img
              src={intro}
              alt="intro"
              className="width-50 width-md-auto height-auto height-md-100 position-md-absolute"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
