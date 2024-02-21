import React, { ChangeEvent, useState, useEffect } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import type { Meeting, ParticipantInfoProps, UpdateMeetingProps } from '@freya/types/meeting';
import type { Attachment } from '@freya/types/knowledgeCenter';

import {
  useLazyGetMeetingQuery,
  useUpdateMeetingMutation,
  useUpdateMeetingParticipantsInfoMutation,
  useUpdateParticipantsMutation
} from '@store/api/meetingApi';
import { Routes } from '@models/Routes';
import { Permissions } from '@models/Permissions';
import { useTranslation } from '@hooks/useTranslation';
import { useHasPermissions } from '@hooks/useHasPermissions';
import { useDisableBrowserBackButton } from '@hooks/useDisableBrowserBackButton';

import CardFrame from '@components/ui/frames/CardFrame';
import { useAuthStatus } from '@hooks/useAuthStatus';
import ScheduleAuthCard from '@components/schedules/ScheduleAuthCard';
import EditPersonalDataPopup from '@components/schedules/EditPersonalDataPopup';
import InlineMessage, { toastMessage } from '@components/ui/toast-message/InlineMessage';
import { CardFrameSkeleton, MeetingSkeleton } from '@components/schedules/ScheduleSkeletons';
import AdditionalScheduleInformation from '@components/schedules/AdditionalScheduleInformation';
import ScheduleAttachments from '@freya/components/schedules/ScheduleAttachments';

const SchedulePatientDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);
  const { isAuthenticated } = useAuthStatus();
  const { hasPermissions, isPermissionSellable } = useHasPermissions();

  const [getMeeting, { isLoading: isMeetingLoading }] = useLazyGetMeetingQuery();
  const [updateMeeting] = useUpdateMeetingMutation();
  const [
    updateMeetingParticipantsInfo,
    { error: errorParticipant, isLoading: isParticipantLoading }
  ] = useUpdateMeetingParticipantsInfoMutation();

  const [updateParticipants, { isLoading: isUpdateParticipantsLoading }] =
    useUpdateParticipantsMutation();

  const [description, setDescription] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<ParticipantInfoProps>();
  const [meeting, setMeeting] = useState<Meeting>();
  const [attachments, setAttachments] = useState<Partial<Attachment>[]>(
    get(meeting, 'attachments', [])
  );

  useDisableBrowserBackButton();

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStepForward = async () => {
    try {
      if (meeting) {
        const updatedMeeting = {
          description: description,
          start_date: meeting.start_date,
          end_date: meeting.end_date,
          type: meeting.type,
          status: meeting.status,
          payment_status: meeting.payment_status,
          attachments: attachments
        } as UpdateMeetingProps;

        await updateMeeting({ id: Number(id), meeting: updatedMeeting }).unwrap();

        const hasPermission = hasPermissions([Permissions.CREATE_MEETING]);
        const permissionIsSellable = isPermissionSellable(Permissions.CREATE_MEETING);

        if (hasPermission) {
          return navigate(Routes.MEETINGS);
        }
        if (!hasPermission && permissionIsSellable) {
          return navigate(`${Routes.PRODUCTS}?permission=${Permissions.CREATE_MEETING}`);
        }
      }
    } catch (error) {
      toastMessage(
        t('schedules.details_page_meeting_update_error', get(error, 'message')),
        'danger'
      );
    }
  };

  const handleToggleModalState = () => {
    setIsEditModalOpen((prev) => !prev);
  };

  const handleOnSubmit = async (formData: ParticipantInfoProps) => {
    try {
      await updateMeetingParticipantsInfo({
        id: Number(get(meeting, 'profile_participant.id')),
        body: {
          personal_info: {
            ...formData
          }
        }
      })
        .unwrap()
        .then(() => {
          setPersonalInfo(formData);
        });

      handleToggleModalState();
    } catch (error) {
      toastMessage(
        t('schedules.details_page_personal_data_update_error', get(error, 'message')),
        'danger'
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (isEmpty(meeting?.profile_participant)) {
          await updateParticipants({
            meetingId: Number(id),
            participants: [get(currentUser, 'id')]
          });
        }
      }

      const { data } = await getMeeting({ id }).unwrap();
      setMeeting(data);
      setPersonalInfo(get(meeting?.profile_participant, 'personal_info'));
      setDescription(get(data?.data, 'description'));
    };

    fetchData();
  }, [currentUser, meeting]);

  return (
    <div className="row mb-32 g-20">
      {isMeetingLoading || isUpdateParticipantsLoading ? (
        <>
          <MeetingSkeleton />
          <CardFrameSkeleton />
        </>
      ) : (
        <>
          <div className="col-12 col-lg-8">
            <CardFrame className="p-20 p-lg-40 position-relative">
              {!isAuthenticated ? (
                <ScheduleAuthCard />
              ) : (
                <>
                  <div>
                    <h3 className="mb-0">{t('schedules.details_page_title', 'Patient details')}</h3>
                    <p className="fs-16">
                      {t(
                        'schedules.details_page_automatically_filled_data_message',
                        'Automatically filled based on your profile data'
                      )}
                    </p>
                    <div className="mb-20">
                      <InlineMessage
                        type="info"
                        message={t(
                          'schedules.details_page_inline_message',
                          'If you are a companion, please replace the personal details with those of the patient'
                        )}
                      />
                    </div>
                    <div className="row row-cols-1 row-cols-xl-2 g-20">
                      <div className="col d-flex flex-column">
                        <p className="mb-12 fw-bold">
                          {t('schedules.details_page_personal_data', 'Personal data')}
                        </p>
                        <div className="d-flex justify-content-between gap-12 flex-grow-1 p-20 border border-primary-300 rounded-4">
                          <div>
                            <p className="mb-8">{get(personalInfo, 'title')}</p>
                            <p className="mb-8">{get(personalInfo, 'address')}</p>
                            <p className="mb-8">{get(personalInfo, 'email')}</p>
                            <p className="mb-8">{get(personalInfo, 'phone')}</p>
                          </div>
                          <button
                            className="btn btn-ghost-primary btn-icon"
                            onClick={handleToggleModalState}>
                            <i className="fa-light fa-pen-to-square fs-24" />
                          </button>
                        </div>
                      </div>
                      <div className="col d-flex flex-column">
                        <p className="mb-12 fw-bold">
                          {t('schedules.details_page_note', 'Booking note')}
                        </p>
                        <div className="form-floating width-100 flex-grow-1">
                          <textarea
                            className="form-control bg-tertiary-100 border-gray-200 min-height-16 height-100"
                            placeholder="Leave a description here"
                            value={description ?? ''}
                            onChange={handleDescriptionChange}
                          />
                          <label htmlFor="floatingTextarea2">
                            {t('schedules.details_page_description', 'Write a note if necessary')}
                          </label>
                        </div>
                      </div>
                      <div className="width-100 mt-20">
                        <ScheduleAttachments
                          attachments={attachments}
                          setAttachments={setAttachments}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="width-100 mt-20 text-end">
                    <button onClick={handleStepForward} className="btn btn-primary btn-lg">
                      {t('common.next', 'Напред')}
                    </button>
                  </div>
                </>
              )}
            </CardFrame>
          </div>
          <div className="col-12 col-lg-4">
            {meeting && (
              <CardFrame>
                <AdditionalScheduleInformation meeting={meeting} />
              </CardFrame>
            )}
          </div>
        </>
      )}

      {isEditModalOpen && meeting && (
        <EditPersonalDataPopup
          meeting={meeting}
          isLoading={isParticipantLoading}
          handleToggleModalState={handleToggleModalState}
          isEditModalOpen={isEditModalOpen}
          handleOnSubmit={handleOnSubmit}
          error={errorParticipant}
          size="lg"
        />
      )}
    </div>
  );
};

export default SchedulePatientDetails;
