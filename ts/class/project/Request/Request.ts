import { AWebRequest } from '../../web/Request'
import { Factory as f } from '../../Factory';
import { arrayHp } from '../../../helper';

type callBackData = {
    state: boolean,
    dataList: tCommon.anyObject | [tCommon.anyObject],
    msg: string
}

const debug = false;

const hostUrl = debug ? 'http://ycytest.5fengshou.com' : 'http://weixin.4008268365.com';

export class Request extends AWebRequest {
    static readonly instance: Request = new Request();
    private constructor() {
        super();
        this.setHostUrl(hostUrl);
    }
    protected sealPostData(postData?: tCommon.anyObject) {
        if (!postData) return { token: f.App.AppConfig.token };
        let _data = postData;
        _data["token"] = f.App.AppConfig.token;
        return _data;
    }
    postGlobalHandler<T>(url: string, postData?: tCommon.anyObject) {
        const error = this.createError();
        error.postData = postData;

        return this.post<callBackData>(url, postData)
            .then(
            (data?) => {
                error.returnData = data;

                if (!data || data.state == null) {
                    error.message = '返回的数据结构或数据类型错误！';
                    if (data && data.msg) {
                        error.message = data.msg;
                    }
                    error.state = eCommon.requestErrorState.dataError;
                    f.ErrorHandler.log(error);
                    f.Prompt.promptToast('请求超时！请稍后再试！');
                    return f.AsyncOperation.getReject(error);
                }

                if (data.msg == "token_error") {
                    f.Redux.changeState(f.Redux.action.userLogout());
                    f.Navigation.toLogin(true);
                    error.message = '会话状态超时！';
                    error.state = eCommon.requestErrorState.globalError;
                    f.ErrorHandler.log(error);
                    f.Prompt.promptToast(error.message);
                    return f.AsyncOperation.getReject(error);
                }

                if (!data.state) {
                    error.message = data.msg ? data.msg : '操作失败！';
                    f.Prompt.failPopUp(error.message);
                    return f.AsyncOperation.getReject(error);
                }

                return f.AsyncOperation.getResolve(data.dataList);
            },
            (e) => {
                error.message = '通信异常！';
                error.returnData = e;
                error.state = eCommon.requestErrorState.requestFail;
                f.ErrorHandler.log(error);
                f.Prompt.promptToast('请求超时！请稍后再试！');
                return f.AsyncOperation.getReject(error);
            }
            ) as Promise<T>;
    }

