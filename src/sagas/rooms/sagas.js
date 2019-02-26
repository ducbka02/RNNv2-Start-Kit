// @flow
/* eslint-disable no-use-before-define */
import { call, put, select } from 'redux-saga/effects';
import RoomsService from '../../services/api/rooms';

import {
} from '../../actions/rooms';
import {
  fetchAllLocations,
  updateCurrentSearchInfo,
} from '../../actions/locations';
import { qrNavigation } from '../../actions/navigation';
import { launchLoggedInFlow } from '../navigation/sagas';

import { responseSuccess } from '../../utils/validateJson';
import { saveObject, removeObject, ENC_MAIL_KEY, ENC_PASS_KEY, ENC_FB_TOKEN_KEY } from '../../utils/asyncStorage';
import { alertCustom } from '../../global/alerts';

export function* updateCurrentRoomChoiceSaga(): Generator<*, *, *> {
  const { accounts } = yield select();
  return accounts.accountStore;
}

export function* booksRoomSaga(action): Generator<*, *, *> {
  try {
    const payload = yield call(RoomsService.booksRoom, action.data);
    const successFetch = responseSuccess(payload);
    if (successFetch === 1) {

    } else if (successFetch === 0) {
      alertCustom('loginFail', payload.data.message, [
        {
          name: 'confirm',
        }]);
    } else if (successFetch === -1) {
      yield put(qrNavigation({ ...payload.data.data, status: 1 }));
    } else if (successFetch === -2) {
      yield put(qrNavigation({ ...payload.data.data, status: 2 }));
    }
    yield call(action.callback, successFetch);
  } catch (err) {

  }
}

export function* cancelPaymentSaga(action): Generator<*, *, *> {
  try {
    const payload = yield call(RoomsService.cancelPayment, action.data);
    const successFetch = responseSuccess(payload);
    yield call(action.callback, successFetch, payload.data.data.cancel_fee);
    if (action.data.status === 1) {
      if (successFetch === 1) {
        alertCustom('confirm', payload.data.message, [
          {
            name: 'confirm',
          }]);
      } else if (successFetch === 0) {
        alertCustom('loginFail', payload.data.message, [
          {
            name: 'confirm',
          }]);
      } else if (successFetch === -1) {
        yield put(qrNavigation({ ...payload.data.data, status: 1 }));
      } else if (successFetch === -2) {
        yield put(qrNavigation({ ...payload.data.data, status: 2 }));
      }
    }
  } catch (err) {

  }
}

export function* checkInSaga(action): Generator<*, *, *> {
  try {
    const payload = yield call(RoomsService.checkIn, action.data);
    const successFetch = responseSuccess(payload);
    yield call(action.callback, successFetch, payload.data.message, payload.data.data);
  } catch (err) {

  }
}

export function* checkOutSaga(action): Generator<*, *, *> {
  try {
    const payload = yield call(RoomsService.checkOut, action.data);
    //console.warn(payload)
    const successFetch = responseSuccess(payload);
    yield call(action.callback, successFetch, payload.data.message, payload.data.data);
  } catch (err) {

  }
}