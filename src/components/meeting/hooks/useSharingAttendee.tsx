import { useContentShareState } from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import head from 'lodash/fp/head';
import split from 'lodash/fp/split';

export default () => {
  const { sharingAttendeeId } = useContentShareState();
  const sharedAttendeeId = compose(head, split('#'))(sharingAttendeeId);

  return {
    sharedAttendeeId
  };
};
