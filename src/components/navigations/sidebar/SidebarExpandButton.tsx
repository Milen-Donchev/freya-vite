import React from 'react';
import classNames from 'classnames';

interface SidebarExpandButtonProps {
  isSidebarExpanded: boolean;
  toggleSidebar: () => void;
}

const SidebarExpandButton = (props: SidebarExpandButtonProps) => {
  const { isSidebarExpanded, toggleSidebar } = props;

  return (
    <div
      onClick={toggleSidebar}
      className={classNames('position-absolute', 'top-50', 'start-100', 'translate-middle')}
      data-testid="expand-sidebar-button">
      <i
        className={classNames(
          'fa-light',
          'text-primary-500',
          'fs-28',
          'bg-white',
          'cursor-pointer',
          'rounded-circle',
          {
            'fa-circle-chevron-left': isSidebarExpanded,
            'fa-circle-chevron-right': !isSidebarExpanded
          }
        )}
      />
    </div>
  );
};

export default SidebarExpandButton;
