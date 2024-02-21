import React from 'react';
import classNames from 'classnames';

import ArrowButton from '@components/ui/buttons/ArrowButton';

interface CalendarHeaderProps {
  month: string;
  dayOfMonth: number;
  weekDay: string;
  isToday: boolean;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  disableLeftArrow: boolean;
  onLeftArrowClick: () => void;
  onRightArrowClick: () => void;
  disableRightArrow?: boolean;
  className?: string;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const {
    month,
    dayOfMonth,
    weekDay,
    isToday,
    showLeftArrow,
    showRightArrow,
    disableLeftArrow,
    disableRightArrow,
    className,
    onLeftArrowClick,
    onRightArrowClick
  } = props;

  return (
    <div
      className={`d-flex justify-content-center align-items-center position-relative width-100 ${className}`}>
      {showLeftArrow && (
        <div className="position-absolute start-0">
          <ArrowButton onClick={onLeftArrowClick} direction="left" disabled={disableLeftArrow} />
        </div>
      )}
      <div
        className={classNames(
          'd-flex flex-column justify-content-center align-items-center py-8 px-24 rounded-4 ',
          { 'bg-tertiary-300': isToday }
        )}>
        <p className="fs-12 mb-0">{month}</p>
        <p className="fw-bold fs-14 fs-md-18 mb-0 text-primary">{dayOfMonth}</p>
        <p className="fs-12 mb-0">{weekDay}</p>
      </div>
      {showRightArrow && (
        <div className="position-absolute end-0">
          <ArrowButton onClick={onRightArrowClick} direction="right" disabled={disableRightArrow} />
        </div>
      )}
    </div>
  );
};

export default CalendarHeader;
