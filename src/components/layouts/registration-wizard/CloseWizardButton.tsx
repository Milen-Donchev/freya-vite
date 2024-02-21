import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@hooks/useTranslation';
import { useDispatch } from 'react-redux';

import { Routes } from '@models/Routes';
import { resetAuthSlice } from '@store/authSlice';
import { resetTempAuth } from '@store/tempAuthSlice';
import { resetCurrentUserSlice } from '@store/currentUserSlice';

interface CloseWizardButtonProps {
  className?: string;
}

const CloseWizardButton = (props: CloseWizardButtonProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { className } = props;

  const handleCloseRegistrationWizard = () => {
    dispatch(resetAuthSlice());
    dispatch(resetCurrentUserSlice());
    dispatch(resetTempAuth(''));
  };

  return (
    <div className="d-block text-end">
      <Link
        data-testid="close-wizard-button-link"
        onClick={handleCloseRegistrationWizard}
        to={Routes.REGISTER}
        className={`${className} btn btn-link btn-lg p-0`}>
        {t('common.close', 'Close')}
        <i className="fa-light fa-circle-xmark ms-4" />
      </Link>
    </div>
  );
};

export default memo(CloseWizardButton);
