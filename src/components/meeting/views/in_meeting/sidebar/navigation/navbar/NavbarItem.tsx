import React from 'react';
import PopOver from '../../../controls/control_bar/pop_over';
import { StyledNavbarItem, NavbarItemProps } from './Styled';

export const NavbarItem: React.FC<NavbarItemProps> = ({
  label,
  children,
  placement = 'right-start',
  icon,
  selected,
  $showLabel = false,
  badge,
  onClick,
  ...rest
}: NavbarItemProps) => (
  <StyledNavbarItem selected={selected} $showLabel={$showLabel}>
    {children ? (
      <PopOver
        placement={placement}
        renderButton={(isOpen: any) => (
          <button
            className={`btn ${isOpen ? 'btn-primary' : 'btn-plain'} ch-popover-button ${
              isOpen && 'text-bg-info-400'
            } btn-sm`}
            onClick={onClick}
            {...rest}>
            {icon}
            {badge}
          </button>
        )}>
        {children}
      </PopOver>
    ) : (
      <button
        className={`btn ${selected ? 'btn-primary' : 'btn-plain'} ch-popover-button ${
          selected && 'text-bg-info-400'
        } btn-md`}
        onClick={onClick}
        {...rest}>
        {icon}
        {badge}
      </button>
    )}

    <label className="ch-navigation-bar-item-label" onClick={onClick}>
      {label}
    </label>
  </StyledNavbarItem>
);

export default NavbarItem;
