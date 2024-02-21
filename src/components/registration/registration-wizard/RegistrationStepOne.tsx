import React, { memo, useCallback } from 'react';
import map from 'lodash/map';
import size from 'lodash/size';
import classNames from 'classnames';

import type { ProfileType } from '@freya/types/profile';

import { useTranslation } from '@hooks/useTranslation';

import ProfileTypeCard from './ProfileTypeCard';
import RegistrationWizardHead from './RegistrationWizardHead';
import RegistrationStepCounter from './RegistrationStepCounter';
import RegistrationWizardFooterNavigation from './RegistrationWizardFooterNavigation';

import { profileGrid, profileGrid1, profileGrid2 } from './registration-wizard.scss';

interface RegistrationStepOneProps {
  profileTypes: ProfileType[];
  isLoading: boolean;
  activeStep: number;
  handleStepForward: () => void;
  handleStepBack: () => void;
  selectedProfileType: ProfileType | null;
  setSelectedProfileType: React.Dispatch<React.SetStateAction<ProfileType | null>>;
}

const RegistrationStepOne = (props: RegistrationStepOneProps) => {
  const { t } = useTranslation();

  const {
    profileTypes,
    isLoading,
    activeStep,
    handleStepForward,
    handleStepBack,
    selectedProfileType,
    setSelectedProfileType
  } = props;

  const handleSelectProfileType = useCallback((profile: ProfileType) => {
    setSelectedProfileType(profile);
  }, []);

  return (
    <>
      <div className="flex-grow-1 d-flex flex-column justify-content-center">
        <RegistrationStepCounter stepNumber="1" title={t('common.profile', 'Profile')} />
        <RegistrationWizardHead
          title={t('register.choose_profile', 'Choose profile')}
          subTitle={t('register.choose_profile_type', 'Choose profile type')}
        />
        <div className="pt-32 pt-md-48">
          <div
            className={classNames(profileGrid, {
              [`${profileGrid1}`]: size(profileTypes) === 1,
              [`${profileGrid2}`]: size(profileTypes) === 2
            })}>
            {isLoading ? (
              <ProfileTypeCard.Skeleton />
            ) : (
              map(profileTypes, (profileType) => (
                <ProfileTypeCard
                  key={profileType.id}
                  profileType={profileType}
                  selectedProfileType={selectedProfileType}
                  onClick={() => handleSelectProfileType(profileType)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <RegistrationWizardFooterNavigation
        handleStepForward={handleStepForward}
        handleStepBack={handleStepBack}
        activeStep={activeStep}
        isForwardButtonDisabled={!selectedProfileType}
      />
    </>
  );
};

export default memo(RegistrationStepOne);
