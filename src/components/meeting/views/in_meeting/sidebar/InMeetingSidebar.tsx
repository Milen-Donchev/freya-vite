import React from 'react';
import Navigation from './navigation/Navigation';
import RosterTab from './roster_tab/RosterTab';
import { useNavigation } from '@components/meeting/providers/NavigationProvider';

const InMeetingSidebar = () => {
  const { showNavbar, showRoster } = useNavigation();

  return (
    <>
      {showNavbar && <Navigation />}
      {showRoster && <RosterTab />}
    </>
  );
};

export default InMeetingSidebar;
