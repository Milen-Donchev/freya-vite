import React, { useState, ChangeEvent } from 'react';
import {
  useRosterState,
  useMeetingManager,
  useToggleLocalMute,
  Roster,
  RosterAttendee,
  RosterHeader,
  RosterGroup
} from 'amazon-chime-sdk-component-library-react';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import sortBy from 'lodash/fp/sortBy';
import { useTranslation } from '@hooks/useTranslation';
import { useNavigation } from '@components/meeting/providers/NavigationProvider';

const MeetingRoster = () => {
  const { t } = useTranslation();
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const { closeRoster } = useNavigation();
  const { muted } = useToggleLocalMute();
  const [searchFilter, setSearchFilter] = useState('');
  const adminRosterId = meetingManager?.meetingSessionConfiguration?.credentials?.attendeeId;
  let attendees = Object.values(roster);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const attendeeItems = flow(
    sortBy((a: any) => a?.chimeAttendeeId !== adminRosterId),
    map((attendeeItem) => {
      const { chimeAttendeeId, name } = attendeeItem || {};

      return (
        <RosterAttendee
          key={chimeAttendeeId}
          attendeeId={chimeAttendeeId}
          muted={muted}
          a11yMenuLabel={name}
        />
      );
    })
  )(attendees);

  return (
    <Roster>
      <RosterHeader
        searchValue={searchFilter}
        onSearch={handleSearch}
        onClose={closeRoster}
        title={t('inMeeting.roster.title', 'Attendees')}
      />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};

export default MeetingRoster;
