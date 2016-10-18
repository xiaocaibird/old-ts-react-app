declare namespace tComponent {
    type IsOrNo = '1' | '0' | 1 | 0;

    export type activeList = active[];

    export type active = {
        active_name: string,
        img_path: string,
        active_url: string
    }


    export type goodsTypeList = goodsTopType[];
    export type goodsTopType = {
        "cat_id": string,
        "cat_name": string,
        "pid": string,
        "spell": string,
        "icon_path": string,
        "icon_focus_path": string
    }

    export type goodsList = goods[];
    export type goods = {
        "is_sales": IsOrNo,  // 是否促销 1 是 0 否
        "is_time_limit": IsOrNo,  // 是否秒杀 1 是 0 否
        "start_time": string,  // 开始时间
        "end_time": string,  // 结束时间
        "goods_id": string,  // 商品ID
        "goods_name": string,  // 商品名称
        "cat_name": string,   // 分类名称
        "goods_stock": number,  // 商品存在 大于100000 显示不限
        "min_price": string, // 最低价格
        "max_price": string, // 最高价格
        "user_collect": IsOrNo   // 用户是否关注 1 是 0否
        "goods_unit": string,  // 商品单位
        "goods_spec": string,  // 商品描述
        "goods_img": string // 商品图片路径
    }

    export type cartList = cart[];
    export type cart = {
        "manjian_id": string,  // 满减活动ID  无满减活动为 0
        "manjian_name": string,  // 满减活动标题
        "cur_manjian_order_price": string   // 当前满减金额
        "goodsList": cartGoods[],
        "stepList": cartManJianStep[]
    }
    export type cartGoods = {
        "goods_id": string,  // 商品ID
        "goods_name": string,  // 商品名称
        "goods_spec": string,  // 商品描述
        "pcat_id": string,  // 一级分类ID
        "cat_id": string,  // 二级分类ID
        "min_quantity": string,  // 起订量
        "goods_stock": string,  // 商品库存
        "goods_unit": string,  // 商品单位
        "is_sales": IsOrNo,  // 是否促销 1 是 0 否
        "start_time": string,  // 开始购买时间与is_time_limit联合使用
        "end_time": string,  // 结束购买时候
        "is_time_limit": IsOrNo,  // 是否秒杀 1 是 0 否
        "error_code": string,  // 错误编码 空为正常 goods_not_online 商品已下架 sell_time_error  不在销售时间内  min_quantity_error 购买数量小于最低起订量  goods_stock_error  库存不足  limit_stock_error  超过限购数量
        "cur_price": string,  // 当前价格
        "buy_number": string,  // 购买数量
        "canBuy": string,  // 可购买数量
        "goods_img": string
    }
    export type cartManJianStep = {
        "step_id": string,
        "manjian_id": string,
        "order_price": string,  // 订单金额
        "dec_price": string  // 满减金额
    }

    export type goodsInfo = {
        "goods_id": string,  // 商品ID
        "goods_name": string,  // 商品名称
        "pcat_id": string,
        "goods_stock": string,  // 商品存在 大于100000显示不限
        "min_price": string,  // 商品最低价格
        "max_price": string,  // 商品最高价格
        "goods_unit": string, // 商品单位
        "goods_spec": string,  // 商品描述
        "cover_img": string,
        "min_quantity": string,  // 起订量
        "is_sales": IsOrNo,  // 是否促销
        "is_online": IsOrNo,
        "start_time": string,  // 开始购买时间与is_time_limit联合使用
        "end_time": string,  // 结束购买时候
        "is_time_limit": IsOrNo,  // 是否秒杀 1 是 0 否
        "limit_stock": IsOrNo,
        "goods_img": string,  // 商品图片
        "step_price": goodsStepPrice[],
        "canBuy": string,  // 还能购买数量
        "buy_number": string,  // 已加入购物车内数量
        "manjian": {  // 满减信息  无满减为false
            "manjian_id": string,
            "manjian_name": string,  // 活动标题
            "start_time": string,  // 活动开始时间
            "end_time": string,  // 活动结束时间
            "limit_type": string,
            "limit_number": string,
            "demo": string,  // 活动限制说明
            "step_list": [ // 活动区间
                {
                    "step_id": string,
                    "manjian_id": string,
                    "order_price": string,  // 订单金额
                    "dec_price": string  // 满减金额
                }
            ]
        },
        "fullgift": {  // 满赠信息  无满减为false
            "full_gift_id": string,
            "active_name": string,  // 活动标题
            "start_time": string,  // 活动开始时间
            "end_time": string,  // 活动结束时间
            "limit_type": string,
            "limit_number": string,
            "demo": string,  // 活动限制说明
            "step_list": [
                {
                    "order_price": string,  // 订单金额
                    "goods_id": string,
                    "gift_number": string,  // 赠送数量
                    "goods_name": string  // 商品名称
                    "goods_unit": string
                }
            ]
        }
    }
    export type goodsStepPrice = {
        "id": string,
        "goods_id": string,  // 商品ID
        "goods_price": string,  // 商品价格
        "goods_number": string,  // 商品数量
        "max_number": string
    }

    export type AreaList = Area[];
    export type Area = {
        "id": string,
        "province_id": string,   // 省ID
        "province_name": string,  // 省名称
        "city_id": string,  // 市ID
        "city_name": string,  // 市名称
        "district_id": string,  // 区ID
        "district_name": string,  // 区名称
        "add_time": string,
        "last_update_time": string,
        "super_user_id": string
    }

    export type OrderList = Order[];
    export type Order = {
        "order_no": string,  //  订单号
        "order_id": string,        //订单ID
        "is_cancel": IsOrNo,   // 是否可取消订单 1 可取消 0不可取消
        "order_state": string,   // 订单状态
        "actual_amount": number,       //订单总金额
        "manjian_dec_price": string, // 优惠卷金额
        "coupon_dec_price": string,  // 满减金额
        "goodslist_total": number,       // 产品总数
        "discount": number        // 优惠折扣总额
        "goodsList": [              // 产品列表
            {
                "goods_id": string,      // 产品ID
                "goods_name": string,       //产品名称
                "actual_goods_number": string, // 购买数量
                "unit_price": string,     // 单价
                "full_gift_id": string
            }
        ]
    }

    export type orderInfo = {
        order_no: string,
        order_id: string,
        order_mode: string,
        actual_amount: number,
        create_time: string,
        consignee_name: string,
        consignee_mobile: string,
        province_name: string,
        city_name: string,
        district_name: string,
        address: string,
        remark: string,
        manjian_dec_price: string,
        coupon_dec_price: string,
        goodsList: [
            {
                goods_name: string,
                unit_price: string,
                goods_unit: string,
                actual_goods_number: string,
                manjian_dec_price: string,
                coupon_dec_price: string,
                full_gift_id: IsOrNo,
                actual_total: string
            }
        ]
    }

    export type coupon = {
        "coupon_id": string,   // 优惠券ID
        "coupon_no": string,  // 优惠券编号
        "start_use_time": string,  // 开始使用时间
        "end_use_time": string,  // 结束使用时间
        "ctype_name": string,  // 优惠券名称
        "limit_cat_ids": string,
        "demo": string,
        "coupons_price": string,  // 优惠券金额
        "order_price": string,  // 使用条件 0 为直减
        "limit_cat_demo": string,  // 分类限制
        "limit_area_demo": string  // 地区限制
    }
    export type couponList = coupon[];


    export type orderCheckInfo = {
        "receiveAddress": {  // 收货地址信息
            "address_id": string,
            "user_id": string,
            "province_id": string,
            "province_name": string,  // 省名称
            "city_id": string,
            "city_name": string,  // 市名称
            "district_id": string,
            "district_name": string,  // 区名称
            "address": string,  // 详细地址
            "add_time": string,
            "last_update_time": string,
            "name": string,  // 收货人姓名
            "mobile": string,  // 收货人联系方式
            "block_id": string
        },
        "deliveryType": [  // 支付方式
            {
                "type_id": string,  // 对应键值
                "type_name": string  // 描述
            }
        ],
        "deliveryTime": [  // 送货时间 都为次日
            {
                "id": string,  // 送货时间ID
                "start_time": string, // 开始时间
                "end_time": string,  // 结束时间
                "district_user_id": string,
                "is_system": string
            }
        ],
        "goodsList": [  // 购物车商品列表
            {
                "goods_id": string,
                "goods_name": string,  // 商品名称
                "goods_spec": string,  // 描述
                "pcat_id": string,
                "cat_id": string,
                "min_quantity": string,  // 起订量
                "limit_stock": string,
                "goods_stock": string,  // 库存
                "goods_unit": string,  // 单位
                "cover_img": string,
                "district_user_id": string,
                "is_sales": IsOrNo,  // 是否促销 1 是 0 否
                "start_time": string,  // 秒杀开始时间
                "end_time": string,  // 秒杀结束时间
                "is_time_limit": string,  // 是否秒杀产品 1 是 0 否
                "error_code": string,  // 错误编码 空为正常 goods_not_online 商品已下架 sell_time_error  不在销售时间内  min_quantity_error 购买数量小于最低起订量  goods_stock_error  库存不足  limit_stock_error  超过限购数量
                "canBuy": string,  // 当日可购买量
                "cur_price": string,  // 当前价格
                "buy_number": string,  // 购买数量
                "goods_img": string, // 产品图片路径
                "total": string,  // 总计
                "cur_total": string,  // 优惠后总计
                "coupon_dec_price": string,
                "manjian_dec_price": string,
                "coupon_id": string,
                "manjian_step_id": string,
                "manjian_id": string
            }
        ],
        "mjList": [  // 可用满减信息列表
            {
                "manjian_id": string,
                "manjian_name": string,  // 满减标题
                "limit_cat_ids": string,
                "limit_type": string,
                "limit_number": string,
                "total_number": string,
                "order_price": string,  // 使用的分档订单金额
                "dec_price": string  // 优惠金额
            }
        ],
        "fgList": [  // 满赠商品列表
            {
                "full_gift_step_id": string,
                "full_gift_id": string,
                "order_price": string,  // 使用的分档订单金额
                "goods_id": string,  // 赠品ID
                "gift_number": string,  // 赠品数量
                "goods_name": string,  // 赠品名称
                "goods_unit": string,  // 赠品单位
                "user_id": string,
                "district_user_id": string
            }
        ],
        "couponList": {  // 优惠券信息
            "useList": [  // 可使用列表
                {
                    "coupon_id": string,   // 优惠券ID
                    "coupon_no": string,  // 优惠券编号
                    "start_use_time": string,  // 开始使用时间
                    "end_use_time": string,  // 结束使用时间
                    "ctype_name": string,  // 优惠券名称
                    "limit_cat_ids": string,
                    "demo": string,
                    "coupons_price": string,  // 优惠券金额
                    "order_price": string,  // 使用条件 0 为直减
                    "limit_cat_demo": string,  // 分类限制
                    "limit_area_demo": string // 地区限制
                }
            ],
            "unUseList": [  // 不可使用列表
                {
                    "coupon_id": string,
                    "coupon_no": string,
                    "start_use_time": string,
                    "end_use_time": string,
                    "ctype_name": string
                    "limit_cat_ids": string,
                    "demo": string,
                    "coupons_price": string,
                    "order_price": string,
                    "limit_cat_demo": string,
                    "limit_area_demo": string
                }
            ],
            "total": string   // 优惠券总数量
        }
    }
}