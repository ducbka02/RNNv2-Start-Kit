import { getInitializedApi } from './index';

export default class AccountsService {
    static async isExistAccount(data) {
        try {
            let bodyData = {};
            if (data.email) {
                bodyData.email = data.email
            }
            if (data.phone) {
                bodyData.phone = data.phone
            }
            const response = await getInitializedApi().post(`/isexistsaccount.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async createAccount(data) {
        try {
            let bodyData = {
                email: data.email,
                password: data.password,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone
            }
            const response = await getInitializedApi().post(`/register.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async verifyCode(data) {
        try {
            let bodyData = {
                user_id: data.user_id,
                verify_code: data.verify_code,
            }
            const response = await getInitializedApi().post(`/verifyPhone.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async loginAccount(data) {
        try {
            let bodyData = {
                email: data.email,
                password: data.password,
            }
            const response = await getInitializedApi().post(`/login.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async loginFacebook(token) {
        try {
            let bodyData = {
                access_token: token
            }
            const response = await getInitializedApi().post(`/loginfb.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async editProfile(data, user_id) {
        try {
            let bodyData = {
                email: data.email,
                first_name: data.firstName,
                last_name: data.lastName,
            }
            if (data.password) {
                bodyData.password = data.password;
            }

            if (data.imageUpload) {
                bodyData.image = data.imageUpload;
            }
            const response = await getInitializedApi().put(`/users/profile/${user_id}.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async registerPaymentCard(data) {
        try {
            const response = await getInitializedApi().get(`/payment/saveCard.json?token_card=${data}`);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async getPaymentInfo() {
        try {
            const response = await getInitializedApi().get(`/payment/cardInfo.json`);
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async sendEmail(data) {
        try {
            const bodyData = {
                content: data
            }
            const response = await getInitializedApi().post(`/contact.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }

    static async sendTokenNotification(data) {
        try {
            const bodyData = {
                firebase_token_device: data
            }
            const response = await getInitializedApi().post(`/device.json`, JSON.stringify(bodyData));
            return response;
        } catch (exception) {
            throw { message: exception.response.data.errorMessage };
        }
    }
}