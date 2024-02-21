import React, { useState } from 'react';
import { useTranslation } from '@hooks/useTranslation';
import { Meta } from '@types';

interface GoToPageProps {
  clickHandler: (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => void;
  meta: Meta;
}

const GoToPage = (props: GoToPageProps) => {
  const { t } = useTranslation();
  const [page, setGoToPage] = useState<number>(1);

  const { meta, clickHandler } = props;
  const lastPage = meta?.last_page ? meta.last_page : 1;

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedPage = event.target.value;
    const page = Number(typedPage) > lastPage ? lastPage : Number(typedPage);
    setGoToPage(page);
  };

  const buttonHandler = (event: any) => {
    event.preventDefault();
    clickHandler(event, page);
  };

  return (
    <div className="d-flex align-items-center  justify-content-start">
      <label htmlFor="goToPage" className="fs-14 text-primary">
        {t('common.page', 'Page')}
      </label>
      <input
        type="number"
        min={1}
        max={lastPage}
        className="form-control form-control-sm mx-8 width-8"
        id="goToPage"
        data-testid="go-to-page"
        onChange={onChangeInputValue}
      />
      <button
        data-testid="go-to-page-button"
        className="btn btn-primary-500 btn-sm"
        onClick={buttonHandler}>
        {t('common.go', 'Go')}
      </button>
    </div>
  );
};

export default GoToPage;
