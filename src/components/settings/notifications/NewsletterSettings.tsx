import get from 'lodash/get';
import map from 'lodash/map';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@store';
import { useTranslation } from '@hooks/useTranslation';
import { type Consent, setCurrentUser } from '@store/currentUserSlice';
import { useSetUserConsentsMutation } from '@store/api/profileApi';

import { ConfirmationPopup } from '@components/ui/popup/ConfirmationPopup';

const NewsletterSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.currentUserSlice.currentUser);
  const [updateConsents] = useSetUserConsentsMutation();

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const consents = get(currentUser, 'consents', []);
  const newsletterConsent = consents.find((c) => c.consent === 'newsletter');
  const newsletterValue = newsletterConsent ? newsletterConsent.value : false;
  const openConfirmation = () => setIsConfirmationVisible(true);
  const closeConfirmation = () => setIsConfirmationVisible(false);

  const handleConfirm = () => {
    const oldCurrentUser = { ...currentUser };
    const newConsents = map(consents, (c) => {
      if (c && c.consent === 'newsletter') {
        return { ...c, value: !newsletterValue };
      }
      return c;
    });
    !newsletterConsent &&
      newConsents.push({ consent: 'newsletter', value: !newsletterValue } as Consent);
    closeConfirmation();
    dispatch(setCurrentUser({ consents: newConsents }));
    updateConsents({
      id: currentUser!.id,
      formData: newConsents
    })
      .unwrap()
      .catch(() => dispatch(setCurrentUser(oldCurrentUser)));
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center">
          <h3 className="flex-fill d-none d-sm-block">
            {t('settings.notifications_newsletter_title', 'Newsletter')}
          </h3>
          <div className="form-check form-switch position-absolute top-0 end-0 position-sm-static">
            <label className="form-check-label d-none d-sm-inline" htmlFor="newsletter-toggle">
              {newsletterValue ? t('common.turned_on', 'On') : t('common.turned_off', 'Off')}
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              value=""
              id="newsletter-toggle"
              checked={newsletterValue}
              onChange={openConfirmation}
            />
          </div>
        </div>

        <p className="mb-24 text-gray-300 mw-sm-75">
          {t(
            'settings.notifications_newsletter_subtitle',
            `Subscribe to our periodic newsletter featuring helpful information per email or phone number. 
              The newsletter includes articles, news, discussion content, events and other topics, 
              which have been carefully selected based on your own prefferences. 
              The newsletter may include marketing content or advertisements.`
          )}
        </p>
      </div>

      <ConfirmationPopup
        onConfirm={handleConfirm}
        onHide={closeConfirmation}
        show={isConfirmationVisible}
        size="sm"
        title={t('settings.newsletter_change_confirmation_title', 'Newsletter subscription')}
        body={t(
          'settings.newsletter_change_confirmation_body',
          'Are you sure you wish to change your newsletter subscription?'
        )}
      />
    </>
  );
};

export default NewsletterSettings;
