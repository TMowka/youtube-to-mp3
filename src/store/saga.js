import { all } from 'redux-saga/effects';
import { saga as converterSaga } from '../ducks/converter';

export default function* () {
  yield all([
    converterSaga(),
  ]);
}
