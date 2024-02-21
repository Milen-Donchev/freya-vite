import React, { Fragment } from 'react';
import { Pagination } from 'react-bootstrap';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';

import type { Meta, PaginationLink } from '@types';

import GoToPage from './GoToPage';
import PaginationItem from './PaginationItem';

interface BasicPaginationProps {
  meta: Meta;
  clickHandler: (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => void;
}

const parse = (label: string) => {
  // if label includes left arrows display icon fa-chevron-left
  if (label.includes('&laquo;')) {
    return <i className={`fa-solid fa-chevron-left`} data-testid="pagination-left-arrow" />;
  }

  // if label includes right arrows display icon fa-chevron-right
  if (label.includes('&raquo;')) {
    return <i className={`fa-solid fa-chevron-right`} data-testid="pagination-right-arrow" />;
  }

  return label;
};

const BasicPagination = (props: BasicPaginationProps) => {
  const { meta, clickHandler } = props;

  const renderGoToPage = () => {
    if (
      meta?.links &&
      filter(meta.links, (links: PaginationLink) => links.label === '...').length > 0
    ) {
      return <GoToPage meta={meta} clickHandler={clickHandler} />;
    }
  };

  return (
    <div className="d-flex flex-wrap gap-40">
      <Pagination size="sm" className="d-flex flex-wrap gap-8 mb-0" data-testid="pagination">
        {meta &&
          get(meta, 'total') > 0 &&
          map(get(meta, 'links'), ({ url, page, label, active }: any, key: number) => {
            return (
              <Fragment key={key}>
                {page ? (
                  <PaginationItem
                    key={key}
                    url={url}
                    page={page}
                    active={active}
                    clickHandler={clickHandler}>
                    {parse(label)}
                  </PaginationItem>
                ) : (
                  label === '...' && <span>{label}</span>
                )}
              </Fragment>
            );
          })}
      </Pagination>
      {renderGoToPage()}
    </div>
  );
};

export default BasicPagination;
