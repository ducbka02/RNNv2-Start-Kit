// @flow
/* eslint-disable no-use-before-define */
import { call, put, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import LocationService from '../../services/api/location';

import {
  locationsUpdated,
  roomsListUpdated,
} from '../../actions/locations';
import {
  qrNavigation
} from '../../actions/navigation';
import {
  getCurrentAccountToken
} from '../accounts/sagas';

import { responseSuccess } from '../../utils/validateJson';

export function* fetchAllLocations() {
  const token = yield call(getCurrentAccountToken);

  const payload = yield call(LocationService.getAllLocations, token);
  const successFetch = responseSuccess(payload);
  if (successFetch === 1) {
    const locations = payload.data.data;
    yield put(locationsUpdated(locations));
  }
}

export function* getRoomsCurrentLocationSaga(action) {
  yield put(roomsListUpdated([]));
  const payload = yield call(LocationService.getRoomsListByCurrentLocation, action.data);
  const successFetch = responseSuccess(payload);
  //console.warn(successFetch);
  if (successFetch === 1) {
    const locations = payload.data.data.list_room;
    yield put(roomsListUpdated(locations));
  } else if (successFetch === 0) {
    yield put(roomsListUpdated([]));
  } else {
    yield put(roomsListUpdated([]));
  }
  if (action.callback) {
    yield call(action.callback, successFetch);
  }
}

export function* updateCurrentSearchInfoSaga(action) {
  const { locations } = yield select();
  const currentSearchInfo = locations.currentSearchInfo;
  if (!isEmpty(currentSearchInfo)) {
    const payload = yield call(LocationService.getRoomsListByLocation, currentSearchInfo);
    const successFetch = responseSuccess(payload);
    let rooms = [];
    if (successFetch === 1) {
      rooms = payload.data.data;
    } else if (successFetch === -1) {
      //yield put(qrNavigation({ ...payload.data.data, status: 1 }));
    } else if (successFetch === -2) {
      //yield put(qrNavigation({ ...payload.data.data, status: 2 }));
    }
    yield put(roomsListUpdated(rooms));
    if (action.callback) {
      yield call(action.callback, successFetch);
    }
  }
}