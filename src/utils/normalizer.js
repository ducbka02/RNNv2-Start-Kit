import { Dimensions, Platform } from 'react-native';
import {
    FOUR_INCHES,
    FOUR_DOT_SEVEN_INCHES,
    FIVE_DOT_FIVE_INCHES,
    FIVE_DOT_EIGHT_INCHES,
} from '../global/Constants';

const { width, height } = Dimensions.get('window');


export function isiPhoneX() {
    if (Platform.OS === 'ios' && (height === FIVE_DOT_EIGHT_INCHES || height === FIVE_DOT_EIGHT_INCHES)) {
        return true;
    }
    return false;
}

export function fontSizeNormalizer(size: number) {
    if (disabledForDebugging && __DEV__) {
        return size;
    }
    if (height === FOUR_INCHES) {
        return size * 0.65;
    } else if (height === FOUR_DOT_SEVEN_INCHES) {
        return size;
    } else if (height === FIVE_DOT_FIVE_INCHES) {
        return size * 1.4;
    }
    return size;
}

export const getNavBarHeight = () => {

    if (Platform.OS == 'ios') {

        let d = Dimensions.get('window');
        const { height, width } = d;

        if (isiPhoneX())
            return 88 // iPhone X navbar height (regular title);
        else
            return 64 // iPhone navbar height;
    } else
        return 54 //android portrait navbar height;
}

export function isiPhoneXStatusBar(size: number) {
    if (isiPhoneX()) {
        return size + 24;
    }
    return size;
}

export function isiPhoneXTabBar(size: number) {
    if (isiPhoneX()) {
        return size + 29;
    }
    return size;
}

export const HEIGHT_SCALE = height / 1280;
export const WIDTH_SCALE = width / 719;