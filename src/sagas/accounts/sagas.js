// @flow
/* eslint-disable no-use-before-define */
import { call, put, select } from 'redux-saga/effects';
import AccountsService from '../../services/api/accounts';

import {
  updateCurrentAccount,
  updateCurrentToken,
  currentAccountIdChanged,
  getPaymentInfoAction,
  updatePaymentInfoAction
} from '../../actions/accounts';
import { qrNavigation } from '../../actions/navigation';
import {
  fetchAllLocations,
  updateCurrentSearchInfo,
} from '../../actions/locations';

import { responseSuccess } from '../../utils/validateJson';
import { saveObject, removeObject, ENC_MAIL_KEY, ENC_PASS_KEY, ENC_FB_TOKEN_KEY } from '../../utils/asyncStorage';
import { alertCustom } from '../../global/alerts';

export function* getCurrentAccountInfo(): Generator<*, *, *> {
  const { accounts } = yield select();
  return accounts.accountStore;
}

export function* getCurrentAccountToken(): Generator<*, *, *> {
  const { accounts } = yield select();
  return accounts.currentToken;
}

export function* isExistAccountSaga(action): Generator<*, *, *> {
  try {
    const payload = yield call(AccountsService.isExistAccount, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch) {
      const result = payload.data.data.result;
      const message = payload.data.message;
      yield call(action.callback, successFetch, result, message);
    } else {
      yield call(action.callback, successFetch, -1);
    }
  } catch (err) {
    yield call(action.callback, false, -1);
  }
}

export function* createAccount(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.createAccount, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch === 0) {
      const message = payload.data.message;
      yield call(action.callback, successFetch);
      alertCustom('loginFail', payload.data.message, [
        {
          name: 'confirm',
        }]);
    } else if (successFetch === 1) {
      yield call(action.callback, successFetch, payload.data.data.id);
    }
  } catch (err) {
    yield call(action.callback, false, '');
  }
}

export function* verifyCodeSaga(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.verifyCode, action.data);
    const successFetch = responseSuccess(payload);
    let message = '';
    if (payload.data.message) {
      message = payload.data.message;
    }
    yield call(action.callback, successFetch, message);
  } catch (err) {
    yield call(action.callback, -1, '');
  }
}

export function* logOut(action): Generator<*, *, any> {
  yield call(removeObject, ENC_MAIL_KEY);
  yield call(removeObject, ENC_FB_TOKEN_KEY);
  yield put(updateCurrentAccount({}));
  yield put(updateCurrentToken(''));
  yield put(updateCurrentSearchInfo({}));
  yield put(updatePaymentInfoAction({}));
  yield call(AccountsService.sendTokenNotification, null);
  yield put(currentAccountIdChanged(null));
}

export function* loginAccount(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.loginAccount, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch) {
      yield call(saveObject, ENC_MAIL_KEY, action.data.email);
      yield call(saveObject, ENC_PASS_KEY, action.data.password);

      yield put(updateCurrentAccount(payload.data.data.user));
      yield put(updateCurrentToken(payload.data.data.token));
      yield put(fetchAllLocations());
      yield put(getPaymentInfoAction());
      yield put(currentAccountIdChanged(payload.data.data.user.id));
    } else {
      alertCustom('loginFail', payload.data.message, [
        {
          name: 'confirm',
        }]);
    }
    if (action.callback) {
      yield call(action.callback, successFetch);
    }
  } catch (err) {

  }
}

export function* loginFacebook(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.loginFacebook, action.token);
    const successFetch = responseSuccess(payload);
    if (successFetch) {
      if (payload.data.response === 'error') {
        if (action.callback) {
          alertCustom('loginFail', payload.data.message, [
            {
              name: 'confirm',
            }]);
          yield call(action.callback, false);
        }
      } else {
        yield call(saveObject, ENC_FB_TOKEN_KEY, action.token);

        yield put(updateCurrentAccount(payload.data.data.user));
        yield put(updateCurrentToken(payload.data.data.token));
        yield put(fetchAllLocations());
        yield put(getPaymentInfoAction());
        yield put(currentAccountIdChanged(payload.data.data.user.id));
        if (action.callback) {
          yield call(action.callback, true);
        }
      }
    } else {
      alertCustom('loginFail', payload.data.message, [
        {
          name: 'confirm',
        }]);
      if (action.callback) {
        yield call(action.callback, false);
      }
    }
  } catch (err) {

  }
}

export function* autoAuthAccount(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.loginAccount, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch) {
      yield put(updateCurrentAccount(payload.data.data.user));
      yield put(updateCurrentToken(payload.data.data.token));
      yield put(fetchAllLocations());
      yield put(getPaymentInfoAction());
      yield put(currentAccountIdChanged(payload.data.data.user.id));
    } else {
      yield call(logOut);
    }
  } catch (err) {
    yield call(logOut);
  }
}

export function* autoAuthFb(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.loginFacebook, action.token);
    const successFetch = responseSuccess(payload);
    if (successFetch) {
      yield put(updateCurrentAccount(payload.data.data.user));
      yield put(updateCurrentToken(payload.data.data.token));
      yield put(fetchAllLocations());
      yield put(currentAccountIdChanged(payload.data.data.user.id));
      yield put(getPaymentInfoAction());
    } else {
      yield call(logOut);
    }
  } catch (err) {
    yield call(logOut);
  }
}

export function* editProfileSaga(action): Generator<*, *, any> {
  try {
    const accountInfo = yield call(getCurrentAccountInfo);
    const payload = yield call(AccountsService.editProfile, action.data, accountInfo.id);
    const successFetch = responseSuccess(payload);
    if (successFetch === 1) {
      yield put(updateCurrentAccount(payload.data.data.user));
    } else if (successFetch === -1) {
      yield put(qrNavigation({ ...payload.data.data, status: 1 }));
    } else if (successFetch === -2) {
      yield put(qrNavigation({ ...payload.data.data, status: 2 }));
    }
    yield call(action.callback, successFetch);
  } catch (err) {

  }
}

export function* getPaymentInfoSaga(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.getPaymentInfo);
    const successFetch = responseSuccess(payload);
    if (successFetch === 1) {
      if (payload.data.data.status === 0) {
        yield put(updatePaymentInfoAction(payload.data.data.data_card));
      }
    } else if (successFetch === -1) {
      yield put(qrNavigation({ ...payload.data.data, status: 1 }));
    } else if (successFetch === -2) {
      yield put(qrNavigation({ ...payload.data.data, status: 2 }));
    }
  } catch (err) {

  }
}

export function* registerPaymentCardSaga(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.registerPaymentCard, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch === 1) {
      if (payload.data.data.data_card) {
        yield put(updatePaymentInfoAction(payload.data.data.data_card));
      }
    }
    yield call(action.callback, successFetch, payload.data.message);
  } catch (err) {

  }
}

export function* sendEmailSaga(action): Generator<*, *, any> {
  try {
    const payload = yield call(AccountsService.sendEmail, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch === 1) {
      if (payload.data.message) {
        alertCustom('confirm', payload.data.message, [
          {
            name: 'confirm',
          }]);
      }
    } else if (successFetch === 0) {
      if (payload.data.message) {
        alertCustom('loginFail', payload.data.message, [
          {
            name: 'confirm',
          }]);
      }
    } else if (successFetch === -1) {
      yield put(qrNavigation({ ...payload.data.data, status: 1 }));
    } else if (successFetch === -2) {
      yield put(qrNavigation({ ...payload.data.data, status: 2 }));
    }
    yield call(action.callback, successFetch);
  } catch (err) {

  }
}

