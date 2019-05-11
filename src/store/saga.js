import { all } from 'redux-saga/effects';
import { saga as converterSaga } from '../ducks/converter';
import { saga as configSaga } from '../ducks/config';

export default function* () {
  yield all([
    converterSaga(),
    configSaga(),
  ]);
}
