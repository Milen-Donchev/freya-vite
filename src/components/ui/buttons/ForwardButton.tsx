import React, { memo } from 'react';
import { useTranslation } from '@hooks/useTranslation';

interface ForwardButtonProps {
  handleStepForward: () => void;
  isForwardButtonDisabled: boolean;
  className?: string;
  title?: string;
}

const ForwardButton = (props: ForwardButtonProps) => {
  const { t } = useTranslation();
  const { handleStepForward, isForwardButtonDisabled, className, title } = props;

  return (
    <button
      data-testid="form-submit-button"
      onClick={handleStepForward}
      className={`btn btn-xl btn-primary ${className ?? ''}`}
      disabled={isForwardButtonDisabled}>
      {t('common.next', 'Next')}
      <i className="fa-light fa-circle-arrow-right ms-8" />
    </button>
  );
};

export default memo(ForwardButton);
