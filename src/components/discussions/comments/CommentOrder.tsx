import React from 'react';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { createSearchParams, useNavigate } from 'react-router-dom';

import type { FilterOption } from '@types';

import { useQueryParams } from '@hooks/useQueryParams';
import { useTranslation } from '@hooks/useTranslation';
import { useComments } from '@providers/CommentsProvider';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

import CustomSelect from '@components/ui/select-field/CustomSelect';

interface CommentOrderProps {
  isDisabled?: boolean;
}

const CommentOrder = (props: CommentOrderProps) => {
  const { t } = useTranslation();
  const translate = useTranslatedAttribute();
  const { comments, orderComment, filterOptions } = useComments();
  const { getParam } = useQueryParams();

  const { isDisabled = false } = props;

  const navigate = useNavigate();

  const handleChange = (option: FilterOption | null) => {
    if (option && option.slug) {
      orderComment(option.slug);

      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          order_by: option.slug
        }).toString()
      });
    }
  };

  return (
    <>
      {!isEmpty(comments) && (
        <div className="d-flex justify-content-end mb-20">
          <CustomSelect<FilterOption, false>
            name="comments-sorting"
            value={find(filterOptions, ({ slug }) => isEqual(slug, getParam('ORDER_COMMENT_BY')))}
            getOptionLabel={({ title }) => translate(title)}
            getOptionValue={({ slug }) => slug}
            options={filterOptions}
            onChange={handleChange}
            placeholder={t('comment.order_by', 'Order by')}
            className="compact"
            isDisabled={isDisabled}
          />
        </div>
      )}
    </>
  );
};

export default CommentOrder;
