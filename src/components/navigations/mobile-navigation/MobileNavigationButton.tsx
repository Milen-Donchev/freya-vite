import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { NavItem } from '../navigationItems';

import { isActiveNavItem } from '@utils/helpers';

import RowButton from '@components/ui/buttons/RowButton';
import NotificationBadge from '@components/ui/notification-badge/NotificationBadge';

interface MobileNavigationButtonProps {
  navOption: NavItem;
  toggleBurgerMenu: () => void;
}

const MobileNavigationButton = (props: MobileNavigationButtonProps) => {
  const {
    navOption: { href, icon, title, count, childrenRoutes = [] },
    toggleBurgerMenu
  } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
    toggleBurgerMenu();
  };

  return (
    <RowButton
      icon={icon}
      title={title}
      onClick={handleClick}
      isActive={isActiveNavItem(location.pathname, href, childrenRoutes)}
      titleClassName="ps-12"
      className="py-12 px-20"
      {...(!!count && { trailingContent: <NotificationBadge count={count} /> })}
    />
  );
};

export default MobileNavigationButton;
