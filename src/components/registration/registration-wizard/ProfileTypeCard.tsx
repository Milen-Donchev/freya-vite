import React from 'react';
import Skeleton from 'react-loading-skeleton';

import type { ProfileType } from '@freya/types/profile';

import { useTranslatedAttribute } from '@freya/hooks/useTranslatedAttribute';

import profileLogo from './assets/profile-img.svg';
import {
  profileStyles,
  profileStylesActive,
  registrationProfileLogo
} from './registration-wizard.scss';

interface ProfileTypeCardProps {
  profileType: ProfileType;
  selectedProfileType: ProfileType | null;
  onClick: () => void;
}

const ProfileTypeCard = (props: ProfileTypeCardProps) => {
  const { profileType, selectedProfileType, onClick } = props;
  const translate = useTranslatedAttribute();

  return (
    <div
      data-testid="profile-type-id"
      className={`${profileStyles} ${
        profileType.id === selectedProfileType?.id
          ? `${profileStylesActive} border-2`
          : 'non-active'
      } d-flex justify-content-center align-items-center flex-wrap border border-primary-500 rounded-5`}
      onClick={onClick}>
      <img
        src={profileLogo}
        alt="logo"
        className={`${registrationProfileLogo} mt-20 mb-16`}
        loading="lazy"
      />
      <p className="width-100 text-center fs-16 text-primary mb-20">
        {profileType?.name && translate(profileType.name)}
      </p>
    </div>
  );
};

export default ProfileTypeCard;

ProfileTypeCard.displayName = 'ProfileTypeCard';

ProfileTypeCard.Skeleton = function () {
  return (
    <>
      <Skeleton width={150} height={150} borderRadius={20} />
      <Skeleton width={150} height={150} borderRadius={20} />
      <Skeleton width={150} height={150} borderRadius={20} />
      <Skeleton width={150} height={150} borderRadius={20} />
      <Skeleton width={150} height={150} borderRadius={20} />
      <Skeleton width={150} height={150} borderRadius={20} />
    </>
  );
};
