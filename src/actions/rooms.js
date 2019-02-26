export const UPDATE_CURRENT_ROOM_CHOICE = 'UPDATE_CURRENT_ROOM_CHOICE';
export const GET_RESERVER_ROOMS = 'GET_RESERVER_ROOMS';
export const BOOKS_ROOM = 'BOOKS_ROOM';
export const CANCEL_PAYMENT = 'CANCEL_PAYMENT';
export const CHECK_IN = 'CHECK_IN';
export const CHECK_OUT = 'CHECK_OUT';

export function updateCurrentRoomChoice(room) {
    return {
        type: UPDATE_CURRENT_ROOM_CHOICE,
        room
    };
}

export function booksRoomAction(data, callback) {
    return {
        type: BOOKS_ROOM,
        data,
        callback
    };
}


export function getReserverRoomsActions(data) {
    return {
        type: GET_RESERVER_ROOMS,
        data
    };
}

export function cancelPaymentAction(data, callback) {
    return {
        type: CANCEL_PAYMENT,
        data,
        callback
    };
}

export function checkInAction(data, callback) {
    return {
        type: CHECK_IN,
        data,
        callback
    };
}

export function checkOutAction(data, callback) {
    return {
        type: CHECK_OUT,
        data,
        callback
    };
}