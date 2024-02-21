import React from 'react';
import classNames from 'classnames';
import capitalize from 'lodash/capitalize';

import { useTranslation } from '@freya/hooks/useTranslation';
import { tabUnderline, selected } from './tabs.scss';

interface ButtonTabProps {
  title: string;
  tabKey: string;
  isSelected: boolean;
  onClick: () => void;
}

const UnderlinedTab = (props: ButtonTabProps) => {
  const { title, tabKey, isSelected, onClick } = props;

  const { t } = useTranslation();

  return (
    <li
      onClick={onClick}
      className="list-unstyled d-block position-relative fs-18 fw-semibold pb-4 cursor-pointer flex-shrink-0"
      data-testid={`tab-button-${tabKey}`}>
      <span
        className={classNames(tabUnderline, {
          [selected]: isSelected
        })}
        data-testid={`tab-button-inner-${tabKey}`}>
        {t(title, capitalize(tabKey))}
      </span>
    </li>
  );
};

export default UnderlinedTab;
