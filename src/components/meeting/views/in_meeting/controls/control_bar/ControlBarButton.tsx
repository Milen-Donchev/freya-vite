import React, { FC } from 'react';
import PopOver, { PopOverItem } from './pop_over';
import { useControlBarContext } from './ControlBarProvider';
import { StyledControlBarItem, ControlBarButtonProps, PopOverItemProps } from './Styled';

export const ControlBarButton: FC<ControlBarButtonProps> = ({
  icon,
  onClick,
  label = '',
  $isSelected = false,
  $popOver = null,
  popOverPlacement,
  children,
  enabled = true,
  ...rest
}: ControlBarButtonProps) => {
  const context = useControlBarContext();

  const renderPopOver = () => (
    <PopOver
      renderButtonWrapper={(isActive: any, props: any) => (
        <button
          {...props}
          className={`btn btn-icon btn-plain btn-sm ch-control-bar-item-caret ${
            isActive ? 'text-bg-primary' : ''
          }`}
          disabled={!enabled}>
          <i className={`fa-light ${isActive ? 'fa-chevron-down' : 'fa-chevron-up'} fa-sm`}></i>
        </button>
      )}
      placement={popOverPlacement}>
      {$popOver?.map((option: PopOverItemProps, index: number) => (
        <PopOverItem {...option} key={index} />
      ))}
      {children}
    </PopOver>
  );

  return (
    <StyledControlBarItem $isSelected={$isSelected} $popOver={$popOver} {...rest} {...context}>
      <button className="ch-control-bar-item-button" onClick={onClick} disabled={!enabled}>
        {icon}
      </button>
      {($popOver || children) && renderPopOver()}
      {context.$showLabels && <label className="ch-control-bar-item-label">{label}</label>}
    </StyledControlBarItem>
  );
};

export default ControlBarButton;
