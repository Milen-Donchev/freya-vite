import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { useTranslation } from '@hooks/useTranslation';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useDiscussion } from '@providers/DiscussionProvider';

import { commentCheckbox } from './comments.scss';

interface AnonymousCheckboxProps {
  onToggle?: (isChecked: boolean) => void;
  isDefaultChecked?: boolean;
}

const AnonymousCheckbox = (props: AnonymousCheckboxProps) => {
  const { onToggle, isDefaultChecked = false } = props;

  const { t } = useTranslation();
  const { discussion } = useDiscussion();

  const uniqueIdForAnonymousCheckbox = uniqueId('anonymous-checkbox');
  const disabled = !discussion?.allow_anonymous_comment;

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        disabled ? (
          <Tooltip>
            {t('common.anonymous_not_allowed_by_admin', 'Anonymous comments not allowed by admin')}
          </Tooltip>
        ) : (
          <></>
        )
      }>
      <div className={`form-check ${commentCheckbox}`}>
        <input
          data-testid="anonymous-checkbox"
          className="form-check-input"
          type="checkbox"
          value=""
          id={uniqueIdForAnonymousCheckbox}
          defaultChecked={isDefaultChecked}
          disabled={disabled}
          onChange={onToggle ? (e) => onToggle(e.target.checked) : () => {}}
        />
        <label className="form-check-label" htmlFor={uniqueIdForAnonymousCheckbox}>
          {t('common.anonymous', 'Anonymous')}
        </label>
      </div>
    </OverlayTrigger>
  );
};

export default AnonymousCheckbox;
