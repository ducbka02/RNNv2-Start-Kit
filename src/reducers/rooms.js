/*
 * @Author: Duc Nguyen 
 * @Date: 2018-07-06 16:02:05 
 * @Last Modified by: ducbka02@gmail.com
 * @Last Modified time: 2019-01-14 16:11:48
 */
import isEmpty from 'lodash/isEmpty';
import {
    UPDATE_CURRENT_ROOM_CHOICE, CHECK_IN
} from '../actions/rooms';

const defaultState = {
    currentRoom: null,
};

function reducer(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_ROOM_CHOICE:
            return {
                ...state,
                currentRoom: action.room
            };
        default:
            return {
                ...state,
            };
    }
}

export default reducer;
