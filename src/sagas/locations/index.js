import { takeEvery } from 'redux-saga/effects';
import { fetchAllLocations, getRoomsCurrentLocationSaga, updateCurrentSearchInfoSaga } from './sagas';
import { FETCH_ALL_LOCATIONS, UPDATE_CURRENT_SEARCH_INFO, GET_ROOMS_CURRENT_LOCATION } from '../../actions/locations';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery([FETCH_ALL_LOCATIONS], fetchAllLocations);
  yield takeEvery([GET_ROOMS_CURRENT_LOCATION], getRoomsCurrentLocationSaga);
  yield takeEvery([UPDATE_CURRENT_SEARCH_INFO], updateCurrentSearchInfoSaga);
}
