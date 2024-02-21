import { useMeetingManager, useRosterState } from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
import get from 'lodash/fp/get';
import isEqual from 'lodash/fp/isEqual';
import negate from 'lodash/fp/negate';
import values from 'lodash/fp/values';

export default () => {
  const meetingManager = useMeetingManager();
  const currentRosterId = meetingManager?.meetingSessionConfiguration?.credentials?.attendeeId;
  const { roster } = useRosterState();
  const attendees = values(roster);

  return filter(compose(negate(isEqual(currentRosterId)), get('chimeAttendeeId')))(attendees);
};
