import React from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import classNames from 'classnames';

import Can from '@freya/components/can/Can';
import SidebarButton from './SidebarButton';

import { type NavItem, navigationItems } from '../navigationItems';

interface SidebarNavigationProps {
  isSidebarExpanded: boolean;
}

const SidebarNavigation = (props: SidebarNavigationProps) => {
  const { isSidebarExpanded } = props;
  const SIDEBAR_NAVIGATION = navigationItems();

  return (
    <div
      className={classNames(
        'flex-grow-1',
        'd-flex',
        'flex-column',
        'justify-content-between',
        'overflow-auto',
        'custom-scrollbar'
      )}>
      <div>
        {map(
          filter(SIDEBAR_NAVIGATION, (item: NavItem) => item.placement === 'top'),
          (option) => (
            <Can permissions={option.permissions} key={option.id}>
              <SidebarButton navOption={option} isSidebarExpanded={isSidebarExpanded} />
            </Can>
          )
        )}
      </div>
      <div className="mt-48 mt-sm-0">
        {map(
          filter(SIDEBAR_NAVIGATION, (item: NavItem) => item.placement === 'bottom'),
          (option) => (
            <Can permissions={option.permissions} key={option.id}>
              <SidebarButton navOption={option} isSidebarExpanded={isSidebarExpanded} />
            </Can>
          )
        )}
      </div>
    </div>
  );
};

export default SidebarNavigation;
