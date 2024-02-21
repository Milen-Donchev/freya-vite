import React, { useState } from 'react';
import { useTranslation } from '@hooks/useTranslation';

interface FilterProps {
  placeholder?: string;
  onSearch: (title: string) => void;
}

const SearchField = (props: FilterProps) => {
  const { t } = useTranslation();
  const { placeholder = t('common.search', 'Search'), onSearch } = props;

  const [searchField, setSearchField] = useState<string>('');

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchField = event.target.value.toLowerCase();
    setSearchField(searchField);
  };

  const searchByTitle = (event: any) => {
    if (event.type === 'click' || event.key === 'Enter') {
      onSearch(searchField);
    }
  };

  return (
    <div className="d-flex">
      <input
        data-testid="search-input"
        type="text"
        className="form-control rounded pe-36"
        placeholder={placeholder}
        onChange={onChangeInputValue}
        onKeyDown={searchByTitle}
      />
      <i
        data-testid="search-input-icon"
        className="fa-magnifying-glass fa-regular text-info ms-n28 d-flex justify-content-center align-items-center cursor-pointer"
        onClick={searchByTitle}
      />
    </div>
  );
};

export default SearchField;
