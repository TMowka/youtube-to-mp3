import { Record } from 'immutable';
import { all } from 'redux-saga/effects';

// #region ---> [ CONSTANTS ] <---
export const moduleName = 'config';

const SET_BIT_RATE = `${moduleName}/SET_BIT_RATE`;
const SET_DOWNLOAD_FOLDER = `${moduleName}/SET_DOWNLOAD_FOLDER`;
const RESET = `${moduleName}/RESET`;
// #endregion ---< [ CONSTANTS ] >---

// #region ---> [ REDUCER ] <---
export const ReducerRecord = Record({
  bitRate: 160,
  downloadFolder: '',
});

export default (state = new ReducerRecord(), action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BIT_RATE:
      return state.set('bitRate', payload);

    case SET_DOWNLOAD_FOLDER:
      return state.set('downloadFolder', payload);

    case RESET:
      return new ReducerRecord();

    default:
      return state;
  }
};
// #endregion ---< [ REDUCER ] >---

// #region ---> [ SELECTORS ] <---
export const stateSelector = state => state[moduleName];
// #endregion ---< [ SELECTORS ] >---

// #region ---> [ ACTION CREATORS ] <---
export const setBitRate = bitRate => ({
  type: SET_BIT_RATE,
  payload: bitRate,
});

export const setDownloadFolder = path => ({
  type: SET_DOWNLOAD_FOLDER,
  payload: path,
});

export const reset = () => ({
  type: RESET,
});
// #endregion ---< [ ACTION CREATORS ] >---

// #region ---> [ SAGAS ] <---
export function* saga() {
  yield all([
  ]);
}
// #endregion ---< [ SAGAS ] >---
