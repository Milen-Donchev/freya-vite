import get from 'lodash/get';
import map from 'lodash/map';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '@store';
import { useTranslation } from '@hooks/useTranslation';
import { type Consent, setCurrentUser } from '@store/currentUserSlice';
import { useSetUserConsentsMutation } from '@store/api/profileApi';

import { ConfirmationPopup } from '@components/ui/popup/ConfirmationPopup';

const InvitationSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.currentUserSlice.currentUser);
  const [updateConsents] = useSetUserConsentsMutation();

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const consents = get(currentUser, 'consents', []);
  const invitationConsent = consents.find((c) => c.consent === 'invitation');
  const invitationValue = invitationConsent ? invitationConsent.value : false;
  const openConfirmation = () => setIsConfirmationVisible(true);
  const closeConfirmation = () => setIsConfirmationVisible(false);

  const handleConfirm = () => {
    const oldCurrentUser = { ...currentUser };
    const newConsents = map(consents, (c) => {
      if (c && c.consent === 'invitation') {
        return { ...c, value: !invitationValue };
      }
      return c;
    });
    !invitationConsent &&
      newConsents.push({ consent: 'invitation', value: !invitationValue } as Consent);
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
            {t('settings.notifications_invites_title', 'Invites')}
          </h3>
          <div className="form-check form-switch position-absolute top-0 end-0 position-sm-static">
            <label className="form-check-label d-none d-sm-inline" htmlFor="invitation-toggle">
              {invitationValue ? t('common.turned_on', 'On') : t('common.turned_off', 'Off')}
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              value=""
              id="invitation-toggle"
              checked={invitationValue}
              onChange={openConfirmation}
            />
          </div>
        </div>

        <p className="mb-24 text-gray-300 mw-sm-75">
          {t(
            'settings.notifications_invites_subtitle',
            'Receive invites per email or phone number for a variety of personalized events, games, groups and other activities, which have been based on your own activity. They will allow you to keep track of everything that is happening in the platform. Invites may include marketing content or advertisements.'
          )}
        </p>
      </div>

      <ConfirmationPopup
        onConfirm={handleConfirm}
        onHide={closeConfirmation}
        show={isConfirmationVisible}
        size="sm"
        title={t('settings.invitation_change_confirmation_title', 'Invitations')}
        body={t(
          'settings.invitation_change_confirmation_body',
          'Are you sure you wish to change your invitation settings?'
        )}
      />
    </>
  );
};

export default InvitationSettings;
