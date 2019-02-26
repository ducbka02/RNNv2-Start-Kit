// @flow
/* eslint-disable no-use-before-define */
import { Platform } from 'react-native'; 
import { call, put, select } from 'redux-saga/effects';
import { Navigation, NativeEventsReceiver } from 'react-native-navigation';

import { appStyle, screen, tabsStyle, drawerStyle } from '../../global/Screens';

import { doneQRNavigation } from '../../actions/navigation';
import { CURRENT_ACCOUNT_ID_CHANGED, autoLoginAccount, autoLoginFb, loginAccount, loginFacebook } from '../../actions/accounts';

import { readObject, ENC_MAIL_KEY, ENC_PASS_KEY, ENC_FB_TOKEN_KEY } from '../../utils/asyncStorage';
import { START_NAVIGATION } from '../../actions/navigation';
import { alertCustom } from '../../global/alerts';
/**
 * @desc Launch correct flow based on current account id.
 * @param {CurrentAccountIdChangedAction} action An action.
 * @return {void}
 */
export function* launchCorrectFlow(action): Generator<*, *, any> {
  //yield call(launchLoggedOutFlow);
  if (action.type === CURRENT_ACCOUNT_ID_CHANGED) {
    let currentAccountId = null;
    ({ currentAccountId } = action);
    if (currentAccountId === null) {
      yield call(launchLoggedOutFlow);
    } else {
      yield call(launchLoggedInFlow);
    }
  } else if (action.type === START_NAVIGATION) {
    const email = yield call(readObject, ENC_MAIL_KEY);
    const password = yield call(readObject, ENC_PASS_KEY);
    const fbToken = yield call(readObject, ENC_FB_TOKEN_KEY);

    if (email) {
      yield put(autoLoginAccount({ email, password }));
    } else if (fbToken) {
      yield put(autoLoginFb(fbToken));
    } else {
      yield call(launchLoggedOutFlow);
    }
  } else {
    yield call(doneQRNavigation, true);
    yield call(launchQRCodeFlow, action.data);
  }
}

/**
 * @desc Launch logged in flow of the app.
 * @return {void}
 */
export function* launchLoggedInFlow(): Generator<*, *, any> {
  Navigation.startSingleScreenApp({
    screen: screen('MAP_SCREEN'),
    appStyle: { ...appStyle },
    drawer: { ...drawerStyle },
    animationType: 'fade'
  });
}


/**
 * @desc Launch logged out flow of the app.
 * @param {boolean} hasAccounts Flag that shows if at least one account was created.
 * @return {void}
 */
export function launchLoggedOutFlow(hasAccounts: boolean) {
  if (Platform.OS === 'ios') {
    Navigation.startSingleScreenApp({
      screen: screen('INTRO_SCREEN'),
      appStyle: { ...appStyle },
      animationType: 'fade'
    });
  } else {
    Navigation.isAppLaunched()
      .then((appLaunched) => {
        if (appLaunched) {
          Navigation.startSingleScreenApp({
            screen: screen('INTRO_SCREEN'),
            appStyle: { ...appStyle },
            animationType: 'fade'
          });
        }
        new NativeEventsReceiver().appLaunched(startApp);
      })
  }
}

/**
 * @desc Launch qr code flow of the app.
 * @return {void}
 */
export function* launchQRCodeFlow(data) {
  alertCustom('confirm', data.status === 1 ? '予約時間です。チェックインしてください。' : 'QRコードの読み取りを行うと、チェックアウトを行います', [
    {
      name: 'confirm',
      onPress: () => {
        Navigation.startSingleScreenApp({
          screen: screen('QR_CODE_SCREEN'),
          passProps: {
            data: data,
          },
          appStyle: { ...appStyle },
          animationType: 'fade'
        })
      }
    }]);
}

