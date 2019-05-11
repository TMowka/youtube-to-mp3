import { Record } from 'immutable';
import {
  all, takeLatest, put, call,
} from 'redux-saga/effects';
import ytdl from 'ytdl-core';

// #region ---> [ CONSTANTS ] <---
export const moduleName = 'converter';

const CONVERT_REQUEST = `${moduleName}/CONVERT_REQUEST`;
const CONVERT_ERROR = `${moduleName}/CONVERT_ERROR`;
// #endregion ---< [ CONSTANTS ] >---

// #region ---> [ REDUCER ] <---
export const ReducerRecord = Record({
  progress: -1,
  bitRate: 160,
  downloadsFolder: '',
  error: null,
});

export default (state = new ReducerRecord(), action) => {
  const { type, error } = action;

  switch (type) {
    case CONVERT_ERROR:
      return state.set('error', error);

    default:
      return state;
  }
};
// #endregion ---< [ REDUCER ] >---

// #region ---> [ SELECTORS ] <---
// #endregion ---< [ SELECTORS ] >---

// #region ---> [ ACTION CREATORS ] <---
export const convert = ({ link }) => {
  const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = link.match(regex);
  let id;

  if (match && match[7].length === 11) {
    id = match[7]; // eslint-disable-line prefer-destructuring
  }

  return ({
    type: CONVERT_REQUEST,
    payload: { id },
  });
};
// #endregion ---< [ ACTION CREATORS ] >---

// #region ---> [ SAGAS ] <---
export function* convertSaga({ payload: { id } }) {
  try {
    console.log('id', id);
    const info = yield call(ytdl.getInfo, id);
    console.log('info', info);
  } catch (error) {
    yield put({ type: CONVERT_ERROR, error });
  }
}

export function* saga() {
  yield all([
    takeLatest(CONVERT_REQUEST, convertSaga),
  ]);
}
// #endregion ---< [ SAGAS ] >---
