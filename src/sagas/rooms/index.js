import { takeEvery } from 'redux-saga/effects';
import {
  updateCurrentRoomChoiceSaga,
  booksRoomSaga,
  cancelPaymentSaga,
  checkInSaga,
  checkOutSaga
} from './sagas';
import {
  UPDATE_CURRENT_ROOM_CHOICE, BOOKS_ROOM, CANCEL_PAYMENT, CHECK_IN, CHECK_OUT,
} from '../../actions/rooms';

/**
 * @desc Root navigation saga. Handles showing of correct screens flow.
 * @return {void}
 */
export default function* rootSaga() {
  yield takeEvery([UPDATE_CURRENT_ROOM_CHOICE], updateCurrentRoomChoiceSaga);
  yield takeEvery([BOOKS_ROOM], booksRoomSaga);
  yield takeEvery([CANCEL_PAYMENT], cancelPaymentSaga);
  yield takeEvery([CHECK_IN], checkInSaga);
  yield takeEvery([CHECK_OUT], checkOutSaga);
}
