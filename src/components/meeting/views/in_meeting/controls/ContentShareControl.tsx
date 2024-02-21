import React, { FC } from 'react';
import {
  useContentShareState,
  useContentShareControls
} from 'amazon-chime-sdk-component-library-react';
import { useTranslation } from '@freya/hooks/useTranslation';
import { ControlBarButton, PopOverItemProps } from './control_bar';
import { ContentShareControlProps } from './Styled';

const ContentShareControl: FC<ContentShareControlProps> = ({ enabled, ...rest }) => {
  const { t } = useTranslation();
  const { isLocalUserSharing } = useContentShareState();
  const { paused, toggleContentShare, togglePauseContentShare } = useContentShareControls();

  const label = t('inMeeting.controlBar.shareLabel', 'Share');

  const dropdownOptions: PopOverItemProps[] = [
    {
      children: (
        <span>
          {t(
            paused
              ? 'inMeeting.controlBar.shareUnpauseLabel'
              : 'inMeeting.controlBar.sharePauseLabel',
            paused ? 'Unpause' : 'Pause'
          )}
        </span>
      ),
      type: 'simple',
      onClick: togglePauseContentShare
    }
  ];

  return (
    <ControlBarButton
      icon={<i className={`${isLocalUserSharing ? 'fa-solid' : 'fa-light'} fa-screencast`}></i>}
      onClick={() => enabled && toggleContentShare()}
      label={label}
      $popOver={isLocalUserSharing && enabled ? dropdownOptions : null}
      $isSelected={isLocalUserSharing}
      className={enabled ? '' : 'disabled'}
      enabled={enabled}
      {...rest}
    />
  );
};

export default ContentShareControl;
