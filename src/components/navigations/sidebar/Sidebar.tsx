import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { configGet } from '@freya/config';
import { Routes } from '@freya/models/Routes';
import { Breakpoints } from '@models/Breakpoints';
import { useWindowDimensions } from '@hooks/useWindowDimensions';

import SidebarNavigation from './SidebarNavigation';
import SidebarExpandButton from './SidebarExpandButton';

import { sidebarBase, sidebarCollapsed, sidebarExpanded, sidebarLogo } from './sidebar.scss';

const Sidebar = () => {
  const { width } = useWindowDimensions();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(width > Breakpoints.XXL);
  const toggleSidebar = () => setIsSidebarExpanded((wasExpanded) => !wasExpanded);
  const logo = configGet('logo');
  const logoCollapsed = configGet('logoMobile');

  return (
    <div
      className={classNames(
        'd-none',
        'd-sm-flex',
        'flex-column',
        'position-sticky',
        'top-0',
        'bg-white',
        'shadow-sm',
        'smooth-transition',
        sidebarBase,
        {
          [sidebarExpanded]: isSidebarExpanded,
          [sidebarCollapsed]: !isSidebarExpanded
        }
      )}>
      <div className="position-relative px-28 py-36 text-center">
        <Link to={Routes.INDEX} className="d-block overflow-hidden">
          <img
            src={isSidebarExpanded ? logo : logoCollapsed}
            className={classNames('cursor-pointer', sidebarLogo)}
            data-testid="sidebar-logo"
          />
        </Link>
        <SidebarExpandButton isSidebarExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} />
      </div>
      <SidebarNavigation isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
};

export default Sidebar;
