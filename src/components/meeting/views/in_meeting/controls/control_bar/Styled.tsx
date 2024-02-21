import React, { ReactNode, HTMLAttributes } from 'react';
import { styled } from 'styled-components';

import { getBreakpointMin, getPortraitOnlyQuery } from '@components/meeting/utils/accessors';

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

export interface ControlBarProps extends Omit<HTMLAttributes<HTMLDivElement>, ''> {
  tag?: any;
  $showLabels: boolean | undefined;
  $responsive?: boolean | undefined;
}

export interface ControlBarButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, ''> {
  icon?: JSX.Element;
  label?: string;
  $popOver?: PopOverItemProps[] | null;
  popOverPlacement?: Placement;
  $isSelected?: boolean;
  enabled?: boolean;
  children?: ReactNode | ReactNode[];
  onClick?: () => void;
}

interface StyledControlBarItemProps extends ControlBarProps {
  $popOver: PopOverItemProps[] | null;
  $isSelected: boolean;
}

export const StyledControlBar = styled.div<ControlBarProps>`
  position: static;
  grid-area: controls;
  display: inline-flex;
  column-gap: 0.25rem;
  width: 100%;
  height: 4rem;
  justify-content: center;
  align-items: center;
  border-top: 0.063rem solid var(--bs-primary-400);
  opacity: 1;

  ${getBreakpointMin('md')} {
    column-gap: 1.25rem;
    height: 5rem;
  }

  ${getPortraitOnlyQuery()} {
    column-gap: 0.25rem;
    height: 4rem;
  }
`;

export const StyledControlBarItem = styled.div<StyledControlBarItemProps>`
  display: grid;
  grid-template-columns: 2.5rem minmax(1.5rem, auto);
  grid-gap: ${({ $showLabels }) => ($showLabels ? '0.25rem' : '0')} 0.25rem;
  place-items: start center;

  .ch-control-bar-item-button {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    color: ${({ $isSelected }) => ($isSelected ? 'var(--bs-white)' : 'var(--bs-gray-500)')};
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'var(--bs-primary-500)' : 'transparent'};
    border: none;
    border-radius: 50%;

    &:hover,
    &:focus,
    &:active {
      color: ${({ $isSelected }) => ($isSelected ? 'var(--bs-white)' : 'var(--bs-gray-500)')};
      background-color: ${({ $isSelected }) =>
        $isSelected ? 'var(--bs-primary-500)' : 'transparent'};
      border: none;
      box-shadow: none;
      outline: none;
    }
  }

  &.end-meeting-button {
    grid-template-columns: unset;

    .ch-control-bar-item-button {
      color: var(--bs-white);
      background-color: var(--bs-danger-500);

      &:hover,
      &:focus,
      &:active {
        color: var(--bs-white);
        background-color: var(--bs-danger-500);
      }
    }
  }

  .ch-control-bar-item-label {
    display: none;
    grid-row-start: 2;
    justify-self: center;
    font-size: 0.75rem;
    color: var(--bs-gray-500);

    ${getBreakpointMin('md')} {
      display: grid;
    }

    ${getPortraitOnlyQuery()} {
      display: none;
    }
  }

  &.disabled {
    display: grid;

    .ch-control-bar-item-button,
    .ch-control-bar-item-caret {
      color: var(--bs-gray-500);
      background-color: transparent;
    }

    .ch-control-bar-item-label {
      color: var(--bs-gray-500);
    }
  }
`;
