import React, { useState } from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import { useNavigate, useParams } from 'react-router-dom';

import type { CreateMeetingProps } from '@freya/types/meeting';

import { getImage } from '@utils/helpers';
import { useTranslation } from '@hooks/useTranslation';
import { useGetProfileQuery } from '@store/api/profileApi';
import { useCreateMeetingMutation } from '@store/api/meetingApi';

import CardFrame from '@components/ui/frames/CardFrame';
import ProfileCard from '@components/ui/profile/ProfileCard';
import ForwardButton from '@components/ui/buttons/ForwardButton';
import ScheduleCalendar from '@components/schedules/ScheduleCalendar';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';

const ProfileSchedule = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery({
    id: id
  });
  const [createMeeting] = useCreateMeetingMutation();
  const [meeting, setMeeting] = useState<CreateMeetingProps>();

  const handleCreateMeeting = async () => {
    if (meeting) {
      try {
        const response = await createMeeting(meeting).unwrap();
        const meetingId = get(response, 'id');

        navigate(`/meeting-save/${meetingId}`);
      } catch (error) {
        toastMessage(
          t(
            'schedules.create_meeting_error',
            'An unexpected error occurred while attempting to create meeting'
          ),
          'danger'
        );
      }
    }
  };

  return (
    <CardFrame className="p-20 p-lg-40 mb-32">
      <ProfileCard
        image={getImage(profile?.data?.image, 'source')}
        title={get(profile?.data, 'title')}
        subTitle={get(profile?.data?.features, 'speciality')}
        isLoading={isProfileLoading}
        className="gap-12 gap-md-32"
        titleSize="fs-18 fs-md-28"
        imageSize="width-10 height-10 width-md-16 height-md-16"
      />
      <div className="mt-24">
        <p className="fs-24 fw-bold">{t('schedules.title', 'Schedule an online appointment')}</p>
        <p className="fw-bold">
          {t('schedules.date_and_time_selection', 'Choose a date and time:')}
        </p>
      </div>
      <div className="col-12 col-xxl-8">
        <ScheduleCalendar profile_id={Number(id)} meeting={meeting} setMeeting={setMeeting} />
        <div className="text-center mt-24">
          <ForwardButton
            handleStepForward={handleCreateMeeting}
            isForwardButtonDisabled={isUndefined(meeting)}
          />
        </div>
      </div>
    </CardFrame>
  );
};

export default ProfileSchedule;
