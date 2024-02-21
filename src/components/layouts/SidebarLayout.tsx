import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '../navigations/sidebar/Sidebar';
import PageHeader from '../navigations/header-navigation/PageHeader';
import MobileNavigation from '../navigations/mobile-navigation/MobileNavigation';

const SidebarLayout = () => {
  return (
    <div className="d-block d-sm-flex">
      <Sidebar />
      <MobileNavigation />
      <div className="d-flex flex-column flex-fill bg-primary-100 overflow-auto min-vh-100 px-16 px-sm-48 pt-120 pt-sm-0 pb-32 pb-sm-0">
        <PageHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
