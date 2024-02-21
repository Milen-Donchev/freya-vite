import React from 'react';
import { Outlet } from 'react-router-dom';

import { Breakpoints } from '@models/Breakpoints';
import { useWindowDimensions } from '@hooks/useWindowDimensions';

import MobileNavigation from '@freya/components/navigations/mobile-navigation/MobileNavigation';
import NavigationBar from '@freya/components/navigations/unauthenticated-navigation/NavigationBar';

interface NavbarLayoutProps {
  isGuestLoginAllowed: boolean;
}

const NavbarLayout = ({ isGuestLoginAllowed }: NavbarLayoutProps) => {
  const { width } = useWindowDimensions();
  const isMobileNavBar = width <= Breakpoints.SM;

  return (
    <>
      {isMobileNavBar ? <MobileNavigation /> : <NavigationBar />}
      <div className="d-flex flex-column pt-80 min-vh-100 bg-primary-100">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarLayout;
