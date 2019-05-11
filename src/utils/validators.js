// eslint-disable-next-line import/prefer-default-export
export const isYoutubeLink = (value) => {
  const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;

  return regex.test(value);
};
