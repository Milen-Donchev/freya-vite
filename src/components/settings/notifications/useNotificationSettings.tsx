import React, { useMemo } from 'react';

import { useTranslation } from '@hooks/useTranslation';

import NewsletterSettings from './NewsletterSettings';
import InvitationSettings from './InvitationSettings';

export const useNotificationSettings = () => {
  const { t } = useTranslation();

  const settings = useMemo(
    () =>
      [
        // {
        //   key: 'new_messages',
        //   title: t('settings.notifications_new_messages_title', 'New messages'),
        //   subtitle: t(
        //     'settings.notifications_new_messages_subtitle',
        //     'Notifications when you have received a message.'
        //   ),
        //   Component: <></>
        // },
        // {
        //   key: 'new_followers',
        //   title: t('settings.notifications_new_followers_title', 'New followers'),
        //   subtitle: t(
        //     'settings.notifications_new_followers_subtitle',
        //     'Notifications when you have been invited to connect or your follow request has been accepted.'
        //   ),
        //   Component: <></>
        // },
        // {
        //   key: 'new_comment',
        //   title: t('settings.notifications_new_comment_title', 'New comments on my content'),
        //   subtitle: t(
        //     'settings.notifications_new_comments_subtitle',
        //     'Notifications when your content receives a comment.'
        //   ),
        //   Component: <></>
        // },
        // {
        //   key: 'comment_replies',
        //   title: t('settings.notifications_comment_replies_title', 'Comment replies'),
        //   subtitle: t(
        //     'settings.notifications_comment_replies_subtitle',
        //     'Notifications when you receive a comment reply.'
        //   ),
        //   Component: <></>
        // },
        // {
        //   key: 'mentions',
        //   title: t('settings.notifications_mentions_title', 'Mentions'),
        //   subtitle: t(
        //     'settings.notifications_mentions_subtitle',
        //     'Notifications when you have been mentioned in a post or comment.'
        //   ),
        //   Component: <></>
        // },
        // {
        //   key: 'new_group_content',
        //   title: t('settings.notifications_new_group_content_title', 'New group content'),
        //   subtitle: t(
        //     'settings.notifications_new_group_content_subtitle',
        //     'Notifications for content updates in groups you are a member of.'
        //   ),
        //   Component: <></>
        // },
        {
          key: 'newsletter',
          title: t('settings.notifications_newsletter_title', 'Newsletter'),
          subtitle: t(
            'settings.notifications_newsletter_subtitle_listing',
            'Subscribe to our newsletter including helpful information by providing your email address or phone number.'
          ),
          Component: <NewsletterSettings />
        },
        {
          key: 'invites',
          title: t('settings.notifications_invites_title', 'Invites'),
          subtitle: t(
            'settings.notifications_invites_subtitle_listing',
            'Receive invites per email or phone number for a variety of personalized events, games, groups and other activities.'
          ),
          Component: <InvitationSettings />
        }
      ] as const,
    []
  );

  return { settings };
};

export type SettingKey = ReturnType<typeof useNotificationSettings>['settings'][number]['key'];
