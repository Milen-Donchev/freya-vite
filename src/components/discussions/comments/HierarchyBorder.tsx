import React from 'react';
import classNames from 'classnames';

interface HierarchyBorderProps {
  addBottomConnection: boolean;
  bottomConnectionClassName?: string;
  topConnectionClassName?: string;
}

const HierarchyBorder = (props: HierarchyBorderProps) => {
  const { addBottomConnection, bottomConnectionClassName, topConnectionClassName } = props;

  return (
    <div className="position-relative">
      <div
        className={classNames(
          'position-absolute',
          'ps-40',
          'border-2',
          'border-gray-200',
          'border-start',
          'border-bottom',
          'rounded-bottom-5',
          {
            'height-50': !topConnectionClassName?.includes('height')
          },
          topConnectionClassName
        )}>
        &nbsp;
      </div>
      <div
        className={classNames('height-100', 'ps-20', bottomConnectionClassName, {
          'border-start border-2 border-gray-200': addBottomConnection
        })}>
        &nbsp;
      </div>
    </div>
  );
};

export default HierarchyBorder;
