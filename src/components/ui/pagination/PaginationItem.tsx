import React from 'react';
import classNames from 'classnames';

interface PaginationItemProps {
  url: string;
  page: string;
  active: boolean;
  children: React.ReactNode;
  clickHandler?: (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => void;
}

const PaginationItem = (props: PaginationItemProps) => {
  const { url, page, active, children, clickHandler } = props;

  return (
    <li className={classNames('page-item fw-semibold', { disabled: active })}>
      <a
        data-testid={`pagination-item-${page}`}
        href={url}
        onClick={(e) => clickHandler && clickHandler(e, Number(page))}
        className="page-link width-3 height-3 d-flex align-items-center justify-content-center">
        {children}
      </a>
    </li>
  );
};

export default PaginationItem;
