import React, { HTMLAttributes, ReactNode } from 'react';
import { styled } from 'styled-components';
import eq from 'lodash/fp/eq';
import { ellipsis } from '../../../Styled';

export type Placement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end';

export type PopOverItemType = 'default' | 'simple' | 'checked';

export interface PopOverProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  isSubMenu?: Boolean;
  placement?: Placement;
  dropdown?: boolean;
  className?: string;
  disabled?: boolean;
  renderButton?: (isActive: boolean) => ReactNode;
  renderButtonWrapper?: (isActive: boolean, props: any) => ReactNode;
  onPopOverClick?: (isOpen: boolean) => void;
  closeOnClick?: boolean;
}

export interface PopOverItemProps {
  onClick?: () => void;
  checked?: boolean;
  extraIcon?: boolean;
  children?: React.ReactElement<any> | React.ReactElement<any>[];
  disabled?: boolean;
  href?: string;
  type?: PopOverItemType;
  border?: boolean;
}

export interface PopOverToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  dropdown?: boolean;
}

export const StyledPopOverMenu = styled.ul`
  display: grid;
  width: fit-content;
  max-width: 16rem;
  margin: 0;
  padding: 0;
  background-color: var(--bs-white);
  box-shadow: 0 0.0313rem 0.5rem 0 rgba(var(--bs-black-rgb), 0.15);
  border-radius: 0.5rem;
  overflow: hidden;
  list-style: none;
  z-index: 30;
`;

export const StyledPopOverToggle = styled.div<PopOverToggleProps>`
  display: grid;
  grid-template: ${({ dropdown }) =>
    dropdown
      ? `
      'label dropdown' auto
      'placeholder dropdown' auto
      / 1fr auto
    `
      : 'auto / 1fr'};
  grid-column-gap: ${({ dropdown }) => dropdown && '0.75rem'};
  place-items: center stretch;
  width: 100%;
  padding: ${({ dropdown }) => dropdown && '0.25rem 1rem'};
  color: ${({ dropdown }) => dropdown && 'var(--bs-gray-500)'};
  border: ${({ dropdown }) => dropdown && '0.063rem solid var(--bs-primary-500)'};
  border-radius: ${({ dropdown }) => dropdown && '0.5rem'};
  cursor: pointer;

  ${({ dropdown }) =>
    dropdown &&
    `
    > *:nth-child(1) { grid-area: label; }
    > *:nth-child(2) { grid-area: placeholder; }
    > *:nth-child(3) { grid-area: dropdown; }
  `};

  &:focus {
    outline: 0;
  }

  > label {
    width: 100%;
    ${ellipsis};

    &:first-child {
      color: ${(props) => props.dropdown && 'var(--bs-gray-400)'};
    }
  }
`;

export const StyledPopOverItem = styled.li<PopOverItemProps>`
  position: relative;
  display: grid;
  grid-template: auto / ${({ type }) => eq('checked')(type) && 'minmax(0.875rem, auto)'} ${({
      extraIcon
    }) => extraIcon && 'auto'} 1fr;
  grid-column-gap: 0.625rem;
  place-items: center start;
  padding: 0.875rem 1rem;
  color: var(--bs-gray-500);
  background-color: ${({ checked }) => (checked ? 'var(--bs-primary-300)' : 'transparent')};
  font-weight: ${({ checked }) => (checked ? '600' : '400')};
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease-out 0s;

  &:hover,
  &:focus {
    background-color: ${({ checked }) =>
      checked ? 'var(--bs-primary-400)' : 'var(--bs-primary-200)'};
    color: ${({ checked }) => (checked ? 'var(--bs-gray-500)' : 'var(--bs-gray-500)')};
    outline: 0;
  }

  &:active {
    background-color: var(--bs-primary-400);
    color: var(--bs-gray-500);
  }

  &[disabled],
  &[disabled='true'] {
    coclor: var(--bs-gray-400);
    pointer-events: none;
    cursor: not-allowed;
  }

  a {
    width: unset;
  }

  > *:last-child {
    width: 100%;
    ${ellipsis};
  }
`;

export const StyledPopOver = styled.div<PopOverProps>`
  display: grid;
  justify-items: start;

  &[disabled],
  &[disabled='true'] {
    &,
    > * {
      color: var(--bs-gray-500);
      border-color: var(--bs-gray-500);
      pointer-events: none;
      cursor: not-allowed;
    }
  }ß
`;
