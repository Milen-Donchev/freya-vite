export interface AudioInputControlProps {
  muteLabel?: string;
  unmuteLabel?: string;
  mutedIconTitle?: string;
  unmutedIconTitle?: string;
  enabled?: boolean;
}

export interface AudioOutputControlProps {}

export interface ContentShareControlProps {
  label?: string;
  pauseLabel?: string;
  unpauseLabel?: string;
  iconTitle?: string;
  enabled?: boolean;
}

export interface VideoInputControlProps {
  label?: string;
  enabled?: boolean;
}
