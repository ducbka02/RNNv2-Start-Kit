// @flow

import { all, call } from 'redux-saga/effects';
import navigation from './navigation';
import accounts from './accounts';
import locations from './locations';
import rooms from './rooms';
/**
 * @desc Root saga.
 * @return {void}
 */
export default function* rootSaga() {
  yield all([
    call(navigation),
    call(accounts),
    call(locations),
    call(rooms),
  ]);
}
