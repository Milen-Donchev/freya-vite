import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';

interface AppointmentButtonProps {
  onClick?: () => void;
  className?: string;
}

const AppointmentButton = (props: AppointmentButtonProps) => {
  const { className = 'btn btn-quarterly btn-lg', onClick } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleScheduleListingNavigate = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(Routes.PROFILE_LISTING_SCHEDULES);
  };

  return (
    <button
      className={className}
      data-testid="book-an-appointment-btn"
      onClick={handleScheduleListingNavigate}>
      {t('header-navigation.book_appointment', 'Book an Appointment')}
    </button>
  );
};

export default memo(AppointmentButton);
