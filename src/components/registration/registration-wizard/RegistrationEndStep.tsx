import React, { memo } from 'react';
import { useDispatch } from 'react-redux';

import { useTranslation } from '@hooks/useTranslation';
import { useDisableBrowserBackButton } from '@hooks/useDisableBrowserBackButton';

import { configGet } from '@freya/config';
import { useAppSelector } from '@store';
import { resetTempAuth } from '@store/tempAuthSlice';
import { setAuthData, setIsRegistrationCompleted } from '@store/authSlice';

import RegistrationLogo from '@components/registration/RegistrationLogo';
import RegistrationWizardHead from '@components/registration/registration-wizard/RegistrationWizardHead';
import RegistrationWizardFooterNavigation from '@components/registration/registration-wizard/RegistrationWizardFooterNavigation';

import celebrationDesktop from './assets/celebration-desktop.svg';
import { registrationWizardLogo, registrationContentWidth } from './registration-wizard.scss';

const RegistrationEndStep = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tempAuthData = useAppSelector((store) => store.tempAuthSlice);
  const logo = configGet('logo');

  // A custom hook to disable the browser's back button functionality
  useDisableBrowserBackButton();

  const handleStepForward = () => {
    dispatch(setIsRegistrationCompleted(true));
    dispatch(setAuthData(tempAuthData));
    dispatch(resetTempAuth({}));
  };

  return (
    <div className="d-flex flex-wrap min-vh-100 gap-0">
      <div className="d-none d-md-flex col-12 col-md-4 d-flex justify-content-center align-items-center flex-wrap order-2 order-md-1 bg-primary-200 p-32 p-md-48 rounded-top-4 rounded-top-md-0">
        <div className="d-flex justify-content-center text-center flex-fill width-100 d-none d-md-block align-self-center">
          <img src={logo} alt="logo" className={registrationWizardLogo} loading="lazy" />
        </div>
      </div>
      <div className="col-12 col-md-8 d-flex flex-column order-1 order-md-2 max-height-md-100vh overflow-auto">
        <div className="d-flex d-md-block align-items-center justify-content-between p-32 p-md-48">
          <RegistrationLogo className="d-md-none" />
        </div>
        <div className="flex-grow-1">
          <div
            className={`${registrationContentWidth} d-flex flex-column height-100 px-32 px-md-48`}>
            <div className="d-flex flex-column height-100" data-testid="registration-end-step">
              <div className="text-center mt-32">
                <i className="fa-light fa-circle-check text-success-400 fs-80"></i>
              </div>
              <RegistrationWizardHead
                title={t('common.congratulations', 'Congratulations')}
                subTitle={t(
                  'register.succesfully_created_profile',
                  'You have successfully created your profile.'
                )}
                titleClassName="fs-32 fw-bold"
                subTitleClassName="fs-18"
              />
              <div className="text-center flex-grow-1 position-relative">
                <img
                  src={celebrationDesktop}
                  alt="celebration"
                  className="position-absolute height-100 translate-middle-x mw-100"
                />
              </div>
              <RegistrationWizardFooterNavigation
                handleStepForward={handleStepForward}
                activeStep={4}
                isForwardButtonDisabled={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(RegistrationEndStep);
