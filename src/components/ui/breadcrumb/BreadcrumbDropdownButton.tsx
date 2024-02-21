import React from 'react';
import map from 'lodash/map';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import type { BreadcrumbItem } from '@types';

import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

interface BreadcrumbDropdownButtonProps {
  crumbItems: BreadcrumbItem[];
}

const BreadcrumbDropdownButton = (props: BreadcrumbDropdownButtonProps) => {
  const { crumbItems } = props;

  const navigate = useNavigate();
  const translate = useTranslatedAttribute();

  return (
    <Dropdown className="dropdown d-inline-block me-12">
      <Dropdown.Toggle
        as="button"
        data-testid="dropdown-toggle"
        id="dropdown-basic"
        className="btn btn-icon btn-lg btn-ghost-primary dropdownToggle">
        <i className="fa-regular fa-ellipsis fs-22" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        {map(crumbItems, ({ id, title, href }) => (
          <Dropdown.Item
            data-testid="breadcrumb-dropdown-option"
            key={String(id)}
            onClick={() => navigate(href)}
            className="dropdown-item">
            {typeof title === 'string' ? title : translate(title)}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default BreadcrumbDropdownButton;
