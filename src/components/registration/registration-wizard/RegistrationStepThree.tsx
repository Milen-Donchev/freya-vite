import React, { memo } from 'react';

import { useTranslation } from '@hooks/useTranslation';

import RegistrationWizardHead from '@components/registration/registration-wizard/RegistrationWizardHead';
import RegistrationStepCounter from '@components/registration/registration-wizard/RegistrationStepCounter';
import UserConsents from '@components/user-consents/UserConsents';

const RegistrationStepThree = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex-grow-1 d-flex flex-column justify-content-center"
      data-testid="registration-step-three">
      <RegistrationStepCounter stepNumber="3" title={t('register.consent_title', 'Consent')} />
      <RegistrationWizardHead
        title={t('register.consent_use_personal_data', 'Consent for use of personal data')}
        subTitle={t(
          'register.consent_subtitle',
          'Sineo Med takes care of the security of your information!'
        )}
      />
      <UserConsents />
    </div>
  );
};

export default memo(RegistrationStepThree);
