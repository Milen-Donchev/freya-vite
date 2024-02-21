import React, { memo } from 'react';

import ForwardButton from '@components/ui/buttons/ForwardButton';
import BackwardButton from '@components/ui/buttons/BackwardButton';

interface ButtonNavigationProps {
  handleStepForward: () => void;
  activeStep: number;
  isForwardButtonDisabled: boolean;
  handleStepBack?: () => void;
  className?: string;
}

const RegistrationWizardFooterNavigation = (props: ButtonNavigationProps) => {
  const { handleStepForward, handleStepBack, className, activeStep, isForwardButtonDisabled } =
    props;

  return (
    <div
      className={`${className ?? ''} d-flex justify-content-${
        isForwardButtonDisabled ? 'end' : 'between'
      } align-items-center my-48 width-100`}>
      <div>
        {activeStep !== 1 && activeStep !== 4 && <BackwardButton handleStepBack={handleStepBack} />}
      </div>
      <div>
        <ForwardButton
          handleStepForward={handleStepForward}
          isForwardButtonDisabled={isForwardButtonDisabled}
        />
      </div>
    </div>
  );
};

export default memo(RegistrationWizardFooterNavigation);
