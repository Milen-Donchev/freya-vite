import React from 'react';
import classNames from 'classnames';

import { Breakpoints } from '@models/Breakpoints';
import { useTranslation } from '@hooks/useTranslation';
import { useWindowDimensions } from '@hooks/useWindowDimensions';

interface SettingsBackButtonFrameProps {
  onClick: () => void;
  showButton?: boolean;
  children: React.ReactNode;
  title: string;
}

const SettingsBackButtonFrame = (props: SettingsBackButtonFrameProps) => {
  const { onClick, showButton = true, children, title } = props;

  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isMobile = width <= Breakpoints.SM;

  return (
    <div className="position-relative fade-in-animation">
      {showButton && (
        <div className="d-flex align-items-center mb-20">
          <button
            className={classNames('btn btn-ghost-primary', {
              'btn-icon me-16': isMobile
            })}
            data-testid="step-back-btn"
            onClick={onClick}>
            <i
              className={classNames('fa-regular fa-arrow-left', {
                'fa-chevron-left': isMobile,
                'me-8': !isMobile
              })}
            />
            {!isMobile && t('common.back', 'Back')}
          </button>
          <h3 className="d-sm-none m-0 fs-18">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export default SettingsBackButtonFrame;
