// @flow

import { Platform } from 'react-native';
import Colors from './colors';

// Styles for Navigation Bar
export const tabsStyle = {
  tabBarButtonColor: Colors.tabBarButtonColor,
  tabBarLabelColor: Colors.tabBarLabelColor,
  tabBarSelectedLabelColor: Colors.tabBarSelectedLabelColor,
  tabBarSelectedButtonColor: Colors.tabBarSelectedButtonColor,
  tabBarBackgroundColor: Colors.tabBarBackgroundColor,
};

export const appStyle = {
  ...tabsStyle,
};

export const androidNavigationButtons = Platform.OS === 'android' ? {
  leftButtons: [{
    id: 'back',
    buttonColor: Colors.androidNavigationButtons,
  }],
} : {};

export const navigatorStyle = {
  screenBackgroundColor: Colors.white,
  navBarBackgroundColor: Colors.white,
  navBarButtonColor: 'black',
  navBarTextColor: 'black',
  navBarNoBorder: false,
  drawUnderNavBar: false,
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor: Platform.OS === 'ios' ? Colors.statusBarColorIOS : Colors.statusBarColorOther,
  navBarHidden: true,
  drawUnderStatusBar: false, // Apple says, don't do it. So we don't.
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
};

export const navigatorStyleModal = {
  ...navigatorStyle,
  tabBarHidden: true,
};

export const solidNavigatorStyle = {
  navBarHidden: true,
  drawUnderStatusBar: false,
  screenBackgroundColor: Colors.Transparent,
  modalPresentationStyle: 'overCurrentContext'
};

export const drawerStyle = {
  left: {
    screen: 'recharge.MenuScreen',
    fixedWidth: "100%"
  },
  disableOpenGesture: true, // optional, can the drawer be opened with a swipe instead of button
  passProps: {
    title: 'Hello from SideMenu'
  },
  style: {
    drawerShadow: false,
    contentOverlayColor: 'rgba(0,0,0,0.25)',
    leftDrawerWidth: 80,
    shouldStretchDrawer: true,
  },
  //type: 'TheSideBar',
  //animationType: 'airbnb',
};

/*
  label : this text string appears in the navigation bar at the bottom of the screen
  icon  : icon for navigation bar
  title : title in navigation bar
 */

const Screens = {
  LOADING_SCREEN: {
    screen: 'recharge.LoadingScreen',
    navigatorStyle: hiddenNavigatorStyle,
  },
  INTRO_SCREEN: {
    screen: 'recharge.IntroScreen',
    title: 'RECHARGE',
    navigatorStyle: hiddenNavigatorStyle,
  },
  SIGN_UP_SCREEN: {
    screen: 'recharge.SignUpScreen',
    title: '会員登録',
    navigatorStyle: navigatorStyle,
  },
  USER_CONFIRM_SCREEN: {
    screen: 'recharge.UserConfirmationCode',
    title: '2段階認証',
    navigatorStyle: navigatorStyle,
  },
  LOGIN_SCREEN: {
    screen: 'recharge.LoginScreen',
    title: 'ログイン',
    navigatorStyle: navigatorStyle,
  },
  MENU_SCREEN: {
    screen: 'recharge.MenuScreen',
  },
  MAP_SCREEN: {
    screen: 'recharge.MapScreen',
    title: 'ONEREST',
    navigatorStyle: navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'recharge.ProfileScreen',
    title: 'アカウント',
    navigatorStyle: hiddenNavigatorStyle,
  },
  WAIT_LIST_SCREEN: {
    screen: 'recharge.WaitListScreen',
    title: 'WAITLIST',
    navigatorStyle: navigatorStyle,
  },
  ROOM_DETAIL_SCREEN: {
    screen: 'recharge.RoomDetailScreen',
    navigatorStyle: hiddenNavigatorStyle,
  },
  ROOM_VERIFY_SCREEN: {
    screen: 'recharge.RoomVerifyScreen',
    navigatorStyle: hiddenNavigatorStyle,
  },
  ROOM_PAYMENT_SUCCESS_SCREEN: {
    screen: 'recharge.RoomPaymentSuccessScreen',
    title: '',
    navigatorStyle: navigatorStyle,
  },
  ROOM_HISTORY_BOOK_SCREEN: {
    screen: 'recharge.RoomHistoryBookScreen',
    title: 'WAITLIST',
    navigatorStyle: navigatorStyle,
  },
  PAYMENT_SCREEN: {
    screen: 'recharge.PaymentScreen',
    title: 'カード番号の入力',
    navigatorStyle: navigatorStyle,
  },
  CONTACT_SCREEN: {
    screen: 'recharge.ContactScreen',
    title: '',
    navigatorStyle: hiddenNavigatorStyle,
  },
  HELP_SCREEN: {
    screen: 'recharge.HelpScreen',
    title: '',
    navigatorStyle: navigatorStyle,
  },
  QR_CODE_SCREEN: {
    screen: 'recharge.QrCodeScanningScreen',
    title: '',
    navigatorStyle: hiddenNavigatorStyle,
  },
  QR_CODE_CHECK_IN_SCREEN: {
    screen: 'recharge.QrCodeCheckInScreen',
    title: '',
    navigatorStyle: hiddenNavigatorStyle,
  },
  QR_CODE_CHECK_OUT_SCREEN: {
    screen: 'recharge.QrCodeCheckOutScreen',
    title: 'チェックアウト',
    navigatorStyle: navigatorStyle,
  }
};

/**
 * @desc Returns and object that represents a screen in React Native Navigation library.
 * @param {string} name Name of the screen. Check Screens constant above for possible names.
 * @return {Object} A screen object.
 */
export function screen(name: string): Object {
  return { ...Screens[name] };
}
