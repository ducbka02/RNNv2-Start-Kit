/*
 * @Author: Duc Nguyen 
 * @Date: 2018-07-06 16:02:05 
 * @Last Modified by: ducbka02@gmail.com
 * @Last Modified time: 2019-01-14 16:26:25
 */
import isEmpty from 'lodash/isEmpty';
import {
    DONE_QR_NAVIGATION
} from '../actions/navigation';

const defaultState = {
    showQrCode: false,
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case DONE_QR_NAVIGATION:
            return {
                ...state,
                showQrCode: true
            }
        default:
            return {
                ...state,
            };
    }
}

export default reducer;
