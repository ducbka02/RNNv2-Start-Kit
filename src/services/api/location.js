import { getInitializedApi } from './index';
import { getTimeNowFormat, formatTimeToRegular } from '../../utils/timeUtils';
import { NOW } from '../../global/Constants';

export default class LocationService {
    static async getAllLocations(token) {
        try {
            const response = await getInitializedApi(true, token).get(`/locations.json`);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async getRoomsListByLocation(data) {
        try {
            let bodyData = {};
            
            if (data.location_id) {
                bodyData.location_id = data.location_id;
            } else {
                bodyData.location_id = 1;
            }

            if (!data.reservable) {
                bodyData.reservable = 0;
            } else {
                bodyData.reservable = 1;
            }
            if (!data.day_book || data.day_book === NOW) {
                bodyData.day_book = getTimeNowFormat();
            } else {
                bodyData.day_book = formatTimeToRegular(data.day_book);
            }
            const response = await getInitializedApi().post(`/rooms.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async getRoomsListByCurrentLocation(data) {
        try {
            if (data.date) {
                const response = await getInitializedApi().get(`/roomGeo.json?lat=${data.lat}&long=${data.long}&date=${data.date}`);
                return response;
            } else {
                const response = await getInitializedApi().get(`/roomGeo.json?lat=${data.lat}&long=${data.long}`);
                return response;
            }
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }
}