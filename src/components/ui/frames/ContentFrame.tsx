import React from 'react';

import { useTranslation } from '@hooks/useTranslation';

import CardFrame from '@components/ui/frames/CardFrame';
import NoResults, { type NoResultsProps } from '@components/layouts/no-results/NoResults';

interface ContentFrameProps {
  contentVisible: boolean;
  children: React.ReactNode;
  className?: string;
  noResultsProps?: NoResultsProps;
  isLoading?: boolean;
  LoadingSkeleton?: React.ReactNode;
  Header?: React.ReactNode;
}

const ContentFrame: React.FC<ContentFrameProps> = ({
  contentVisible,
  children,
  className,
  noResultsProps,
  isLoading,
  LoadingSkeleton,
  Header
}) => {
  const { t } = useTranslation();

  return (
    <CardFrame className={className}>
      {!isLoading && Header && Header}
      {isLoading && !!LoadingSkeleton && LoadingSkeleton}
      {!isLoading && !contentVisible && (
        <NoResults message={t('common.no_results', 'There is no result.')} {...noResultsProps} />
      )}
      {!isLoading && contentVisible && children}
    </CardFrame>
  );
};

export default ContentFrame;
