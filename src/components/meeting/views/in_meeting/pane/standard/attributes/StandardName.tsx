import React from 'react';
import { useAttendeesCount, useContentShareMode } from '@components/meeting/hooks';
import { useTranslation } from '@hooks/useTranslation';
import { StyledStandardName } from './Styled';

export default () => {
  const { t } = useTranslation();
  const attendeesCount = useAttendeesCount();
  const contentShareMode = useContentShareMode();

  return (
    <StyledStandardName size={attendeesCount} $contentShareMode={contentShareMode}>
      {t('meeting.noAttendeesStatusLabel', 'Some additional content goes here')}
    </StyledStandardName>
  );
};
