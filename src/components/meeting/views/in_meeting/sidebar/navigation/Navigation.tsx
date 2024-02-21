import React from 'react';
import { useRosterState } from 'amazon-chime-sdk-component-library-react';
import compose from 'lodash/fp/compose';
import size from 'lodash/fp/size';
import keys from 'lodash/fp/keys';
import gt from 'lodash/fp/gt';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigation } from '@components/meeting/providers/NavigationProvider';
import { Navbar, NavbarItem } from './navbar';

const Navigation = () => {
  const { t } = useTranslation();
  const { showRoster, toggleRoster } = useNavigation();
  const { roster } = useRosterState();

  const attendeesCount = compose(size, keys)(roster);

  const showAttendeesBadge = gt(attendeesCount)(0);

  return (
    <Navbar>
      <NavbarItem
        badge={showAttendeesBadge && <small>{attendeesCount}</small>}
        icon={<i className="fa-light fa-user"></i>}
        label={t('inMeeting.navbar.attendeesLabel', 'Attendees')}
        selected={showRoster}
        onClick={toggleRoster}
      />
    </Navbar>
  );
};

export default Navigation;
