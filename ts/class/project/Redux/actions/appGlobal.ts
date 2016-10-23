
export type app_exit = { lastUnloadTime: number };
export const app_exit = 'app_exit';
export function appExit(newValue: app_exit) {
    return {
        type: app_exit,
        newValue
    }
}

export const app_reset = 'app_reset';
export function appReset() {
    return {
        type: app_reset
    }
}

export type app_init = tApp.initData;
export const app_init = "app_init";
export function appInit(newValue: app_init) {
    return {
        type: app_init,
        newValue
    }
}

export type app_recoverByLastUnLoadState = tApp.state;
export const app_recoverByLastUnLoadState = "app_recoverByLastUnLoadState";
export function appRecoverByLastUnLoadState(newValue: app_recoverByLastUnLoadState) {
    return {
        type: app_recoverByLastUnLoadState,
        newValue
    }
}

export type app_spinner_show = { show: boolean };
export const app_spinner_show = "app_spinner_show";
export function appSpinnerShow(newValue: app_spinner_show) {
    return {
        type: app_spinner_show,
        newValue
    }
}

export type app_clearLargePicture_show = { show: boolean, path?: string };
export const app_clearLargePicture_show = "app_clearLargePicture_show";
export function appClearLargePictureShow(newValue: app_clearLargePicture_show) {
    return {
        type: app_clearLargePicture_show,
        newValue
    }
}

export type app_location_change = { locationInfo: tApp.locationInfo };
export const app_location_change = 'app_location_change';
export function appLocationChange(newValue: app_location_change) {
    return {
        type: app_location_change,
        newValue
    }
}

export type app_navBar_selectChange = { index: number };
export const app_navBar_selectChange = "app_navBar_selectChange";
export function appNavBarSelectChange(newValue: app_navBar_selectChange) {
    return {
        type: app_navBar_selectChange,
        newValue
    }
}

export type goods_showInfo = tApp.addGoodsInfo
export const goods_showInfo = "goods_showInfo";
export function goodsShowInfo(newValue: goods_showInfo) {
    return {
        type: goods_showInfo,
        newValue
    }
}

export type goods_addToCart = {
    cartGoodsTotal: number
}
export const goods_addToCart = 'goods_addToCart';
export function goodsAddToCart(newValue: goods_addToCart) {
    return {
        type: goods_addToCart,
        newValue
    }
}

export type goods_deleteFromCart = {
    cartGoodsTotal: number
}
export const goods_deleteFromCart = 'goods_deleteFromCart';
export function goodsDeleteFromCart(newValue: goods_deleteFromCart) {
    return {
        type: goods_deleteFromCart,
        newValue
    }
}

export type cart_getList = {
    cartGoodsTotal: number
}
export const cart_getList = 'cart_getList';
export function cartGetList(newValue: cart_getList) {
    return {
        type: cart_getList,
        newValue
    }
}



