import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import map from 'lodash/map';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { format } from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import { bg } from 'date-fns/locale';
import capitalize from 'lodash/capitalize';
import isUndefined from 'lodash/isUndefined';
import Skeleton from 'react-loading-skeleton';
import { LogLevel } from 'amazon-chime-sdk-js';
import { LoggerProvider, MeetingProvider } from 'amazon-chime-sdk-component-library-react';

import type { CreateMeetingProps, UpdateMeetingProps } from '@freya/types/meeting';

import {
  useCancelMeetingMutation,
  useGetMeetingQuery,
  useUpdateMeetingMutation
} from '@store/api/meetingApi';
import { Routes } from '@models/Routes';
import { useTranslation } from '@hooks/useTranslation';
import { getImage } from '@utils/helpers';
import { useGetMeetingJoinButtonStatus } from '@hooks/useGetMeetingJoinButtonStatus';

import CardFrame from '@components/ui/frames/CardFrame';
import ProfileCard from '@components/ui/profile/ProfileCard';
import ContentFrame from '@components/ui/frames/ContentFrame';
import ResourceBox from '@freya/components/upload/ResourceBox';

import ScheduleCalendar from '@components/schedules/ScheduleCalendar';
import JoinMeetingButton from '@components/meeting/JoinMeetingButton';
import { toastMessage } from '@components/ui/toast-message/InlineMessage';
import { ConfirmationPopup } from '@components/ui/popup/ConfirmationPopup';
import MeetConsoleLogger from '@components/meeting/logger/MeetConsoleLogger';
import DeviceSettingsProvider from '@components/meeting/providers/DeviceSettingsProvider';

const MeetingDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: meeting, isLoading } = useGetMeetingQuery({ id });
  const [updateMeeting] = useUpdateMeetingMutation();

  const [meetingPopupState, setMeetingPopupState] = useState<boolean>(false);
  const [cancelMeetingPopupState, setCancelMeetingPopupState] = useState<boolean>(false);
  const [meetingData, setMeetingData] = useState<CreateMeetingProps | undefined>(meeting?.data);

  const formattedDateTime = !isUndefined(meeting)
    ? format(new Date(meeting?.data?.start_date), 'EEEE, dd.MM.yy, HH:mm', {
        locale: bg
      }).split(', ')
    : null;

  const [cancelMeeting] = useCancelMeetingMutation();
  const isButtonActive = useGetMeetingJoinButtonStatus(
    meeting?.data?.start_date,
    meeting?.data?.end_date
  );

  const meetLogger = new MeetConsoleLogger({
    name: 'common',
    level: LogLevel.INFO,
    metadata: {
      appName: 'Sineo'
    }
  });

  const triggerCancelMeeting = () => {
    setCancelMeetingPopupState(true);
  };

  const toggleMeetingPopupState = () => {
    setMeetingPopupState((prev) => !prev);
  };

  const handleUpdateMeeting = async () => {
    try {
      const updatedMeeting = {
        ...meeting?.data,
        start_date: meetingData?.start_date,
        end_date: meetingData?.end_date
      } as UpdateMeetingProps;

      await updateMeeting({ id: Number(meeting?.data?.id), meeting: updatedMeeting }).unwrap();

      toastMessage(
        t('meeting.meeting_update_success', 'You successfully updated the meeting info'),
        'success'
      );

      setMeetingPopupState(false);
    } catch (error) {
      toastMessage(t('common.unexpected_error', 'An unexpected error occurred!'), 'danger');
    }
  };

  const handleHidePopup = () => {
    setCancelMeetingPopupState(false);
  };

  const handleCancelMeeting = () => {
    if (isNil(meeting)) return;

    cancelMeeting(meeting.data.id).then(() => {
      toastMessage(
        t('meeting.meeting_update_success', 'You successfully canceled the meeting'),
        'success'
      );
      navigate(Routes.MEETINGS);
    });
    setCancelMeetingPopupState(false);
  };

  return (
    <div>
      {isLoading ? (
        <MeetingDetailsSkeleton />
      ) : (
        <div className="d-flex flex-column gap-20">
          <CardFrame className="bg-white">
            <div className="row row-cols-1 row-cols-lg-2 d-flex justify-content-between py-8 px-12">
              <div className="d-flex">
                <ProfileCard
                  image={getImage(meeting?.data?.profile?.image, 'thumb')}
                  title={get(meeting?.data?.profile, 'title')}
                  additionalInfo={meeting?.data?.type_title}
                  imageSize="width-8 height-8"
                  subTitle={get(meeting?.data?.profile?.features?.speciality, 'value')}
                  className="gap-16 p-20 bg-quarterly-200 rounded-3 flex-grow-1 flex-lg-grow-0"
                />
              </div>
              <div className="d-flex align-items-center flex-wrap">
                <div className="col-12 col-md-6 d-flex align-items-center py-18 py-lg-0">
                  <i className="fa-light fa-calendar fs-20 text-white bg-quarterly p-18 me-12 rounded-circle"></i>
                  {formattedDateTime && (
                    <div>
                      <p className="mb-0 text-nowrap">
                        {capitalize(formattedDateTime[0])} {formattedDateTime[1]}
                      </p>
                      <p className="mb-0 w-full">{formattedDateTime[2]}</p>
                    </div>
                  )}
                </div>
                <div className="col-12 col-xl-6 py-12 py-lg-0 px-16">
                  {meeting && (
                    <LoggerProvider logger={meetLogger}>
                      <MeetingProvider>
                        <DeviceSettingsProvider>
                          <JoinMeetingButton
                            meetingId={meeting?.data?.profile_participant.meeting_id.toString()}
                            className={'width-100'}
                            disabled={!isButtonActive}
                          />
                        </DeviceSettingsProvider>
                      </MeetingProvider>
                    </LoggerProvider>
                  )}
                </div>
              </div>
            </div>
          </CardFrame>
          <div className="row row-cols-1 row-cols-md-2 g-20">
            <div className="col h-100">
              <CardFrame className="bg-white py-32 px-40 height-100">
                <p className="fs-24">{t('meeting.patient_data', 'Patient data')}</p>

                <div className="row row-cols-1 row-cols-md-2 g-20">
                  <div className="col">
                    <p className="fs-14 text-gray-300 mb-0">{t('meeting.patient_name', 'Name')}</p>
                    <p className="fs-16">
                      {get(meeting, 'data.profile_participant.personal_info.title')}
                    </p>
                  </div>

                  <div className="col">
                    <p className="fs-14 text-gray-300 mb-0">
                      {t('meeting.patient_email', 'Email')}
                    </p>
                    <p className="fs-16">
                      {get(meeting, 'data.profile_participant.personal_info.email')}
                    </p>
                  </div>

                  <div className="col">
                    <p className="fs-14 text-gray-300 mb-0">
                      {t('meeting.patient_address', 'Address')}
                    </p>
                    <p className="fs-16">
                      {get(meeting, 'data.profile_participant.personal_info.address')}
                    </p>
                  </div>

                  <div className="col">
                    <p className="fs-14 text-gray-300 mb-0">
                      {t('meeting.patient_phone', 'Phone')}
                    </p>
                    <p className="fs-16">
                      {get(meeting, 'data.profile_participant.personal_info.phone')}
                    </p>
                  </div>
                </div>
              </CardFrame>
            </div>
            <div className="col d-flex">
              <CardFrame className="flex-grow-1 bg-white py-32 px-40">
                <p className="fs-24">{t('meeting.patient_notes', 'Notes')}</p>
                <p>{get(meeting, 'data.description')}</p>
              </CardFrame>
            </div>
          </div>

          <ContentFrame
            className="p-20 p-lg-40"
            isLoading={isLoading}
            contentVisible={!isEmpty(meeting?.data?.attachments)}
            Header={
              <p className="fs-24">
                {t('meeting.documents_and_reserch', 'Documents and research')}
              </p>
            }
            children={
              <div className="d-flex gap-12 flex-wrap justify-content-center justify-content-md-start">
                {map(meeting?.data?.attachments, ({ id, name, resource_type, path, size }) => (
                  <div key={id} className="position-relative width-100 width-lg-auto">
                    <ResourceBox
                      filename={name}
                      path={path}
                      resource_type={resource_type}
                      size={size}
                      className="flex-xxl-column"
                      forceMobileVariant
                    />
                  </div>
                ))}
              </div>
            }
          />

          <div className="d-flex justify-content-center justify-content-sm-end flex-wrap gap-12 mb-36">
            <button
              className="btn btn-outline-primary fs-14 width-100 width-sm-auto"
              onClick={toggleMeetingPopupState}
              data-testid="change-meeting-date-time">
              {t('meeting.edit_date_time', 'Change date/time')}
            </button>
            <button
              className="btn btn-outline-danger fs-14 width-100 width-sm-16"
              data-testid="cancel-meeting"
              onClick={triggerCancelMeeting}>
              {t('common.cancel', 'Cancel')}
            </button>
          </div>

          {/* CONFIRMATION POPUP */}
          <ConfirmationPopup
            show={cancelMeetingPopupState}
            onHide={handleHidePopup}
            onConfirm={handleCancelMeeting}
            size="sm"
            title={t('meeting.cancel_meeting_popup_title', 'Cancel meeting')}
            body={t(
              'meeting.cancel_meeting_popup_body',
              'Are you sure you want to cancel the meeting?'
            )}
          />

          {/* CHANGE MEETING DATE/TIME CONFIRMATION POPUP */}
          <ConfirmationPopup
            show={meetingPopupState}
            onHide={toggleMeetingPopupState}
            onConfirm={handleUpdateMeeting}
            size="lg"
            title={t('meeting.change_date_time_meeting_popup_title', 'Change date/time')}
            body={
              <div className="col-12">
                <ScheduleCalendar
                  profile_id={Number(meeting?.data?.profile_id)}
                  meeting={meetingData}
                  setMeeting={setMeetingData}
                />
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

const MeetingDetailsSkeleton = () => {
  return (
    <div>
      <div className="d-flex flex-column gap-20">
        <div className="bg-white rounded-3">
          <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-between px-16 py-8">
            <div className="d-flex">
              <Skeleton circle={true} width={100} height={100} />
              <div className="gap-16 p-20 bg-quarterly-200 rounded-3 flex-grow-1 flex-md-grow-0">
                <Skeleton width={200} height={20} />
                <Skeleton width={150} height={15} />
                <Skeleton width={100} height={15} />
              </div>
            </div>
            <div className="d-flex justify-content-start justify-content-md-end p-24">
              <Skeleton width={200} height={20} />
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 g-20 rounded-3">
          <div className="col">
            <div className="bg-white py-32 px-40 rounded-3">
              <Skeleton width={200} height={30} />
              <div className="row row-cols-1 row-cols-md-2 g-20">
                <div className="col">
                  <Skeleton width={150} height={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="flex-grow-1 bg-white py-32 px-40 rounded-3">
              <Skeleton width={'100%'} height={30} />
              <Skeleton count={5} />
            </div>
          </div>
        </div>
        <div className="bg-white py-32 px-40 rounded-3">
          <Skeleton width={200} height={30} />
          <div className="row row-cols-1 row-cols-lg-2 g-20">
            <div className="position-relative">
              <Skeleton width={'100%'} height={100} />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-12 rounded-3">
          <Skeleton width={150} height={40} borderRadius={20} />
          <Skeleton width={100} height={40} borderRadius={20} />
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
