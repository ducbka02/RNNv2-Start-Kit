import { takeEvery } from 'redux-saga/effects';
import { launchCorrectFlow } from './sagas';
import { START_NAVIGATION, QR_NAVIGATION } from '../../actions/navigation';
import { CURRENT_ACCOUNT_ID_CHANGED } from '../../actions/accounts';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery([START_NAVIGATION, QR_NAVIGATION, CURRENT_ACCOUNT_ID_CHANGED], launchCorrectFlow);
}
