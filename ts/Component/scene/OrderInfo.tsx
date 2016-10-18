import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseOrderScene } from '../base';
import {
    View,
    ScrollView,
    Text,
    Table
} from '../common/native';
import {
    CommonPageTitleBar,
} from '../part/common';
import { Factory as f } from '../../class/Factory';
import OrderList from './OrderList';

type props = {
    orderId?: string
};
type state = {
    data?: tComponent.orderInfo
}
export default class OrderInfo extends baseOrderScene<props, state> {
    constructor() {
        super();
        this.state = {
        }
    }
    componentDidMount() {
        const {orderId} = this.props;
        if (!orderId) {
            f.Navigation.resetTo({ component: OrderList });
            return;
        }
        f.Request.getOrderInfo({ order_id: orderId }).then(
            (data: any) => {
                this.setState(
                    {
                        data: data
                    }
                )
            }
        );
    }

    render() {
        const {data } = this.state;
        if (!data) return <View />

        const orderStatus = getOrderStatus(data.order_mode.toString());

        const orderStateColor = {
            color: orderStatus == '订单完成' ? '#2ecc71' : (orderStatus == '订单失败' ? '#6a6a6a' : 'red')
        }

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='订单详情' />
                <ScrollView contentContainerStyle={styles.ScrollView} bounces={false}>
                    <View style={styles.topView}>
                        <Text style={styles.topViewTextLeft}>订单状态</Text>
                        <Text style={[styles.topViewTextRight, orderStateColor]}>{orderStatus}</Text>
                    </View>
                    <View style={[styles.addressView, styles.infoBg]}>
                        <Text style={styles.addressText}>{data.consignee_name + '    ' + data.consignee_mobile}</Text>
                        <Text style={styles.addressText}>{data.address}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitleText}>下单时间:</Text>
                        <Text style={styles.infoText}>{data.create_time}</Text>
                    </View>
                    <View style={[styles.infoView, styles.infoBg]}>
                        <Text style={styles.infoTitleText}>订单编号:</Text>
                        <Text style={styles.infoText}>{data.order_no}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitleText}>满减:</Text>
                        <Text style={[styles.infoText, parseFloat(data.manjian_dec_price) > 0.001 ? { color: 'red' } : null]}>-{parseFloat(data.manjian_dec_price).toFixed(2)}</Text>
                    </View>
                    <View style={[styles.infoView, styles.infoBg]}>
                        <Text style={styles.infoTitleText}>优惠券:</Text>
                        <Text style={[styles.infoText, parseFloat(data.coupon_dec_price) > 0.001 ? { color: 'red' } : null]}>-{parseFloat(data.coupon_dec_price).toFixed(2)}</Text>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={styles.infoTitleText}>订单留言:</Text>
                        <Text style={styles.infoText}>{data.remark}</Text>
                    </View>
                    <View style={styles.tableTitle}>
                        <Text style={styles.tableTitleText}>订单内容</Text>
                    </View>
                    <Table style={styles.table}>
                        <Table.Tr style={styles.tr}>
                            <Table.Th style={styles.th1}>
                                <Text style={styles.thText}>商品名称</Text>
                            </Table.Th>
                            <Table.Th style={styles.th}>
                                <Text style={styles.thText}>数量</Text>
                            </Table.Th>
                            <Table.Th style={styles.th}>
                                <Text style={styles.thText}>单价</Text>
                            </Table.Th>
                            <Table.Th style={styles.th}>
                                <Text style={styles.thText}>总价</Text>
                            </Table.Th>
                        </Table.Tr>
                        {
                            data.goodsList instanceof Array && data.goodsList.map(
                                (v, i) => {
                                    return (
                                        <Table.Tr style={styles.tr} key={i}>
                                            <Table.Td style={styles.td1}>
                                                <Text style={styles.tdText}>{v.goods_name}
                                                    {v.full_gift_id == '1' || v.full_gift_id == 1 ? <Text style={styles.goodsGiftText}>(赠)</Text> : null}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td style={styles.td}>
                                                <Text style={styles.tdText}>{v.actual_goods_number}</Text>
                                            </Table.Td>
                                            <Table.Td style={styles.td}>
                                                <Text style={styles.tdText}>{v.unit_price}</Text>
                                            </Table.Td>
                                            <Table.Td style={styles.td}>
                                                <Text style={styles.tdText}>{v.actual_total + '元'}</Text>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                }
                            )
                        }
                    </Table>
                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>实需付款:￥{data.actual_amount}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const getOrderStatus = (num: string) => {
    switch (num) {
        case '1':
            return '审核中'
        case '2':
            return '未发货'
        case '3':
            return '已发货'
        case '4':
            return '订单完成'
        case '5':
            return '订单失败'
        default:
            return '审核中'
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    topView: React.ViewStyle,
    topViewTextLeft: React.TextStyle,
    topViewTextRight: React.TextStyle,
    addressView: React.ViewStyle,
    addressText: React.TextStyle,
    infoView: React.ViewStyle,
    infoBg: React.ViewStyle,
    infoTitleText: React.TextStyle,
    infoText: React.TextStyle,
    tableTitle: React.ViewStyle,
    tableTitleText: React.TextStyle,
    table: React.ViewStyle,
    tr: React.ViewStyle,
    th: React.ViewStyle,
    th1: React.ViewStyle,
    thText: React.TextStyle,
    td: React.ViewStyle,
    td1: React.ViewStyle,
    tdText: React.TextStyle,
    goodsGiftText: React.TextStyle,
    bottomView: React.ViewStyle,
    bottomText: React.TextStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    ScrollView: {
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingBottom: f.Device.getActualSize(15),
        paddingHorizontal: f.Device.getActualSize(5)
    },
    topView: {
        marginTop: f.Device.getActualSize(5),
        marginBottom: f.Device.getActualSize(3),
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    topViewTextLeft: {
        flex: 1,
        textAlign: 'left',
        fontSize: f.Device.getActualSize(8)
    },
    topViewTextRight: {
        flex: 1,
        textAlign: 'right',
        fontSize: f.Device.getActualSize(8)
    },
    addressView: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: f.Device.getActualSize(3),
    },
    addressText: {
        fontSize: f.Device.getActualSize(8),
        marginVertical: f.Device.getActualSize(1)
    },
    infoView: {
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: f.Device.getActualSize(3),
    },
    infoBg: {
        backgroundColor: '#f6f6f6'
    },
    infoTitleText: {
        fontSize: f.Device.getActualSize(8),
        flex: 1
    },
    infoText: {
        fontSize: f.Device.getActualSize(8),
        flex: 2.5
    },
    tableTitle: {
        marginTop: f.Device.getActualSize(5),
        borderWidth: 1,
        borderColor: '#e1e1e1',
        backgroundColor: '#fff9e4',
        paddingVertical: f.Device.getActualSize(5),
        flexDirection: 'column',
        alignItems: 'center',
    },
    tableTitleText: {
        textAlign: 'center',
        fontSize: f.Device.getActualSize(8)
    },
    table: {},
    tr: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        borderLeftWidth: 1,
        borderLeftColor: '#e1e1e1',
    },
    th: {
        borderRightWidth: 1,
        borderRightColor: '#e1e1e1',
        padding: f.Device.getActualSize(3),
        flex: 1
    },
    th1: {
        borderRightWidth: 1,
        borderRightColor: '#e1e1e1',
        padding: f.Device.getActualSize(3),
        flex: 2,
    },
    thText: {
        fontWeight: 'bold',
        fontSize: f.Device.getActualSize(8)
    },
    td: {
        borderRightWidth: 1,
        borderRightColor: '#e1e1e1',
        padding: f.Device.getActualSize(3),
        flex: 1
    },
    td1: {
        borderRightWidth: 1,
        borderRightColor: '#e1e1e1',
        padding: f.Device.getActualSize(3),
        flex: 2
    },
    tdText: {
        fontSize: f.Device.getActualSize(7)
    },
    goodsGiftText: {
        color: 'red'
    },
    bottomView: {
        marginTop: f.Device.getActualSize(8),
        paddingTop: f.Device.getActualSize(4),
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    bottomText: {
        textAlign: 'right',
        fontSize: f.Device.getActualSize(10),
        color: '#fb6c21'
    }
});