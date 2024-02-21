import React from 'react';
import get from 'lodash/get';
import { format } from 'date-fns';
import { bg } from 'date-fns/locale';

import type { Meeting } from '@freya/types/meeting';
import { getImage } from '@utils/helpers';

import CardFrame from '@components/ui/frames/CardFrame';
import ProfileCard from '@components/ui/profile/ProfileCard';

interface AdditionalScheduleInformationProps {
  meeting: Meeting;
}

const AdditionalScheduleInformation = (props: AdditionalScheduleInformationProps) => {
  const { meeting } = props;

  const formattedDate = meeting
    ? format(new Date(meeting?.start_date), 'EEEE, dd.MM.yy, HH:mm', { locale: bg })
    : null;

  return (
    <CardFrame>
      <div className="p-20 bg-quarterly-200 rounded-3">
        <ProfileCard
          image={meeting?.profile?.image ? getImage(meeting?.profile?.image, 'thumb') : ''}
          title={get(meeting?.profile, 'title')}
          additionalInfo={meeting?.type_title}
          imageSize="width-8 height-8"
          subTitle={get(meeting?.profile?.features?.speciality, 'value')}
          className="gap-16"
        />
      </div>
      <div className="p-24">
        <div className="d-flex align-items-center">
          <i className="fa-light fa-calendar fs-20 text-primary bg-primary-200 p-18 me-12 rounded-circle"></i>
          <p className="mb-0">{formattedDate}</p>
        </div>
      </div>
      {/* <div className="ps-24 pt-12 pb-12 d-flex flex-column align-items-baseline justify-content-start flex-wrap align-items-center">
    <p className="width-100 fw-semibold">
      {t('schedules.details_page_details', 'Details')}
    </p>

    <div className="d-flex align-items-center mt-16">
      <i className="fa-thin fa-stethoscope text-primary-600 bg-primary-200 p-12 me-12 rounded-circle"></i>
      <div className="d-flex flex-column">
        <p className="mb-0 fs-14">
          {t('schedules.details_page_reason_for_examination', 'Reason for Examination')}
        </p>
        <p className="mb-0 fs-16 fs-md-18 fw-semibold">Primary Examination</p>
      </div>
    </div>

    <div className="d-flex align-items-center mt-16">
      <i className="fa-thin fa-credit-card text-primary-600 bg-primary-200 p-12 me-12 rounded-circle"></i>
      <div className="d-flex flex-column">
        <p className="mb-0 fs-14">
          {t('schedules.details_page_payment_price', 'Payment Price')}
        </p>
        <p className="mb-0 fs-16 fw-semibold">60</p>
      </div>
    </div>

    <div className="d-flex align-items-center mt-16">
      <i className="fa-thin fa-credit-card text-primary-600 bg-primary-200 p-12 me-12 rounded-circle"></i>
      <div className="d-flex flex-column">
        <p className="mb-0 fs-16 fw-semibold">
          {t('schedules.details_page_online_by_card', 'Online by Card')}
        </p>
      </div>
    </div>
  </div> */}
    </CardFrame>
  );
};

export default AdditionalScheduleInformation;
