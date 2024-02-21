import React from 'react';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';

import type { Profile } from '@freya/types/profile';

import { getImage } from '@utils';
import { useTranslation } from '@hooks/useTranslation';

import ProfileCard from '@components/ui/profile/ProfileCard';
import AppointmentButton from '@components/ui/buttons/AppointmentButton';

interface ScheduleProfileCardProps {
  profile: Profile;
}

const ScheduleProfileCard = (props: ScheduleProfileCardProps) => {
  const { id, title, image, slug, features } = props?.profile;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${id}/${slug}/schedule`);
  };

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap gap-16 width-100 shadow-sm border border-primary-300 rounded-4 p-20">
      <ProfileCard
        image={image ? getImage(image, 'thumb') : ''}
        title={title ?? ''}
        imageSize="width-8 height-8"
        subTitle={get(features, 'speciality', '')}
        className="gap-16"
      />
      <AppointmentButton
        className="btn btn-outline-primary btn-lg width-100 width-lg-auto flex-shrink-0"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default ScheduleProfileCard;
