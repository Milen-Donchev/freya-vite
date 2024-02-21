import { DiscussionParticipantType } from '@models/Discussion';

export const checkIsDiscussionAdmin = (participantType: string) => {
  return (
    participantType === DiscussionParticipantType.CREATOR ||
    participantType === DiscussionParticipantType.MODERATOR ||
    participantType === DiscussionParticipantType.ADMINISTRATOR
  );
};
