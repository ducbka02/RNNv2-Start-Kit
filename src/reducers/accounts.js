/*
 * @Author: Duc Nguyen 
 * @Date: 2018-07-06 16:02:05 
 * @Last Modified by: ducbka02@gmail.com
 * @Last Modified time: 2019-01-14 15:56:13
 */
import {
    UPDATE_CURRENT_ACCOUNT, UPDATE_CURRENT_TOKEN, UPDATE_TAB_INDEX, UPDATE_PAYMENT_INFO, UPDATE_CURRENT_VIEW
} from '../actions/accounts';

const defaultState = {
    showQrCode: false,
    tabIndex: 1,
    currentView: 1,
    accountStore: {},
    currentToken: '',
    paymentInfoStore: {},
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_TAB_INDEX:
            return {
                ...state,
                tabIndex: action.data,
            }
        case UPDATE_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.data,
            }
        case UPDATE_CURRENT_ACCOUNT:
            return {
                ...state,
                accountStore: action.data,
            }
        case UPDATE_CURRENT_TOKEN:
            return {
                ...state,
                currentToken: action.data,
            }
        case UPDATE_PAYMENT_INFO:
            return {
                ...state,
                paymentInfoStore: action.data,
            }
        default:
            return {
                ...state,
            };
    }
}

export default reducer;
