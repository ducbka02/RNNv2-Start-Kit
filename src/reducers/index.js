// @flow

import { combineReducers } from 'redux';
import accounts from './accounts';
import locations from './locations';
import rooms from './rooms';
import navigation from './navigation';

export const subReducers = {
  accounts,
  locations,
  rooms,
  navigation
};

export default combineReducers(subReducers);
