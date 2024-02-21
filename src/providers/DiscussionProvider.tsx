import React, { createContext, useContext, type ReactNode } from 'react';

import type { Discussion } from '@freya/types';

import { discussionMock } from '@freya/test-utils/mocks/discussionMock';

const DiscussionContext = createContext<{ discussion: Discussion }>({
  discussion: discussionMock
});

export const DiscussionProvider = ({
  discussion,
  children
}: {
  discussion: Discussion;
  children: ReactNode;
}) => {
  return <DiscussionContext.Provider value={{ discussion }}>{children}</DiscussionContext.Provider>;
};

export const useDiscussion = () => useContext(DiscussionContext);
