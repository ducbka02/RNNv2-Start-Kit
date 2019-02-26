import { takeEvery } from 'redux-saga/effects';
import {
  isExistAccountSaga,
  createAccount,
  verifyCodeSaga,
  loginAccount,
  loginFacebook,
  autoAuthAccount,
  logOut,
  editProfileSaga,
  autoAuthFb,
  getPaymentInfoSaga,
  registerPaymentCardSaga,
  sendEmailSaga
} from './sagas';
import {
  CREATE_ACCOUNT,
  VERIFY_CODE,
  LOGIN_ACCOUNT,
  LOGIN_FACEBOOK,
  LOGOUT,
  AUTO_LOGIN_ACCOUNT,
  AUTO_LOGIN_FB,
  EDIT_PROFILE,
  IS_EXIST_ACCOUNT,
  GET_PAYMENT_INFO,
  REGISTER_PAYMENT_CARD,
  SEND_EMAIL,
} from '../../actions/accounts';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery([IS_EXIST_ACCOUNT], isExistAccountSaga);
  yield takeEvery([CREATE_ACCOUNT], createAccount);
  yield takeEvery([VERIFY_CODE], verifyCodeSaga);
  yield takeEvery([LOGIN_ACCOUNT], loginAccount);
  yield takeEvery([LOGIN_FACEBOOK], loginFacebook);
  yield takeEvery([LOGOUT], logOut);
  yield takeEvery([AUTO_LOGIN_ACCOUNT], autoAuthAccount);
  yield takeEvery([AUTO_LOGIN_FB], autoAuthFb);
  yield takeEvery([EDIT_PROFILE], editProfileSaga);
  yield takeEvery([GET_PAYMENT_INFO], getPaymentInfoSaga);
  yield takeEvery([REGISTER_PAYMENT_CARD], registerPaymentCardSaga);
  yield takeEvery([SEND_EMAIL], sendEmailSaga);
}
