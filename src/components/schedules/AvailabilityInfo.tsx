import React from 'react';

import { useTranslation } from '@hooks/useTranslation';
import { formatDate, formatTime } from '@utils/dateHelpers';

interface AvailabilityInfoProps {
  nextAvailableSlot: string;
  onStartDateChange: (date: Date) => void;
}

const AvailabilityInfo = (props: AvailabilityInfoProps) => {
  const { nextAvailableSlot, onStartDateChange } = props;
  const { t } = useTranslation();

  const handleStartDateClick = () => {
    onStartDateChange(new Date(nextAvailableSlot));
  };

  return (
    <div className="d-flex justify-content-center align-items-center width-100 height-24 position-relative">
      <div
        onClick={nextAvailableSlot ? handleStartDateClick : undefined}
        className="position-absolute top-25 cursor-pointer">
        <div className="d-flex justify-content-center p-sm-20">
          <div className="d-flex justify-content-center align-items-center shadow-sm rounded-4 px-16 py-8">
            <i className="fa-light fa-calendar p-12 rounded-5 fs-24 text-primary bg-primary-200 me-8" />
            <div className="flex-column">
              {!nextAvailableSlot ? (
                <p className="mb-0">
                  {t('schedules.no_available_hours', 'There are no available hours')}
                </p>
              ) : (
                <>
                  <p className="m-0 fs-12">
                    {t('schedules.available_time', 'Earliest available time:')}
                  </p>
                  <p className="m-0 text-primary">
                    {formatDate(new Date(nextAvailableSlot))}
                    <span className="px-2">{t('schedules.in_time', 'in')}</span>
                    {formatTime(new Date(nextAvailableSlot))}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityInfo;
