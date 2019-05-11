import { Record } from 'immutable';
import {
  all, takeLatest, put,
} from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

// #region ---> [ CONSTANTS ] <---
export const moduleName = 'converter';

const CONVERT_REQUEST = `${moduleName}/CONVERT_REQUEST`;
const CONVERT_ERROR = `${moduleName}/CONVERT_ERROR`;
const SET_PROGRESS = `${moduleName}/SET_PROGRESS`;
// #endregion ---< [ CONSTANTS ] >---

// #region ---> [ REDUCER ] <---
export const ReducerRecord = Record({
  progress: -1,
  error: null,
});

export default (state = new ReducerRecord(), action) => {
  const { type, payload, error } = action;

  switch (type) {
    case CONVERT_ERROR:
      return state.set('error', error);

    case SET_PROGRESS:
      return state.set('progress', payload);

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
    yield put({ type: SET_PROGRESS, payload: 0 });
    console.log(ipcRenderer);
  } catch (error) {
    yield put({ type: CONVERT_ERROR, error });
    yield put({ type: SET_PROGRESS, payload: -1 });
  }
}

export function* saga() {
  yield all([
    takeLatest(CONVERT_REQUEST, convertSaga),
  ]);
}
// #endregion ---< [ SAGAS ] >---
