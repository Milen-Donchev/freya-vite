import React, { memo } from 'react';
import { useTranslation } from '@hooks/useTranslation';

interface BackwardButtonProps {
  handleStepBack?: () => void;
}

const BackwardButton = (props: BackwardButtonProps) => {
  const { t } = useTranslation();
  const { handleStepBack } = props;

  return (
    <button
      data-testid="step-back-button"
      onClick={handleStepBack}
      className="btn btn-outline-primary btn-xl">
      <i className="fa-light fa-circle-arrow-left me-8" />
      {t('common.back', 'Back')}
    </button>
  );
};

export default memo(BackwardButton);
