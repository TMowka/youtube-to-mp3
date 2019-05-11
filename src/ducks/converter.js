import { Record } from 'immutable';
import {
  all, takeLatest, put, call, take, select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { ipcRenderer } from 'electron';
import { OUTPUT, INPUT } from '../utils/constants';
import { stateSelector as configStateSelector } from './config';

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
export const stateSelector = state => state[moduleName];
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
function* convertSaga({ payload: { id } }) {
  try {
    const { bitRate, downloadFolder } = yield select(configStateSelector);
    yield put({ type: SET_PROGRESS, payload: 0 });
    yield call([ipcRenderer, ipcRenderer.send], OUTPUT.CONVERT, id, downloadFolder, bitRate);
  } catch (error) {
    yield put({ type: CONVERT_ERROR, error });
    yield put({ type: SET_PROGRESS, payload: -1 });
  }
}

const createSetProgressChannel = () => eventChannel((emit) => {
  ipcRenderer.on(INPUT.SET_PROGRESS, (event, progress) => emit({ progress }));
});

function* watchSetProgress() {
  const channel = yield call(createSetProgressChannel);

  while (true) {
    const { progress } = yield take(channel);

    yield put({ type: SET_PROGRESS, payload: progress });
  }
}

export function* saga() {
  yield all([
    watchSetProgress(),
    takeLatest(CONVERT_REQUEST, convertSaga),
  ]);
}
// #endregion ---< [ SAGAS ] >---
