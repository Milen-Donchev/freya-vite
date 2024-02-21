import { ReactNode } from 'react';
import { styled } from 'styled-components';
export interface NavbarProps {
  className?: string;
  children?: any;
}

export interface NavbarItemProps {
  icon: any;
  label: string;
  badge?: ReactNode | ReactNode[];
  selected?: boolean;
  children?: ReactNode | ReactNode[];
  placement?: any;
  $showLabel?: boolean;
  onClick?: () => void;
}

export const StyledNavbarItem = styled.div<Partial<NavbarItemProps>>`
  display: grid;
  grid-template: ${({ $showLabel }) => ($showLabel ? 'auto auto' : 'auto')} / 1fr;
  grid-gap: ${({ $showLabel }) => ($showLabel ? '0.25rem 0' : '0')};
  width: 100%;
  min-height: 3.125rem;
  place-items: center;
  padding: 0;

  .ch-navigation-bar-item-label {
    display: ${({ $showLabel }) => ($showLabel ? 'block' : 'none')};
    width: 100%;
    padding: 0 0.25rem;
    margin-bottom: 1.25rem;
    text-align: center;
    font-size: 0.65rem;
  }
`;

export const StyledNavbar = styled.nav<NavbarProps>`
  position: static;
  display: flex;
  flex-direction: column;
  grid-area: nav;
  color: var(--bs-gray-500);
  background-color: var(--bs-primary-100);
  width: 3.75rem;
  height: 100%;
  padding-top: 0.625rem;
  border-right: 0.063rem solid var(--bs-primary-200);
  z-index: 3;
`;
