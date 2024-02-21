import React, { useCallback, useState } from 'react';

import type { ProfileType } from '@freya/types/profile';

import { useGetProfileTypesQuery } from '@store/api/profileApi';

import { useDisableBrowserBackButton } from '@hooks/useDisableBrowserBackButton';

import RegistrationStepOne from '@components/registration/registration-wizard/RegistrationStepOne';
import RegistrationStepTwo from '@components/registration/registration-wizard/RegistrationStepTwo';
import RegistrationStepThree from '@components/registration/registration-wizard/RegistrationStepThree';

const RegistrationWizard = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedProfileType, setSelectedProfileType] = useState<ProfileType | null>(null);

  const { data: profileTypes, isFetching } = useGetProfileTypesQuery({
    entity: 'user',
    registration_visibility: 1
  });

  const handleSetActiveWizardStep = useCallback((step: number) => setActiveStep(step), []);

  // A custom hook to disable the browser's back button functionality
  useDisableBrowserBackButton();

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
      default:
        return (
          <RegistrationStepOne
            profileTypes={profileTypes?.data ?? []}
            isLoading={isFetching}
            activeStep={activeStep}
            handleStepForward={() => handleSetActiveWizardStep(2)}
            handleStepBack={() => handleSetActiveWizardStep(1)}
            selectedProfileType={selectedProfileType}
            setSelectedProfileType={setSelectedProfileType}
          />
        );
      case 2:
        return (
          <RegistrationStepTwo
            selectedProfileType={selectedProfileType}
            handleStepForward={() => handleSetActiveWizardStep(3)}
            handleStepBack={() => handleSetActiveWizardStep(1)}
          />
        );
      case 3:
        return <RegistrationStepThree />;
    }
  };

  return renderStepContent(activeStep);
};

export default RegistrationWizard;
