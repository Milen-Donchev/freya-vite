import React, { useState, useContext, ReactNode } from 'react';

export type DeviceSettingsContextType = {
  showDeviceSettings: boolean;
  showCamera: boolean;
  showModal: boolean;
  meetingStarted: boolean;
  meetingLeft: boolean;
  maximize: boolean;
  meetingName: string;
  openDeviceSettings: () => void;
  closeDeviceSettings: () => void;
  toggleDeviceSettings: () => void;
  openCamera: () => void;
  closeCamera: () => void;
  toggleCamera: () => void;
  openInMeeting: () => void;
  leftInMeeting: () => void;
  unleftInMeeting: () => void;
  toggleModal: () => void;
  toggleMaximize: () => void;
  setMeetingName: (n: string) => void;
};

type Props = {
  children: ReactNode;
};

const DeviceSettingsContext = React.createContext<DeviceSettingsContextType | null>(null);

export default ({ children }: Props) => {
  const [showDeviceSettings, setShowDeviceSettings] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [maximize, setMaximize] = useState<boolean>(false);
  const [meetingStarted, setMeetingStarted] = useState<boolean>(false);
  const [meetingLeft, setMeetingLeft] = useState<boolean>(false);
  const [meetingName, setMeetingName] = useState<string>('');

  const openDeviceSettings = (): void => {
    setShowDeviceSettings(true);
  };

  const closeDeviceSettings = (): void => {
    setShowDeviceSettings(false);
  };

  const openCamera = (): void => {
    setShowCamera(true);
  };

  const closeCamera = (): void => {
    setShowCamera(false);
  };

  const toggleCamera = (): void => {
    setShowCamera(!showCamera);
  };

  const toggleDeviceSettings = (): void => {
    setShowDeviceSettings(!showDeviceSettings);
  };

  const openInMeeting = (): void => {
    setMeetingStarted(true);
  };

  const leftInMeeting = (): void => {
    setMeetingLeft(true);
    setMeetingStarted(false);
  };

  const unleftInMeeting = (): void => {
    setMeetingLeft(false);
  };

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

  const toggleMaximize = (): void => {
    setMaximize(!maximize);
  };

  const providerValue = {
    showDeviceSettings,
    showCamera,
    openDeviceSettings,
    closeDeviceSettings,
    toggleDeviceSettings,
    openCamera,
    closeCamera,
    toggleCamera,
    showModal,
    toggleModal,
    meetingLeft,
    meetingStarted,
    openInMeeting,
    leftInMeeting,
    unleftInMeeting,
    maximize,
    toggleMaximize,
    meetingName,
    setMeetingName
  };

  return (
    <DeviceSettingsContext.Provider value={providerValue}>
      {children}
    </DeviceSettingsContext.Provider>
  );
};

export const useDeviceSettings = (): DeviceSettingsContextType => {
  const context = useContext(DeviceSettingsContext);
  if (!context) {
    throw Error('Use useDeviceSettings in DeviceSettingsProvider');
  }
  return context;
};
