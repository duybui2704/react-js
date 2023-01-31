import axios from 'axios';
// import { HeaderType } from './types';
import { TIMEOUT_API } from 'commons/configs';
import { Events } from 'commons/constants';
import Languages from 'commons/languages';
import config from 'config';
import SessionManager from 'managers/session-manager';
import { browserName, fullBrowserVersion, osName, osVersion } from 'react-device-detect';
import { EventEmitter } from 'utils/event-emitter';
import toasty from 'utils/toasty';
import validate from 'utils/validate';
import { API_CONFIG } from './constants';

export const ResponseCodes = {
    Success: 200,

    BadRequest: 400,
    TokenInvalid: 403,
    Timeout: 408,
    Expires: 406
};

const HEADER = {
    Accept: 'application/x-www-form-urlencoded'
};

const getHeader = () => {
    const myHeader: any = {
        ...HEADER,
        'Platform': 'web',
        'Device': `${osName}-${osVersion} : ${browserName}-${fullBrowserVersion}`
    };
    
    if (SessionManager.accessToken) {
        myHeader.Authorization = SessionManager.accessToken.split('"').join('');
    }
    return myHeader;
};
export class BaseService {
    api = (isDontShowToast = false, baseURL = config.baseURL) => {
        const defHeader = getHeader();

        const _api = axios.create({
            baseURL,
            headers: defHeader,
            timeout: TIMEOUT_API
        });

        _api.interceptors.response.use(async (response: any) => {
            if (response && response.data) {
                const { data, message, code, success, history, total, endPoint, payment } = await this.checkResponseAPI(response, isDontShowToast);

                if (typeof data !== 'undefined') {
                    try {
                        response.data = JSON.parse(data);
                    } catch (e) {
                        // return non-json Data
                        response.data = data;
                    }
                }

                response.success = success;
                response.message = message;
                response.code = code;
                response.history = history;
                response.total = total;
                response.payment = payment;

                // send error notify when encounter 5xx code
                if (code > 500 && code < 600) {
                    //
                    this.api(false, config.errorURL)
                        .post(API_CONFIG.NOTIF_ERROR, { message: `${endPoint}: ${message}` });
                }
            }
            return response;
        }, (error) => {
            // Handle errors
            throw error;
        });

        return _api;
    };

    checkResponseAPI(response: any, isDontShowToast: boolean) {
        console.log('API: ', response);
        if (response.problem === 'NETWORK_ERROR' || response.problem === 'TIMEOUT_ERROR') {
            toasty.error(Languages.errorMsg.noInternet);
            return { success: false, data: null };
        }
        if (!response.config) {
            return { success: false, data: null };
        }
        const endPoint = response.config.url;

        switch (response.code) {
            case ResponseCodes.TokenInvalid:
            case ResponseCodes.BadRequest:
            {
                let message = '';
                if (response.data && response.data.error_description && response.data.error) {
                    if (endPoint === API_CONFIG.LOGIN) { // join error message & code for display in login form
                        message = `${response.data.error}-${response.data.error_description}`;
                    } else if (!isDontShowToast) {
                        toasty.error(response.data.error_description);
                    }
                } else {
                    toasty.error(Languages.errorMsg.sessionExpired);
                }
                EventEmitter.emit(Events.LOGOUT);
                return { success: false, data: null, message };
            }
            case ResponseCodes.Expires:
            {
                EventEmitter.emit(Events.LOGOUT);
                return { success: false, data: null };
            }
            default:
                break;
        }

        const code = Number(response.data?.status);
        let showToast = true;
        switch (code) {
            case ResponseCodes.Success:
                showToast = false;
                break;
            default:
                if (response.data?.message && showToast && !isDontShowToast) {
                    toasty.error(response.data?.message);
                }
                break;
        }

        return {
            ...response.data,
            success:
                !validate.isEmpty(response.data?.token) ||
                code === ResponseCodes.Success,
            code,
            endPoint
        };
    }

    buildUrlEncoded = (data: any) => {
        const params = new URLSearchParams();
        Object.keys(data).map(key => params.append(key, data[key]));
        return { params };
    };

    buildFormData = (data: any) => {
        const formData = new FormData();
        const keys = Object.keys(data);
        if (keys && keys.length > 0) {
            keys.forEach((key) => {
                if (data[key] !== undefined) {
                    if (data[key] instanceof Array) {
                        if (data[key].length > 0) {
                            for (let i = 0; i < data[key].length; i++) {
                                formData.append(`${key}`, data[key][i]);
                            }
                        }
                    } else if (key !== 'file') {
                        formData.append(key, data[key]);
                    } else if (data[key]) {
                        formData.append(key, {
                            uri: data[key]?.path || '',
                            type: data[key].mime
                        } as any);
                    }
                }
            });
        }

        console.log('formData === ', data);
        return formData;
    };

    // cache data
    requestSavedData = async (endPoint: string) => {
        const keySaved = endPoint;

        const savedData = localStorage.getItem(keySaved);
        if (savedData) {
            return { success: true, data: JSON.parse(savedData) };
        }

        const response = await this.api().get(endPoint) as any;

        if (response.success) {
            const resData = response.data;
            const jData = JSON.stringify(resData);
            localStorage.setItem(keySaved, jData);
            return { success: true, data: resData };
        }
        return { success: false, data: null };
    };
}
