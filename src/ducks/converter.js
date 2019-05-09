import { Record } from 'immutable';
import { all } from 'redux-saga/effects';

// #region ---> [ CONSTANTS ] <---
export const moduleName = 'converter';
// #endregion ---< [ CONSTANTS ] >---

// #region ---> [ REDUCER ] <---
export const ReducerRecord = Record({
});

export default (state = new ReducerRecord(), action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
// #endregion ---< [ REDUCER ] >---

// #region ---> [ SELECTORS ] <---
// #endregion ---< [ SELECTORS ] >---

// #region ---> [ ACTION CREATORS ] <---
// #endregion ---< [ ACTION CREATORS ] >---

// #region ---> [ SAGAS ] <---
export function* saga() {
  yield all([
  ]);
}
// #endregion ---< [ SAGAS ] >---
