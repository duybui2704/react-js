import { StorageKeys } from 'commons/constants';
import { UserInfoModel } from 'models/user-model';

class SessionManager {
    userInfo: UserInfoModel | undefined;

    accessToken: string | null | undefined;
    
    isMobile: boolean | undefined;

    initData() {
        this.accessToken = localStorage.getItem(StorageKeys.KEY_ACCESS_TOKEN);

        const tmpUserInfo = localStorage.getItem(StorageKeys.KEY_USER_INFO);
        this.userInfo = tmpUserInfo && JSON.parse(tmpUserInfo);
    }

    setUserInfo(userInfo?: UserInfoModel) {
        this.userInfo = userInfo;
        if (userInfo) {
            localStorage.setItem(StorageKeys.KEY_USER_INFO, JSON.stringify(this.userInfo));
        } else {
            localStorage.removeItem(StorageKeys.KEY_USER_INFO);
        }
    }

    setAccessToken(token?: string) {
        this.accessToken = token;
        if (token) {
            localStorage.setItem(StorageKeys.KEY_ACCESS_TOKEN, token);
        } else {
            localStorage.removeItem(StorageKeys.KEY_ACCESS_TOKEN);
        }
    }

    logout() {
        this.setUserInfo();
        this.setAccessToken();
    }
}

export default new SessionManager();
