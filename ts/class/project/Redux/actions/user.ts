export const user_logout = 'user_logout';
export function userLogout() {
    return {
        type: user_logout
    }
}

export type user_login = { nowUser: tApp.nowUser, cartGoodsTotal: number };
export const user_login = 'user_login';
export function userLogin(newValue: user_login) {
    return {
        type: user_login,
        newValue
    }
}

export type user_updateInfo = tApp.nowUser;
export const user_updateInfo = 'user_updateInfo';
export function userUpdateInfo(newValue: user_updateInfo) {
    return {
        type: user_updateInfo,
        newValue
    }
}
