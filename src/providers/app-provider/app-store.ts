import { ApiServices } from 'api';
import { UserManager } from 'managers/user-manager';
import { makeObservable, observable } from 'mobx';

class AppStore {

    @observable userManager = new UserManager();

    apiServices = new ApiServices();

    constructor() {

        makeObservable(this);
    }

}

export type AppStoreType = AppStore;
export default AppStore;