    //非继承成员（处理具体请求）
    getAppInitData() {
        const getInitPostDate = () => {
            const postData = {
                uuid: f.Device.UniqueID,
                version_no: f.App.AppConfig.locatoinVersion.code,
                app_type: f.Device.IsIOS ? 1 : 0,
                lat: -1,
                lng: -1
            };
            const promise = f.AsyncOperation.createPromise(
                (resolve, _reject) => {
                    try {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                postData.lat = position.coords.latitude;
                                postData.lng = position.coords.longitude;
                                resolve(postData);
                            },
                            () => {
                                f.Prompt.warningPopUp('无法确定您的位置，建议您为我们的App开启定位权限并开启手机定位功能！');
                                resolve(postData);
                            });
                    }
                    catch (e) {
                        f.Prompt.warningPopUp('无法确定您的位置，建议您为我们的App开启定位权限并开启手机定位功能！');
                        f.ErrorHandler.log(e);
                        resolve(postData);
                    }
                }
            );
            return promise;
        }
        return getInitPostDate().then(
            (postData) => {
                return this.postGlobalHandler(this.createFullUrl('/app/index/init'), postData).then(
                    (data) => {
                        if (data) {
                            return f.AsyncOperation.getResolve(data);
                        }
                        return f.AsyncOperation.getReject();
                    }
                )
            }
        );
    }

    getActiveList() {
        return this.postGlobalHandler(this.createFullUrl('/app/active/list')).then(
            (data) => {
                if (arrayHp.isArray(data)) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    getGoodsTypeList(postData: { pid: string | null | undefined }) {
        return this.postGlobalHandler(this.createFullUrl('/app/cat/list'), postData).then(
            (data) => {
                if (arrayHp.isArray(data)) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    getGoodsList(postData: {
        cat_id?: string | null | undefined,
        page?: number,
        psize?: number,
        is_sales?: 0 | 1,
        goods_name?: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/goods/list'), postData).then(
            (data) => {
                if (arrayHp.isArray(data)) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }


    getGoodsInfo(postData: { goods_id: string }) {
        return this.postGlobalHandler(this.createFullUrl('/app/goods/info'), postData).then(
            (data) => {
                if (data) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    goodsCollect(postData: {
        goods_id: string,
        operate: 'collect' | 'cancel'
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/goods/collect'), postData)
    }
    getUserCollectionGoodsList(postData: {
        page?: number,
        psize?: number,
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/userCollectList'), postData).then(
            (data) => {
                if (arrayHp.isArray(data)) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }
    getCouponList(postData: {
        has_stat?: number,
        psize?: number,
        type?: string
    }) {
        postData.has_stat = 1;
        return this.postGlobalHandler(this.createFullUrl('/app/coupons/list'), postData).then(
            (data: any) => {
                if (data && arrayHp.isArray(data.couList) && data.couponStat) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    getRecentBuyList(postData: {
        page?: number,
        psize?: number,
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/goods/recentBuy'), postData).then(
            (data) => {
                if (arrayHp.isArray(data)) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }
    getAreaList() {
        return this.postGlobalHandler(this.createFullUrl('/app/areas/listall')).then(
            (data: any[]) => {
                if (arrayHp.isArray(data)) {
                    type item = tNativeComponent.Picker.item;
                    const makeAreaList = (data: any[]) => {
                        let provinces: item[] = [];
                        const pids = arrayHp.groupBy(data, function (n) {
                            return n.province_id
                        })

                        for (let pid in pids) {
                            let p: item = {
                                value: pid,
                                lable: pids[pid][0].province_name
                            }

                            const cids = arrayHp.groupBy(pids[pid], function (n) {
                                return n.city_id
                            })

                            p.children = [];
                            for (let cid in cids) {
                                let c: item = {
                                    value: cid,
                                    lable: cids[cid][0].city_name
                                }

                                const dids = cids[cid];
                                c.children = [];
                                for (let j = 0; j < dids.length; j++) {
                                    let d: item = {
                                        value: dids[j].district_id,
                                        lable: dids[j].district_name
                                    }
                                    c.children.push(d);

                                }

                                p.children.push(c);
                            }

                            provinces.push(p);
                        }

                        return provinces;
                    }
                    return f.AsyncOperation.getResolve(makeAreaList(data));
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    getOrderList(postData: {
        psize: number,
        page?: number,
        order_no?: string,
        stime?: string,
        etime?: string,
        order_mode?: number
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/OrderList'), postData).then(
            (data: any) => {
                if (data && arrayHp.isArray(data.ordersList)) {
                    return f.AsyncOperation.getResolve(data.ordersList);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }
    cancelOrder(postData: {
        order_id: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/userOrderCancel'), postData)
    }

    getOrderInfo(postData: {
        order_id: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/orderInfo'), postData).then(
            (data) => {
                if (data) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    changeDis(postData: { district_id: string }) {
        return this.postGlobalHandler(this.createFullUrl('/app/areas/changeDis'), postData);
    }

    userLogin(postData: {
        username: string,
        password: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/login/vLogin'), postData).then(
            (data) => {
                if (data) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    userLogout() {
        return this.postGlobalHandler(this.createFullUrl('/app/login/loginOut'))
    }

    userRegister(postData: {
        username: string,
        password: string,
        consignee_name: string,
        shop_name: string,
        address: string,
        invitation_code: string,
        district_id: string,
        source?: number
    }) {
        postData.source = 2;
        return this.postGlobalHandler(this.createFullUrl('/app/register/userRegister'), postData)
    }
    changePwd(postData: {
        oldpwd: string,
        newpwd: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/updatePwd'), postData)
    }
    getUserInfo() {
        return this.postGlobalHandler(this.createFullUrl('/app/user/userInfo')).then(
            (data: any) => {
                if (data) {
                    f.Redux.changeState(f.Redux.action.userUpdateInfo(data));
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    updateUserInfo(postData: {
        consignee_mobile: string,
        consignee_name: string,
        shop_name: string,
        address: string,
        invitation_code: string,
        district_id: string
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/user/updateUserInfo'), postData)
    }

    addGoodsToCart(postData: {
        goods_id: string,
        goods_num: number
    }) {
        return this.postGlobalHandler(this.createFullUrl('/app/cart/add'), postData).then(
            (data: any) => {
                if (data && data.cartGoodsTotal != null) {
                    f.Redux.changeState(
                        f.Redux.action.goodsAddToCart({ cartGoodsTotal: data.cartGoodsTotal })
                    )
                }
                return f.AsyncOperation.getResolve(data);
            }
        )
    }

    getCartList() {
        return this.postGlobalHandler(this.createFullUrl('/app/cart/index')).then(
            (data: any) => {
                if (data && data.cartList instanceof Array && data.orderLowest) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }

    getCheckOrderInfo() {
        return this.postGlobalHandler(this.createFullUrl('/app/orders/check')).then(
            (data: tProject.orderCheckInfo) => {
                if (data && data.receiveAddress) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }
    submitOrder(postData: {
        delivery_time_id: string,
        coupons_id: string,
        remark: string,
        source?: number
    }) {
        postData.source = 2;
        return this.postGlobalHandler(this.createFullUrl('/app/orders/create'), postData).then(
            (data) => {
                if (data) {
                    return f.AsyncOperation.getResolve(data);
                }
                return f.AsyncOperation.getReject();
            }
        )
    }
    deleteCartsWithoutGlobalHandler(postData: {
        goods_ids: string[]
    }) {
        return this.post<callBackData>(this.createFullUrl('/app/cart/remove'), postData).then(
            () => {
                return f.AsyncOperation.getResolve();
            },
            () => {
                return f.AsyncOperation.getResolve();
            }
        )
    }

    addGoodsToCartWithoutGlobalHandler(postData: {
        goods_id: string,
        goods_num: number
    }) {
        return this.post<callBackData>(this.createFullUrl('/app/cart/add'), postData).then(
            () => {
                return f.AsyncOperation.getResolve();
            },
            () => {
                return f.AsyncOperation.getResolve();
            }
        )
    }



}



