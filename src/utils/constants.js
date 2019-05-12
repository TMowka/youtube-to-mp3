const outputChannelName = 'NODE';
const inputChannelName = 'WINDOW';

export const OUTPUT_CHANNEL = {
  CONVERT: `${outputChannelName}-convert`,
};

export const INPUT_CHANNEL = {
  SET_PROGRESS: `${inputChannelName}-set-progress`,
  SET_STEP: `${inputChannelName}-set-step`,
};

export const CONVERT_STEP = {
  DOWNLOADING: 'downloading',
  CONVERTING: 'converting',
};
