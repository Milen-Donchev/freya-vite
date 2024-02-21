import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  registrationWizardLogo,
  registrationContentWidth
} from './registration-wizard-layout.scss';

import { configGet } from '@freya/config';

import CloseWizardButton from './CloseWizardButton';
import AlreadyHaveProfilePartial from '../register/AlreadyHaveProfilePartial';
import RegistrationLogo from '@freya/components/registration/RegistrationLogo';

const RegistrationWizardLayout = () => {
  const logo = configGet('logo');

  return (
    <div className="d-flex flex-wrap min-vh-100 gap-0" data-testid="registration-wizard-layout">
      <div className="col-12 col-md-4 d-flex justify-content-center align-items-center flex-wrap order-2 order-md-1 bg-primary-200 p-32 p-md-48 rounded-top-4 rounded-top-md-0">
        <div className="d-flex justify-content-center text-center flex-fill width-100 d-none d-md-block align-self-end">
          <img src={logo} alt="logo" className={registrationWizardLogo} loading="lazy" />
        </div>
        <div className="d-flex width-100 align-self-end justify-content-center z-index-10">
          <AlreadyHaveProfilePartial />
        </div>
      </div>
      <div className="col-12 col-md-8 d-flex flex-column order-1 order-md-2 max-height-md-100vh overflow-auto">
        <div className="d-flex d-md-block align-items-center justify-content-between p-32 p-md-48">
          <RegistrationLogo className="d-md-none" />
          <CloseWizardButton data-testid="close-wizard-button" />
        </div>
        <div className="flex-grow-1">
          <div
            className={`${registrationContentWidth} d-flex flex-column height-100 px-32 px-md-48`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationWizardLayout;
