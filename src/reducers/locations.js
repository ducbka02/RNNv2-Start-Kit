/*
 * @Author: Duc Nguyen 
 * @Date: 2018-07-06 16:02:05 
 * @Last Modified by: ducbka02@gmail.com
 * @Last Modified time: 2019-01-15 11:22:07
 */
import isEmpty from 'lodash/isEmpty';
import {
    LOCATIONS_UPDATE, ROOMS_LIST_UPDATE, UPDATE_CURRENT_SEARCH_INFO, GET_ROOMS_CURRENT_LOCATION
} from '../actions/locations';
import { NOW } from 'src/global/Constants';

const defaultState = {
    locations: [],
    currentRoomsList: [],
    markers: [],
    currentSearchInfo: {
        location_id: 0,
        state: '北海道',
        day_book: NOW,
    }
};

function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case LOCATIONS_UPDATE:
            return {
                ...state,
                locations: action.locations,
            }
        case ROOMS_LIST_UPDATE:
            {
                const currentRoomsList = action.rooms;
                const markers = currentRoomsList.map((room, index) => {
                    const { id, lat, long } = room;
                    const color = randomColor();
                    return { id, coordinate: { latitude: Number(lat), longitude: Number(long) }, color };
                })
                return {
                    ...state,
                    currentRoomsList,
                    markers
                }
            }
        case UPDATE_CURRENT_SEARCH_INFO:
            return {
                ...state,
                currentSearchInfo: isEmpty(action.info) ? {
                    location_id: 1,
                    state: '北海道',
                    day_book: NOW,
                } : { ...state.currentSearchInfo, ...action.info },
            }
        case GET_ROOMS_CURRENT_LOCATION:
            return {
                ...state,
                currentSearchInfo: { ...state.currentSearchInfo, state: '現在地' },
            }
        default:
            return {
                ...state,
            };
    }
}

export default reducer;
