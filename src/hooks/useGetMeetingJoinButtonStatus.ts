import { useEffect, useState } from 'react';

import { configGet } from '@freya/config';

const { startTimeBuffer, endTimeBuffer } = configGet('meetingActiveBtnDurationInMin');

export const useGetMeetingJoinButtonStatus = (start_date: string, end_date: string) => {
  const [isButtonActive, setIsButtonActive] = useState(false);

  const calculateIsButtonActive = () => {
    const minutesBeforeMeetingStart = startTimeBuffer * 60 * 1000; // time in milliseconds
    const currentTime = new Date().getTime();
    const meetingStartTime = new Date(start_date).getTime();
    const meetingEndTime = new Date(end_date).getTime();
    const endTime = endTimeBuffer * 60 * 1000 + meetingEndTime; // time in milliseconds
    return currentTime >= meetingStartTime - minutesBeforeMeetingStart && currentTime < endTime;
  };

  useEffect(() => {
    // Calculate the initial isButtonActive value when the component mounts
    setIsButtonActive(calculateIsButtonActive());

    // Update isButtonActive value when start_date changes
    const intervalId = setInterval(() => {
      setIsButtonActive(calculateIsButtonActive());
      // }, 60000); // Check every minute
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [calculateIsButtonActive]);

  return isButtonActive;
};
