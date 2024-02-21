import React from 'react';
import classNames from 'classnames';

/**
 * List item row button. Examples -
 *
 * [ 👤 My Profile    > ]
 * [ 🚪 Exit          > ]
 */

interface RowButtonProps {
  icon?: string;
  title: string;
  subtitle?: string;
  isActive: boolean;
  onClick: () => void;
  trailingContent?: React.ReactNode;
  titleClassName?: string;
  subtitleClassName?: string;
  iconSize?: string;
  className?: string;
  animateButtons?: boolean;
}

const RowButton = (props: RowButtonProps) => {
  const {
    icon,
    title,
    subtitle,
    isActive,
    onClick,
    trailingContent,
    iconSize = 'fs-24',
    titleClassName,
    subtitleClassName,
    className,
    animateButtons = true
  } = props;

  return (
    <div
      className={classNames(
        'd-flex align-items-center cursor-pointer',
        { 'bg-tertiary-300': isActive },
        { 'fade-in-animation': animateButtons },
        className
      )}
      onClick={onClick}
      data-testid="mobile-navigation-button">
      <div className="d-flex align-items-center width-100 text-primary-700">
        {icon && <i className={`fa-light ${icon} ${iconSize}`} />}
        <div className="flex-fill">
          <p className={classNames('m-0', titleClassName)}>{title}</p>
          {subtitle && (
            <p className={classNames('m-0 text-gray-300 fs-14', subtitleClassName)}>{subtitle}</p>
          )}
        </div>
        {trailingContent}
        <i className="fa-light fa-chevron-right ms-16 fs-20 text-gray-300" />
      </div>
    </div>
  );
};

export default RowButton;
