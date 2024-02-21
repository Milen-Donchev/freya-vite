import React, { FC } from 'react';
import { StyledNavbar, NavbarProps } from './Styled';

export const Navbar: FC<NavbarProps> = ({ className, children, ...rest }: NavbarProps) => (
  <StyledNavbar className={className ?? ''} {...rest}>
    {children}
  </StyledNavbar>
);

export default Navbar;
