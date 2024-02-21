import React, { memo } from 'react';

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'left' | 'right';
  disabled?: boolean;
}

const ArrowButton = ({ onClick, direction, disabled }: ArrowButtonProps) => {
  const iconClass = direction === 'left' ? 'fa-circle-chevron-left' : 'fa-circle-chevron-right';

  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-ghost-primary btn-icon btn-lg">
      <i className={`fa-light fs-28 ${iconClass}`} />
    </button>
  );
};

export default memo(ArrowButton);
