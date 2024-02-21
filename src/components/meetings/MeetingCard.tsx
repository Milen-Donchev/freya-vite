/* istanbul ignore file */
import React from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import isNill from 'lodash/isNil';
import filter from 'lodash/filter';
import capitalize from 'lodash/capitalize';
import { LogLevel } from 'amazon-chime-sdk-js';
import { useNavigate } from 'react-router-dom';
import { LoggerProvider, MeetingProvider } from 'amazon-chime-sdk-component-library-react';

import type { Meeting, ParticipantProfile } from '@types';

import { configGet } from '@freya/config';
import { getImage } from '@utils/helpers';
import { useLocale } from '@hooks/useLocale';
import { Routes } from '@freya/models/Routes';
import { formatDateTime } from '@utils/dateHelpers';
import { useTranslation } from '@hooks/useTranslation';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';
import { useGetMeetingJoinButtonStatus } from '@hooks/useGetMeetingJoinButtonStatus';

import MeetingModal from '@components/meeting/MeetingModal';
import JoinMeetingButton from '@components/meeting/JoinMeetingButton';
import MeetingProfileCard from '@components/meetings/MeetingProfileCard';
import MeetConsoleLogger from '@components/meeting/logger/MeetConsoleLogger';
import DeviceSettingsProvider from '@components/meeting/providers/DeviceSettingsProvider';

interface MeetingProps {
  meeting: Meeting;
  pastMeeting?: boolean;
}

const MeetingCard = (props: MeetingProps) => {
  const { meeting, pastMeeting = false } = props;
  const {
    title,
    type_title,
    profile,
    profile_participant,
    start_date,
    end_date,
    participants,
    profile_id
  } = meeting;

  const { startTimeBuffer } = configGet('meetingActiveBtnDurationInMin');
  const translate = useTranslatedAttribute();
  const { t, tChoice } = useTranslation();
  const { locale } = useLocale();
  const navigate = useNavigate();
  const isButtonActive = useGetMeetingJoinButtonStatus(start_date, end_date);

  const meetLogger = new MeetConsoleLogger({
    name: 'common',
    level: LogLevel.INFO,
    metadata: {
      appName: 'Sineo'
    }
  });

  const isMeetingOwnerLoggedIn = profile_id === profile_participant.profile_id;

  const filteredParticipants = filter(
    participants,
    (participant: ParticipantProfile) => participant.profile_id !== profile_id
  );

  const weekDay = capitalize(new Date(start_date).toLocaleDateString(locale, { weekday: 'long' }));
  const speciality = get(profile.features?.speciality, 'value') ?? null;

  const handleProfileNavigate = (id: number, slug: string) => {
    navigate(`${Routes.BASE_PROFILE}/${id}/${slug}`);
  };

  const handleMeetingDetails = () => {
    if (get(meeting, 'id')) {
      navigate(`/meeting-details/${meeting?.id}`);
    }
  };

  return (
    <div className="d-flex flex-column flex-fill bg-white rounded-4 shadow-sm height-100">
      <div className="bg-quarterly-100 px-28 py-20 rounded-4">
        <div className="d-flex flex-column gap-18">
          {isMeetingOwnerLoggedIn && (
            <p className="m-0 fw-bold mb-0 text-center">{translate(title)}</p>
          )}
          {!isMeetingOwnerLoggedIn && (
            <MeetingProfileCard
              image={profile.image ? getImage(profile.image, 'thumb') : ''}
              meeting_type={translate(type_title)}
              meeting_type_color="text-quarterly"
              title={profile.title}
              subTitle={speciality ? translate(speciality) : ''}
              imageSize={'width-8 height-8'}
            />
          )}
          {!pastMeeting && (
            <div>
              <LoggerProvider logger={meetLogger}>
                <MeetingProvider>
                  <DeviceSettingsProvider>
                    <JoinMeetingButton
                      meetingId={profile_participant.meeting_id.toString()}
                      className={'width-100'}
                      disabled={!isButtonActive}
                    />
                    <MeetingModal />
                  </DeviceSettingsProvider>
                </MeetingProvider>
              </LoggerProvider>

              <p className="fs-12 text-center mb-0 mt-12">
                {tChoice(
                  'meeting.join_active_time',
                  startTimeBuffer,
                  'The button will be active :count minutes before the meeting.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-column flex-fill gap-20 px-28 py-20">
        <div className="d-flex align-items-center gap-16 width-100">
          <div className="rounded-circle bg-primary-200 width-6 height-6 p-16 d-flex justify-content-center align-items-center flex-shrink-0">
            <i className="fa-light fa-calendar fs-24" />
          </div>
          <p className="fw-bold fs-18 mb-0">{`${weekDay}, ${formatDateTime(start_date)} `}</p>
        </div>
        <div className="flex-fill">
          <p>
            {map(
              filteredParticipants,
              ({ personal_info, profile }: ParticipantProfile, index: number) => (
                <span
                  key={index}
                  onClick={() =>
                    !isNill(profile?.id) &&
                    profile.slug &&
                    handleProfileNavigate(profile.id, profile.slug)
                  }
                  className="cursor-pointer">
                  {personal_info.title}
                  {index < filteredParticipants.length - 1 && ', '}
                </span>
              )
            )}
          </p>
        </div>

        <button className="btn btn-outline-primary width-100" onClick={handleMeetingDetails}>
          {t('meeting.meeting_details', 'Meeting details')}
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
