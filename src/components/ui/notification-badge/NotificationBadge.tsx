import React from 'react';
import classNames from 'classnames';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge = (props: NotificationBadgeProps) => {
  const { count, className = '' } = props;

  return (
    <div
      className={classNames(
        'flex-shrink-0',
        'width-3',
        'height-3',
        'fs-12',
        'fw-bold',
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'bg-danger-200',
        'rounded-circle',
        className
      )}>
      {count}
    </div>
  );
};

export default NotificationBadge;
