import React, { useState } from 'react';
import get from 'lodash/get';
import classNames from 'classnames';

import type { CreateMeetingProps, Slot } from '@types';

import { formatTime } from '@utils/dateHelpers';
import { useTranslation } from '@hooks/useTranslation';
import { ConfirmationPopup } from '@components/ui/popup/ConfirmationPopup';

interface TimeSlotButtonProps {
  slot: Slot;
  profile_id: number;
  meetingType: string;
  selectedSlot: string;
  slotDate: Date;
  currentUser: any;
  scheduleDate: string;
  setMeeting: (value: React.SetStateAction<CreateMeetingProps | undefined>) => void;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string>>;
}

export interface SlotClickData {
  slotDateTime: string;
  meetingType: string;
  slot: Slot;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const {
    slot,
    scheduleDate,
    profile_id,
    slotDate,
    meetingType,
    currentUser,
    selectedSlot,
    setMeeting,
    setSelectedSlot
  } = props;

  const isBooked = get(slot, 'booked');
  const slotDateTime = `${slotDate.getDay()}${slotDate.getMonth()}${slotDate.getFullYear()}${
    slot.from
  }`;
  const isSlotSelected = selectedSlot === slotDateTime;

  const createIsoStringFromSlotString = (date: string, slot: string) => {
    const [hours, minutes] = slot.split(':');
    const scheduleDate = new Date(date);
    scheduleDate.setUTCHours(parseInt(hours, 10));
    scheduleDate.setUTCMinutes(parseInt(minutes, 10));
    scheduleDate.setUTCSeconds(0, 0);

    return scheduleDate.toISOString();
  };

  const handleParseTimeStringToLocalDateTime = (timeUtc: string) => {
    const [hours, minutes] = timeUtc.split(':');
    const utcDate = new Date();
    utcDate.setUTCHours(parseInt(hours, 10));
    utcDate.setUTCMinutes(parseInt(minutes, 10));

    // converted and formatted to local time
    return formatTime(new Date(utcDate));
  };

  const handleSlotClick = () => {
    const start_date = createIsoStringFromSlotString(scheduleDate, slot?.from);
    const end_date = createIsoStringFromSlotString(scheduleDate, slot?.to);

    setMeeting({
      profile_id: profile_id,
      type: meetingType,
      start_date: start_date,
      end_date: end_date,
      participants: get(currentUser, 'id') ? [get(currentUser, 'id')] : []
    });
    setSelectedSlot(slotDateTime);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    handleSlotClick();
    setShowPopup(false);
  };

  return (
    <>
      <div className="col">
        <button
          disabled={isBooked}
          className={classNames('btn btn-outline-primary fs-14 fw-bold rounded-2 p-12 width-100', {
            'bg-primary-200': !!isSlotSelected,
            'bg-gray-200 border-0': isBooked
          })}
          onClick={handleShowPopup}>
          {handleParseTimeStringToLocalDateTime(slot?.from)}
        </button>
      </div>
      {/* CONFIRMATION POPUP */}
      <ConfirmationPopup
        show={showPopup}
        onHide={handleHidePopup}
        onConfirm={handleConfirm}
        size="sm"
        title={t('meeting.time_slot_confirmation', 'Slot time confirmation')}
        body={t('meeting.time_slot_confirmation_description', 'Are you sure?')}
      />
    </>
  );
};

export default TimeSlotButton;
