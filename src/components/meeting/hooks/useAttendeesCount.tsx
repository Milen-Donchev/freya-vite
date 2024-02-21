import size from 'lodash/fp/size';
import useAttendees from './useAttendees';

export default () => {
  const attendees = useAttendees();

  return size(attendees);
};
