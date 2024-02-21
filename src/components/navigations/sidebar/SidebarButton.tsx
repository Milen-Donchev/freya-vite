import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { isActiveNavItem } from '@utils/helpers';

import NotificationBadge from '@components/ui/notification-badge/NotificationBadge';

import { sidebarNavigationButton } from './sidebar.scss';

interface SidebarButtonProps {
  navOption: any; // TODO: Replace with actual type of navOption when it is defined and retrieved from Backend.
  isSidebarExpanded: boolean;
}

const SidebarButton = (props: SidebarButtonProps) => {
  const {
    navOption: { href, icon, title, count, childrenRoutes = [] },
    isSidebarExpanded
  } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div
      className={classNames(
        'd-flex',
        'align-items-center',
        'py-16',
        'position-relative',
        'px-24',
        'cursor-pointer',
        'smooth-transition',
        sidebarNavigationButton,
        {
          'justify-content-sm-center': !isSidebarExpanded,
          'bg-tertiary-300': isActiveNavItem(location.pathname, href, childrenRoutes)
        }
      )}
      onClick={handleClick}>
      <div className="d-flex align-items-center justify-content-center position-relative flex-fill text-primary-700">
        <i className={`fa-light fs-24 fa-fw ${icon} flex-shrink-0`} title={title} />
        <p
          className={classNames('m-0 ps-12 flex-fill d-block', {
            'd-sm-block': isSidebarExpanded,
            'd-sm-none': !isSidebarExpanded
          })}>
          {title}
        </p>
        {!!count && (
          <NotificationBadge
            count={count}
            className={!isSidebarExpanded ? 'position-absolute end-0 me-sm-n20' : ''}
          />
        )}
      </div>
    </div>
  );
};

export default SidebarButton;
