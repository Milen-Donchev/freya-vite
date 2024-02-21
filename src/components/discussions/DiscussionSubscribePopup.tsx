import React from 'react';
import { useNavigate } from 'react-router-dom';

import { QueryParams } from '@models/QueryParams';
import { useTranslation } from '@hooks/useTranslation';

import { MarketingPopup } from '@components/ui/popup/MarketingPopup';

interface DiscussionSubscribePopupProps {
  discussionId: number;
  isOpen: boolean;
  onClose: () => void;
}

const DiscussionSubscribePopup = ({
  discussionId,
  isOpen,
  onClose
}: DiscussionSubscribePopupProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onConfirm = () => {
    navigate(
      `/products?${QueryParams.SELLABLE_TYPE}=discussion&${QueryParams.SELLABLE_ID}=${discussionId}`
    );
  };

  return (
    <MarketingPopup
      data-testid="subscription-popup"
      show={isOpen}
      onHide={onClose}
      body={
        <div className="flex flex-col justify-content-center">
          <h2 className="fs-24 mb-18">
            {t('discussion.subscription_popup_title', 'Subscribe to this discussion')}
          </h2>
          <p className="fs-14 mb-40">
            {t(
              'discussion.subscription_popup_description',
              'By subscribing to this discussion You get exclusive rights to post questions, read private information and get access to private documents.'
            )}
          </p>
          <div onClick={onConfirm} className="btn btn-primary-500 btn-lg">
            {t('common.subscribe', 'Subscribe')}
          </div>
        </div>
      }
    />
  );
};

export default DiscussionSubscribePopup;
