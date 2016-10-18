import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseCartScene } from '../base';
import {
    View,
    ScrollView,
    Text,
    Button,
    Image,
    TextInput,
    TouchableOpacity,
    Picker
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import Cart from './Cart';
import CartCheckOrderCoupon from './CartCheckOrderCoupon';
import CartOrderSuccess from './CartOrderSuccess';
import { Factory as f } from '../../class/Factory';
import { arrayHp } from '../../helper';

type props = tCommon.reactProps;
type state = {
    data?: tComponent.orderCheckInfo,
    timeId?: string,
    couponId?: string,
    message?: string
}

export default class CartCheckOrder extends baseCartScene<props, state> {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        f.AsyncOperation.run(() =>
            f.Request.getCheckOrderInfo().then(
                (data: tComponent.orderCheckInfo) => {
                    this.setState(
                        {
                            data: data,
                            timeId: data.deliveryTime[0].id
                        }
                    )
                },
                (error) => {
                    f.Navigation.resetTo(
                        {
                            component: Cart
                        }
                    );
                    return f.AsyncOperation.getReject(error)
                }
            ))
    }
    render() {
        const {data, timeId, couponId, message = ''} = this.state;

        if (!data) return <View />

        const timeList: tNativeComponent.Picker.item[] = data.deliveryTime.map((v) => {
            return {
                lable: v.start_time + '-' + v.end_time,
                value: v.id
            }
        })

        let time = arrayHp.find(data.deliveryTime, { id: timeId });
        if (!time) {
            time = data.deliveryTime[0]
        }
        const coupon = arrayHp.find(data.couponList.useList, { coupon_id: couponId });

        const goodsMoney = arrayHp.sum(
            data.goodsList.map(
                (v) => {
                    return parseFloat(v.buy_number) * parseFloat(v.cur_price)
                }
            )
        );

        const manjianMoney = arrayHp.sum(
            data.mjList.map(
                (v) => {
                    return parseFloat(v.dec_price)
                }
            )
        )

        let totalMoney = goodsMoney - manjianMoney;

        if (coupon) {
            totalMoney -= parseFloat(coupon.coupons_price);
        }

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='订单核对' havePopLink={false} />
                <ScrollView bounces={false} contentContainerStyle={styles.ScrollView} ref='ScrollView' needTrimWhenKeyboardShow={true}>
                    <View style={[styles.borderBottomView, styles.topView]}>
                        <Image source={require('./img/OrderSubmission.png')} style={styles.topImage} />
                        <View style={styles.addressView}>
                            <Text style={styles.addressText}>{data.receiveAddress.name + ' ' + data.receiveAddress.mobile}</Text>
                            <Text style={styles.addressText}>{data.receiveAddress.address}</Text>
                        </View>
                    </View>
                    <View style={styles.borderBottomView}>
                        <View style={[styles.infoView, styles.lineBottomBorder]}>
                            <Text style={styles.commonText}>支持配送</Text>
                            <Text style={styles.commonText}>{data.deliveryType[0].type_name}</Text>

                        </View>
                        <TouchableOpacity style={styles.infoView} onPress={this.showPicker}>
                            <Text style={[styles.commonText, styles.greenText]} >配送时间(点击选择)</Text>
                            <Text style={styles.commonText}>次日{time.start_time}-{time.end_time}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.borderBottomView}>
                        <View style={[styles.infoView, styles.lineBottomBorder]}>
                            <Text style={styles.commonText}>满减</Text>
                        </View>
                        {
                            data.mjList instanceof Array && data.mjList.length > 0 ?
                                data.mjList.map((v, i) => {
                                    return (
                                        <View style={styles.infoView} key={i}>
                                            <Text style={[styles.commonText, styles.redText]} >{v.manjian_name}</Text>
                                            <Text style={[styles.commonText, styles.redText]} >-{v.dec_price}</Text>
                                        </View>
                                    )
                                }) : <View style={styles.infoView}><Text style={[styles.commonText, styles.grayText]} >未达满减条件</Text></View>
                        }
                    </View>
                    <View style={styles.borderBottomView}>
                        <View style={[styles.infoView, styles.lineBottomBorder]}>
                            <Text style={styles.commonText}>满赠</Text>
                        </View>
                        {
                            data.fgList instanceof Array && data.fgList.length ?
                                data.fgList.map((v, i) => {
                                    return (
                                        <View style={styles.infoView} key={i}>
                                            <Text style={[styles.commonText, styles.redText]} >赠送{v.gift_number + v.goods_unit + v.goods_name}</Text>
                                        </View>
                                    )
                                }) : <View style={styles.infoView}><Text style={[styles.commonText, styles.grayText]}>未达满赠条件</Text></View>
                        }
                    </View>
                    <TouchableOpacity style={[styles.borderBottomView, styles.couponView]} onPress={this.openCoupon}>
                        <Text style={styles.commonText}>优惠券</Text>
                        <Text style={[styles.commonText, styles.redText, styles.couponText]}>
                            {coupon ?
                                (coupon.ctype_name +
                                    (parseInt(coupon.order_price) == 0 ?
                                        ',直减' + coupon.coupons_price :
                                        ',满' + coupon.order_price + '减' + coupon.coupons_price)
                                ) :
                                ('有' + data.couponList.total + '张优惠券可用')}
                        </Text>
                        <Image source={require('./img/forward.png')} style={styles.forwardImage} />
                    </TouchableOpacity>
                    <View style={styles.borderBottomView}>
                        <Text style={styles.commonText}>留言</Text>
                        <TextInput style={styles.TextInput} multiline={true} maxLength={500} setNowFocusNode={this.setNowFocusNode}
                            placeholder='选填，可填写一些您的小要求。' value={message} onChangeText={this.onChangeText} />
                    </View>
                    <View style={styles.goodsInfoContainer}>
                        {
                            data.goodsList instanceof Array &&
                            data.goodsList.map(
                                (v) => {
                                    return (
                                        <View style={styles.goodsRow} key={v.goods_id}>
                                            <View style={styles.goodsTd1}>
                                                <Text style={styles.goodsTitle}>{v.goods_name}</Text>
                                                <Text style={styles.goodsSpec}>{v.goods_spec}</Text>
                                            </View>
                                            <Text style={styles.goodsTd2}>￥{v.cur_price}</Text>
                                            <Text style={styles.goodsTd3}>{v.buy_number + v.goods_unit}</Text>
                                        </View>
                                    )
                                }
                            )
                        }

                    </View>
                    <View style={styles.totalView}>
                        <Text style={styles.totalText}>
                            商品合计:
                        </Text>
                        <Text style={[styles.totalText, styles.redText]}>
                            ￥{goodsMoney.toFixed(2)}元
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>
                        需支付：{totalMoney.toFixed(2)}元
                    </Text>
                    <Button text='确认' style={styles.bottomButton}
                        textStyle={styles.bottomButtonText} onPress={this.submit} />
                </View>
                <Picker data={[timeList]} isDynamic={false} branchPickersStyles={styles.PickerStyle} title='配送时间' ref='Picker' okCallBack={this.timeOkCallBack} />
            </View>
        )
    }
    private setNowFocusNode = (node: any) => {
        (this.refs['ScrollView'] as ScrollView).setNowFocusNode(node);
    }
    private submit = () => {
        f.AsyncOperation.run(
            () => {
                return f.Request.submitOrder(
                    {
                        delivery_time_id: this.state.timeId!,
                        coupons_id: this.state.couponId!,
                        remark: this.state.message!
                    }
                ).then(
                    (data: any) => {
                        return f.Request.deleteCartsWithoutGlobalHandler({
                            goods_ids: this.state.data!.goodsList.map(
                                (v) => {
                                    return v.goods_id
                                }
                            )
                        }).then(
                            () => {
                                f.Redux.changeState(
                                    f.Redux.action.goodsDeleteFromCart(
                                        {
                                            cartGoodsTotal: 0
                                        }
                                    )
                                );
                                f.Navigation.resetTo(
                                    {
                                        component: CartOrderSuccess,
                                        params: {
                                            orderNo: data.order_no
                                        }
                                    }
                                )
                            }
                            )
                    },
                    (error) => {
                        f.Navigation.resetTo(
                            {
                                component: Cart
                            }
                        );
                        return f.AsyncOperation.getReject(error)
                    }
                    )
            }
        )
    }

    private onChangeText = (msg: string) => {
        this.setState(
            {
                message: msg
            }
        )
    }

    private openCoupon = () => {
        f.Navigation.push(
            {
                component: CartCheckOrderCoupon,
                params: {
                    list: this.state.data!.couponList.useList,
                    selectCallBack: this.selectCouponCallBack,
                    selectId: this.state.couponId
                }
            }
        )
    }
    private selectCouponCallBack = (id: string) => {
        this.setState(
            {
                couponId: id
            }
        );
    }
    private showPicker = () => {
        (this.refs['Picker'] as Picker).showPicker(true);
    }
    private timeOkCallBack = (values: string[]) => {
        this.setState(
            {
                timeId: values[0]
            }
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    bottomView: React.ViewStyle,
    bottomText: React.TextStyle,
    bottomButton: React.ViewStyle,
    bottomButtonText: React.TextStyle,
    borderBottomView: React.ViewStyle,
    topView: React.ViewStyle,
    topImage: React.ImageStyle,
    addressView: React.ViewStyle,
    addressText: React.TextStyle,
    infoView: React.ViewStyle,
    lineBottomBorder: React.ViewStyle,
    commonText: React.TextStyle,
    redText: React.TextStyle,
    grayText: React.TextStyle,
    greenText: React.TextStyle,
    forwardImage: React.ImageStyle,
    TextInput: React.TextStyle,
    goodsInfoContainer: React.ViewStyle,
    goodsRow: React.ViewStyle,
    goodsTd1: React.ViewStyle,
    goodsTd2: React.TextStyle,
    goodsTd3: React.TextStyle,
    goodsTitle: React.TextStyle,
    goodsSpec: React.TextStyle,
    totalView: React.ViewStyle,
    totalText: React.TextStyle,
    couponView: React.ViewStyle,
    couponText: React.TextStyle,
    PickerStyle: React.ViewStyle,
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    ScrollView: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingBottom: f.Device.getActualSize(10),
    },
    bottomView: {
        height: f.Device.getActualSize(22),
        paddingLeft: f.Device.getActualSize(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignItems: 'stretch',
        zIndex: 2
    },
    bottomText: {
        color: '#ffffff',
        fontSize: f.Device.getActualSize(8),
        alignSelf: 'center'
    },
    bottomButton: {
        paddingHorizontal: f.Device.getActualSize(10),
        backgroundColor: '#2ecc71',
        borderRadius: f.Device.getActualSize(0)
    },
    bottomButtonText: {
        color: '#ffffff',
        fontSize: f.Device.getActualSize(9),
        flexDirection: 'row'
    },
    borderBottomView: {
        paddingVertical: f.Device.getActualSize(4),
        borderBottomWidth: f.Device.getActualSize(2),
        borderColor: '#efefef',
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingHorizontal: f.Device.getActualSize(8),
    },
    couponView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    couponText: {
        flex: 1,
        paddingHorizontal: f.Device.getActualSize(6),
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    topImage: {
        width: f.Device.getActualSize(20),
        height: f.Device.getActualSize(28),
        marginRight: f.Device.getActualSize(8),
    },
    addressView: {
        flexDirection: 'column',
        flex: 1
    },
    addressText: {
        marginVertical: f.Device.getActualSize(2),
        fontSize: f.Device.getActualSize(9)
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: f.Device.getActualSize(3),
    },
    lineBottomBorder: {
        borderBottomWidth: 1,
        borderColor: '#efefef',
    },
    commonText: {
        fontSize: f.Device.getActualSize(8),
    },
    redText: {
        color: 'red'
    },
    grayText: {
        color: '#bfbfbf'
    },
    greenText: {
        color: '#2ecc71'
    },
    forwardImage: {
        width: f.Device.getActualSize(6),
        height: f.Device.getActualSize(11)
    },
    TextInput: {
        borderColor: '#efefef',
        borderWidth: 1,
        height: f.Device.getActualSize(50),
        borderRadius: f.Device.getActualSize(4),
        marginTop: f.Device.getActualSize(4),
        padding: f.Device.getActualSize(3),
        fontSize: f.Device.getActualSize(7),
        textAlignVertical: 'top'
    },
    goodsInfoContainer: {
        paddingHorizontal: f.Device.getActualSize(8),
        paddingTop: f.Device.getActualSize(3),
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    goodsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#efefef',
        borderBottomWidth: 1,
        paddingVertical: f.Device.getActualSize(3),
    },
    goodsTd1: {
        flex: 1.8,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    goodsTd2: {
        flex: 1,
        fontSize: f.Device.getActualSize(8),
        textAlign: 'center',
        color: 'red'
    },
    goodsTd3: {
        flex: 1,
        fontSize: f.Device.getActualSize(8),
        textAlign: 'center'
    },
    goodsTitle: {
        fontSize: f.Device.getActualSize(8),
        textAlign: 'left',
        paddingBottom: f.Device.getActualSize(3),
    },
    goodsSpec: {
        fontSize: f.Device.getActualSize(7),
        textAlign: 'left',
        color: '#bfbfbf'
    },
    totalView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: f.Device.getActualSize(8),
        paddingVertical: f.Device.getActualSize(4),
    },
    totalText: {
        fontSize: f.Device.getActualSize(8),
    },
    PickerStyle: {
        width: f.Device.getWindowWidth() * 0.5,

    }
});