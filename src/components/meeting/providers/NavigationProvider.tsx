import React, { useState, useContext, ReactNode } from 'react';

export type NavigationContextType = {
  // local state direct manipulation
  showNavbar: boolean;
  showRoster: boolean;
  showChat: boolean;
  showInfo: boolean;
  showPoll: boolean;
  // UI toggle functions
  toggleRoster: () => void;
  toggleChat: () => void;
  toggleNavbar: () => void;
  togglePoll: () => void;
  toggleInfo: () => void;
  openRoster: () => void;
  closeRoster: () => void;
  openChat: () => void;
  closeChat: () => void;
  openNavbar: () => void;
  closeNavbar: () => void;
  openPoll: () => void;
  closePoll: () => void;
};

type Props = {
  children: ReactNode;
};

const NavigationContext = React.createContext<NavigationContextType | null>(null);

export default ({ children }: Props) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showRoster, setShowRoster] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showPoll, setShowPoll] = useState(false);

  const toggleRoster = () => {
    setShowRoster((currentState) => !currentState);
    setShowChat(false);
    setShowPoll(false);
  };

  const toggleChat = () => {
    setShowChat((currentState) => !currentState);
    setShowRoster(false);
    setShowPoll(false);
  };

  const toggleNavbar = () => {
    setShowNavbar((currentState) => !currentState);
  };

  const toggleInfo = () => {
    setShowInfo((currentState) => !currentState);
  };

  const togglePoll = () => {
    setShowPoll((currentState) => !currentState);
    setShowRoster(false);
    setShowChat(false);
  };

  const openNavbar = (): void => {
    setShowNavbar(true);
  };

  const closeNavbar = (): void => {
    setShowNavbar(false);
  };

  const openRoster = (): void => {
    setShowRoster(true);
  };

  const closeRoster = (): void => {
    setShowRoster(false);
  };

  const openChat = (): void => {
    setShowChat(true);
  };

  const closeChat = (): void => {
    setShowChat(false);
  };

  const openPoll = (): void => {
    setShowPoll(true);
  };

  const closePoll = (): void => {
    setShowPoll(false);
  };

  const providerValue = {
    showNavbar,
    showRoster,
    showChat,
    showInfo,
    showPoll,
    toggleRoster,
    toggleChat,
    toggleNavbar,
    toggleInfo,
    togglePoll,
    openRoster,
    closeRoster,
    openChat,
    closeChat,
    openPoll,
    closePoll,
    openNavbar,
    closeNavbar
  };
  return <NavigationContext.Provider value={providerValue}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw Error('Use useNavigation in NavigationProvider');
  }
  return context;
};
