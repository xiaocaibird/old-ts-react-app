declare namespace tAppInfo {
    export type lastUnLoadInfo = {
        state: state,
        lastUnloadTime: number
    }
    export type initData = {
        "token": string,  // token
        "isOpen": boolean,  // 当前定位地区是否开通服务 true 已开通  false 未开通
        "isLogin": boolean,  // 用户是否登录 true 已登录  false 未登录
        "userInfo"?: {  // 用户状态信息
            id: string,  // 用户ID
            username: string,  // 用户名
            shop_name: string,  // 店铺名称
            status: '1' | '0' | 1 | 0,  // 用户是否审核  1 是 0 否
            refer_id: '1' | string,  // 是否为工程师  1 是  其余为否
            consignee_name: string,
            invitation_code: string,
            province_id: string,
            province_name: string,
            city_id: string,
            city_name: string,
            district_id: string,
            district_name: string,
        },
        "activeList"?: [
            {
                "active_name": string,  // 活动名称
                "img_path": string,  // 图片路径
                "active_url": string  // 活动地址
            }
        ],
        "info"?: {
            "super_user_id": string,  // 大区负责人ID
            "province_id": string,
            "province_name": string,  // 省
            "city_id": string, // 市ID
            "city_name": string,  // 市
            "district_id": string, // 区ID
            "district_name": string,  // 区
        }
        'cartGoodsTotal'?: number,  // 购物车内商品种类数量
        "version"?: {    // app版本信息
            "version_id": string,
            "version_no"?: string,  // 版本编号
            "down_url": string,  // 下载地址
            "must_update": 0 | 1 | '0' | '1',  // 是否需要更新  0 否  1 是
            "app_desc": string,  // 更新描述
            "app_type": string,
            "add_time": string
        }
    }
    export type appConfig = {
        lastVersion: lastVersion,
        locatoinVersion: locatoinVersion,
        token: string,
        listViewPageSize: number
    }

    export type lastVersion = {
        code: string,
        needUpgrade: boolean,
        upgradeUrl: string
    }

    export type locatoinVersion = {
        code: string,
        readableCode: string
    }
}

declare namespace tAppInfo {
    export type state = {
        appGlobal: appGlobal,
        userInfo: userInfo
    }


    export type appGlobal = {
        spinnerShow: boolean,
        clearLargePicture: clearLargePicture,
        navBarShow: boolean,
        navBarSelectIndex: number,
        locationInfo: locationInfo,
        cartGoodsTotal: number,
        addGoodsInfo: addGoodsInfo
    }
    export type userInfo = {
        nowUser: nowUser
    }
    export type clearLargePicture = {
        show: boolean,
        path: string
    }
    export type locationInfo = {
        "province_id": string,
        "province_name": string,  // 省
        "city_id": string, // 市ID
        "city_name": string,  // 市
        "district_id": string, // 区ID
        "district_name": string,  // 区
    }
    export type addGoodsInfo = {
        show: boolean,
        data?: tComponent.goodsInfo
    }
}


declare namespace tAppInfo {
    //userInfo
    export type nowUser = {
        user_id: string,
        username: string,
        consignee_mobile: string,
        consignee_name: string,
        shop_name: string,
        invitation_code: string,
        province_id: string,
        province_name: string,
        city_id: string,
        city_name: string,
        district_id: string,
        district_name: string,
        address: string,
        status: '1' | '0' | 1 | 0,
        refer_id: '1' | string
    } | undefined
}
