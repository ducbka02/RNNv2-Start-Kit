import { AsyncStorage } from 'react-native';

const SECRET = '@DayUse:';
export const ENC_FB_TOKEN_KEY = 'enc_fb_token';
export const ENC_MAIL_KEY = 'enc_mail';
export const ENC_PHONE_KEY = 'enc_user';
export const ENC_PASS_KEY = 'enc_pass';

const saveObject = async (key, data) => {
  try {
    await AsyncStorage.setItem(`${SECRET}${key}`, data);
  } catch (error) {
    console.error(error);
  }
};

const readObject = async key => {
  try {
    const value = await AsyncStorage.getItem(`${SECRET}${key}`);
    return value;
  } catch (exception) {
    return undefined;
  }
};

const removeObject = async key => {
  try {
    await AsyncStorage.removeItem(`${SECRET}${key}`);
  } catch (exception) {

  }
};

export {
  saveObject,
  readObject,
  removeObject,
};
