import React from 'react';
import classNames from 'classnames';
import capitalize from 'lodash/capitalize';

import { useTranslation } from '@freya/hooks/useTranslation';

interface ButtonTabProps {
  title: string;
  tabKey: string;
  isSelected: boolean;
  onClick: () => void;
}

const ButtonTab = (props: ButtonTabProps) => {
  const { title, tabKey, isSelected, onClick } = props;

  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className={classNames('btn', 'btn-lg', 'flex-shrink-0', {
        'btn-ghost-secondary text-secondary-600': !isSelected,
        'btn-secondary-400': isSelected,
        'd-xxl-none': tabKey === 'resources'
      })}
      data-testid={`tab-button-${tabKey}`}>
      {t(title, capitalize(tabKey))}
    </button>
  );
};

export default ButtonTab;
