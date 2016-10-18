import { ANativeUser } from '../../native/User';
import { Factory as f } from '../../Factory';
export class User extends ANativeUser<tAppInfo.nowUser> {
    static readonly instance: User = new User();
    private constructor() {
        super();
    }

    getUser() {
        return f.Redux.getState().userInfo.nowUser;
    }

    isLogin() {
        const user = this.getUser();

        if (!user || !user.user_id) {
            return false
        }

        return true
    }
}