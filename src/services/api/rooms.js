
import { getInitializedApi } from './index';

export default class RoomsService {
    static async stripePayment(data) {
        try {
            const body_data = {
                type: 1,
                token_card: '',
                stripe_customer_id: '',
                room_id: 1,
                reserve_day_from: new Date(),
                reserve_day_to: new Date(),
                start_time: new Date(),
                end_time: new Date(),
                email: '',
                extended_time: 1
            }
            const response = await getInitializedApi().post(`/payment/pay`, JSON.stringify(body_data));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async getReserverRooms(data) {
        try {
            const response = await getInitializedApi().get(`/rooms/reserved.json?user_id=${data.user_id}&reserve_status=${data.reserve_status}`);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async booksRoom(data) {
        try {
            const body_data = {
                room_id: data.room_id,
                reserve_day_from: data.reserve_day_from,
                reserve_day_to: data.reserve_day_to,
                start_time: data.start_time,
                end_time: data.end_time,
                reserve_time: data.reserve_time,
            }
            const response = await getInitializedApi().post(`/rooms/book.json`, JSON.stringify(body_data));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async cancelPayment(data) {
        try {
            let bodyData = {
                status: data.status,
            }
            if (data.cancel_fee) {
                bodyData.cancel_fee = data.cancel_fee;
            }
            const response = await getInitializedApi().put(`/rooms/cancel/${data.room_id}.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async checkIn(data) {
        try {
            let bodyData = {
                qr_content: data.qrCode,
                reserve_id: data.room_id
            }
            //console.warn(JSON.stringify(bodyData))
            const response = await getInitializedApi().post(`/rooms/checkin.json`, JSON.stringify(bodyData));
            //console.warn(response);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async checkOut(data) {
        try {
            let bodyData = {
                qr_content: data.qrCode,
                reserve_id: data.room_id,
                type: data.type
            }
            if (data.extend_time !== undefined) {
                bodyData.extend_time = data.extend_time
            }
            if (data.check_out !== undefined) {
                bodyData.check_out = data.check_out
            }
            if (data.total_amount !== undefined) {
                bodyData.total_amount = data.total_amount
            }
            const response = await getInitializedApi().post(`/rooms/checkout.json`, JSON.stringify(bodyData));
            //console.warn(response);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }
}