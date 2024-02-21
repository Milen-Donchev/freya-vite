import { useState, useEffect } from 'react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { useLogger, useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import get from 'lodash/fp/get';
import isNil from 'lodash/fp/isNil';
import { useJoinMeetingMutation } from '@store/api/joinMeetingApi';

export default ({ meetingId }: any) => {
  const meetingManager = useMeetingManager();
  const logger = useLogger();
  const [joined, setJoined] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);

  const [joinInfo, { data: joinInfoData }] = useJoinMeetingMutation();

  const joinChimeMeeting = () => {
    setJoining(true);
    joinInfo(meetingId);
  };

  useEffect(() => {
    const joinChimeMeetingByInfo = (info: any) => {
      if (isNil(info)) return;
      try {
        // use the join API to create a meeting session
        // potentially configure the MeetingSessionConfiguration here
        // see: https:aws.github.io/amazon-chime-sdk-component-library-react/?path=/story/migration-to-v3--page
        // initialize the `MeetingSessionConfiguration`
        const sessionConfiguration = new MeetingSessionConfiguration(
          get('chimeMeetingInfo.meeting')(info),
          get('chimeMeetingInfo.attendee')(info)
        );

        meetingManager
          .join(sessionConfiguration)
          .then(() => {
            setJoined(true);
            setJoining(false);
          })
          .catch((error: any) => {
            logger.error(`error joining chime meeting: ${error}`);
            setJoined(false);
            setJoining(false);
            return error;
          });
      } catch (error: any) {
        logger.error(`error in meetingManager.join: ${error.message}`);
        setJoining(false);
        setJoined(false);
        throw error;
      }
    };

    if (joinInfoData) {
      joinChimeMeetingByInfo(joinInfoData);
    }
  }, [joinInfoData, meetingManager]);

  return {
    joinChimeMeeting,
    joining,
    joined,
    setJoining,
    setJoined
  };
};
