export const FETCH_ALL_LOCATIONS = 'FETCH_ALL_LOCATIONS';
export const LOCATIONS_UPDATE = 'LOCATIONS_UPDATE';
export const ROOMS_LIST_UPDATE = 'ROOMS_LIST_UPDATE';
export const GET_ROOMS_CURRENT_LOCATION = 'GET_ROOMS_CURRENT_LOCATION';
export const UPDATE_CURRENT_SEARCH_INFO = 'UPDATE_CURRENT_SEARCH_INFO';

export function fetchAllLocations() {
    return {
        type: FETCH_ALL_LOCATIONS,
    };
}

export function locationsUpdated(locations) {
    return {
        type: LOCATIONS_UPDATE,
        locations,
    };
}

export function roomsListUpdated(rooms) {
    return {
        type: ROOMS_LIST_UPDATE,
        rooms,
    };
}

export function updateCurrentSearchInfo(info, callback) {
    return {
        type: UPDATE_CURRENT_SEARCH_INFO,
        info,
        callback,
    };
}

export function getRoomsCurrentLocation(data, callback) {
    return {
        type: GET_ROOMS_CURRENT_LOCATION,
        data,
        callback
    };
}