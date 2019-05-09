export const isRequired = value => (value ? null : 'Field is required');

export const isYoutubeLink = (value) => {
  const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;

  if (!regex.test(value)) {
    return 'Invalid youtube link';
  }

  return null;
};
