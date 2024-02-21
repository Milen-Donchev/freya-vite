import map from 'lodash/map';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import difference from 'lodash/difference';
import { useNavigate } from 'react-router-dom';

import { BreadcrumbItem } from '@types';

import { Breakpoints } from '@models/Breakpoints';
import { useWindowDimensions } from '@hooks/useWindowDimensions';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import BreadcrumbDropdownButton from './BreadcrumbDropdownButton';

interface BreadcrumbProps {
  crumbItems: BreadcrumbItem[];
}

const Breadcrumb = (props: BreadcrumbProps) => {
  const { crumbItems } = props;

  const navigate = useNavigate();
  const translate = useTranslatedAttribute();
  const { width } = useWindowDimensions();

  const isTablet = useMemo(() => width <= Breakpoints.LG && width >= Breakpoints.SM, [width]);
  const isMobile = useMemo(() => width <= Breakpoints.SM, [width]);

  const isDropdownButtonShown = useMemo(
    () => (isTablet && crumbItems.length > 2) || (isMobile && crumbItems.length > 1),
    [isTablet, crumbItems.length, isMobile]
  );

  /* Mobile = 1 visible link; Tablet = 2 visible links */
  const visibleLinks = useMemo(
    () =>
      isDropdownButtonShown ? crumbItems.slice(crumbItems.length - (isTablet ? 2 : 1)) : crumbItems,
    [crumbItems, isTablet, isDropdownButtonShown]
  );

  /* Rest of the links which are displayed in a dropdown */
  const hiddenLinks = useMemo(
    () => difference(crumbItems, visibleLinks),
    [crumbItems, visibleLinks]
  );

  return (
    <div className="d-flex align-items-center mb-20">
      {isDropdownButtonShown && <BreadcrumbDropdownButton crumbItems={hiddenLinks} />}
      {map(visibleLinks, ({ id, title, href, current }, index) => (
        <div className="d-flex align-items-center" key={String(id)}>
          <div
            data-testid="breadcrumb-button"
            className={classNames(
              'text-primary-500',
              { 'fw-semibold': current && visibleLinks.length > 1 },
              { 'cursor-pointer': !current }
            )}
            onClick={current ? () => null : () => navigate(href)}>
            {typeof title === 'string' ? title : translate(title)}
          </div>
          {visibleLinks.length - 1 !== index && (
            <i className="fa-light fa-chevron-right text-gray-300 fs-12 mx-12" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
