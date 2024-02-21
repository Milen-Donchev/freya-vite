import React from 'react';
import classNames from 'classnames';
import { useTranslation } from '@hooks/useTranslation';

interface SearchBarProps {
  className?: string;
}

const SearchBar = (props: SearchBarProps) => {
  const { t } = useTranslation();
  const { className } = props;

  return (
    <div className={`form-floating position-relative ${className}`}>
      <input
        type="email"
        className="form-control position-relative border-gray-300 pe-48"
        id="searchBar1"
        placeholder="name@example.com"
      />
      <label htmlFor="searchBar1">{t('common.search', 'Search')}</label>
      <i
        className={classNames(
          'fa-light',
          'fa-search',
          'fs-24',
          'position-absolute',
          'me-16',
          'top-50',
          'end-0',
          'translate-middle-y'
        )}
      />
    </div>
  );
};

export default SearchBar;
