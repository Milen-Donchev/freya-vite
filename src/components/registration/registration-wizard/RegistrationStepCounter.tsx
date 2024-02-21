import React, { memo } from 'react';
import { useTranslation } from '@hooks/useTranslation';

import ProgressPie from '@freya/components/ui/progress-pie/ProgressPie';

interface RegistrationStepCounterProps {
  stepNumber: string;
  title: string;
}

const RegistrationStepCounter = (props: RegistrationStepCounterProps) => {
  const { t } = useTranslation();
  const { stepNumber, title } = props;

  return (
    <div className="d-flex align-items-center justify-content-center gap-12 mt-16 mt-md-0">
      <ProgressPie title={`${stepNumber}/3`} currentStep={+stepNumber} allSteps={3} />
      <div className="text-secondary">
        <p className="fs-14 m-0 width-100">
          {t('register.step', 'Step')} {stepNumber}
        </p>
        <p className="fs-24 m-0 width-100">{title}</p>
      </div>
    </div>
  );
};

export default memo(RegistrationStepCounter);
