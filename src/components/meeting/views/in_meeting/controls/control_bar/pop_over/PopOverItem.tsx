import React, { FC } from 'react';
import eq from 'lodash/fp/eq';
import { StyledPopOverItem, PopOverItemProps } from './Styled';

const PopOverItem: FC<React.PropsWithChildren<PopOverItemProps>> = ({
  type = 'default',
  checked,
  extraIcon,
  children,
  ...rest
}: any) => {
  const checkedType = eq('checked')(type);
  const checkIcon = <i className="fa-light fa-check ch-check" />;

  return (
    <StyledPopOverItem type={type} checked={checked} extraIcon={extraIcon} {...rest}>
      {checkedType && !checked && <span></span>}
      {checkedType && checked && checkIcon}
      {children}
    </StyledPopOverItem>
  );
};

export default PopOverItem;
