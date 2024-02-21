import { useActiveSpeakersState } from 'amazon-chime-sdk-component-library-react';
import includes from 'lodash/fp/includes';

export default (attendeeId: any) => {
  const activeSpeakerIds = useActiveSpeakersState();
  return includes(attendeeId)(activeSpeakerIds);
};
