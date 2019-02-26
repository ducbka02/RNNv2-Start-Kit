// @flow
export const GET_FACEBOOK_DATA = 'GET_FACEBOOK_DATA';
export const IS_EXIST_ACCOUNT = 'IS_EXIST_ACCOUNT';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const VERIFY_CODE = 'VERIFY_CODE';
export const AUTO_LOGIN_ACCOUNT = 'AUTO_LOGIN_ACCOUNT';
export const AUTO_LOGIN_FB = 'AUTO_LOGIN_FB';
export const LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
export const LOGIN_FACEBOOK = 'LOGIN_FACEBOOK';
export const LOGOUT = 'LOGOUT';
export const UPDATE_TAB_INDEX = 'UPDATE_TAB_INDEX';
export const UPDATE_CURRENT_VIEW = 'UPDATE_CURRENT_VIEW';
export const UPDATE_CURRENT_ACCOUNT = 'UPDATE_CURRENT_ACCOUNT';
export const UPDATE_CURRENT_TOKEN = 'UPDATE_CURRENT_TOKEN';
export const CURRENT_ACCOUNT_ID_CHANGED = 'CURRENT_ACCOUNT_ID_CHANGED';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const GET_PAYMENT_INFO = 'GET_PAYMENT_INFO';
export const REGISTER_PAYMENT_CARD = 'REGISTER_PAYMENT_CARD';
export const UPDATE_PAYMENT_INFO = 'UPDATE_PAYMENT_INFO';
export const SEND_EMAIL = 'SEND_EMAIL';

export type CreateAccountAction = { +type: 'CREATE_ACCOUNT' };
export type LoginAccountAction = { +type: 'LOGIN_ACCOUNT' };
export type CurrentAccountIdChangedAction = { +type: 'CURRENT_ACCOUNT_ID_CHANGED', currentAccountId: string | null };


export function getFacebookUserData(data) {
  console.warn(data);
  return {
    type: GET_FACEBOOK_DATA,
    data
  };
}

export function isExistAccount(data, callback) {
  return {
    type: IS_EXIST_ACCOUNT,
    data,
    callback,
  };
}

export function verifyCodeAction(data, callback) {
  return {
    type: VERIFY_CODE,
    data,
    callback,
  };
}

export function createAccount(data, callback) {
  return {
    type: CREATE_ACCOUNT,
    data,
    callback,
  };
}

export function autoLoginAccount(data) {
  return {
    type: AUTO_LOGIN_ACCOUNT,
    data
  };
}

export function autoLoginFb(token) {
  return {
    type: AUTO_LOGIN_FB,
    token
  };
}

export function loginAccount(data, callback) {
  return {
    type: LOGIN_ACCOUNT,
    data,
    callback
  };
}

export function loginFacebook(token, callback) {
  return {
    type: LOGIN_FACEBOOK,
    token,
    callback
  };
}


export function logout() {
  return {
    type: LOGOUT
  };
}

export function updateCurrentAccount(data) {
  return {
    type: UPDATE_CURRENT_ACCOUNT,
    data,
  };
}

export function updateCurrentToken(data) {
  return {
    type: UPDATE_CURRENT_TOKEN,
    data,
  };
}

export function currentAccountIdChanged(currentAccountId: string | null): CurrentAccountIdChangedAction {
  return {
    type: CURRENT_ACCOUNT_ID_CHANGED,
    currentAccountId
  };
}

export function editProfileAction(data, callback) {
  return {
    type: EDIT_PROFILE,
    data,
    callback,
  };
}

export function updateTabIndexAction(data) {
  return {
    type: UPDATE_TAB_INDEX,
    data,
  };
}

export function getPaymentInfoAction() {
  return {
    type: GET_PAYMENT_INFO,
  };
}

export function registerPaymentCard(data, callback) {
  return {
    type: REGISTER_PAYMENT_CARD,
    data,
    callback
  };
}

export function updatePaymentInfoAction(data, callback) {
  return {
    type: UPDATE_PAYMENT_INFO,
    data,
    callback
  };
}

export function updateCurrentViewAction(data) {
  return {
      type: UPDATE_CURRENT_VIEW,
      data
  };
}

export function sendEmailAction(data, callback) {
  return {
      type: SEND_EMAIL,
      data, 
      callback
  };
}