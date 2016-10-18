import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Text,
    Button,
    Table
} from '../../common/native';
import OrderInfo from '../../scene/OrderInfo';
import { Factory as f } from '../../../class/Factory';
import { arrayHp } from '../../../helper';

type props = {
    data: tComponent.Order,
    cancelOrderCallBack: tCommon.anyFun
}
type state = tCommon.reactState;


export class OneOrder extends baseNativeComponent<props, state> {
    render() {
        const {data, cancelOrderCallBack} = this.props;
        const orderStateColor = {
            color: data.order_state == '订单完成' ? '#2ecc71' : (data.order_state == '订单失败' ? '#6a6a6a' : 'red')
        }
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>订单号：{data.order_no}</Text>
                    <Text style={[styles.titleText, orderStateColor]}>{data.order_state}</Text>
                </View>
                <Table style={styles.goodsTable}>
                    <Table.Tr style={styles.goodsTableTr}>
                        <Table.ThText style={[styles.goodsTableThText, styles.goodsTableColumn1]}>商品名称</Table.ThText>
                        <Table.ThText style={[styles.goodsTableThText, styles.goodsTableColumn2]}>数量</Table.ThText>
                        <Table.ThText style={[styles.goodsTableThText, styles.goodsTableColumn3]}>单价</Table.ThText>
                    </Table.Tr>
                    {
                        arrayHp.isArray(data.goodsList) && data.goodsList.map(
                            (v, i) => {
                                const trStyle = i % 2 == 0 ? [styles.goodsTableTr, styles.goodsTableTrOdd] : styles.goodsTableTr;
                                return (
                                    <Table.Tr key={v.goods_id} style={trStyle}>
                                        <Table.TdText style={[styles.goodsTableTdText, styles.goodsTableColumn1]}>{v.goods_name}</Table.TdText>
                                        <Table.TdText style={[styles.goodsTableTdText, styles.goodsTableColumn2]}>{v.actual_goods_number}</Table.TdText>
                                        <Table.TdText style={[styles.goodsTableTdText, styles.goodsTableColumn3]}>{v.unit_price}</Table.TdText>
                                    </Table.Tr>
                                )
                            }
                        )
                    }
                </Table>
                <View style={styles.statisticsInfoView}>
                    <Text style={styles.statisticsGoodsCount}>共计:{data.goodslist_total}件商品</Text>
                    <Text style={styles.statisticsPriceCount}>合计:￥{data.actual_amount.toFixed(2)}<Text style={styles.statisticsDiscountCount}>(已-￥{data.discount.toFixed(2)})</Text></Text>
                </View>
                <View style={styles.buttonView}>
                    <Button style={styles.button} text='详    情' textStyle={styles.buttonTextStyle} onPress={() => {
                        f.Navigation.push({
                            component: OrderInfo,
                            params: {
                                orderId: data.order_id
                            }
                        })
                    } } />
                    {data.is_cancel == 1 || data.is_cancel == '1' ?
                        <Button style={styles.button} text='取消订单' textStyle={styles.buttonTextStyle} onPress={() => cancelOrderCallBack(data)} /> : null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    titleView: React.ViewStyle,
    titleText: React.TextStyle,
    goodsTable: React.ViewStyle,
    goodsTableTr: React.ViewStyle,
    goodsTableThText: React.TextStyle,
    goodsTableTdText: React.TextStyle,
    goodsTableTrOdd: React.ViewStyle,
    goodsTableColumn1: React.ViewStyle,
    goodsTableColumn2: React.ViewStyle,
    goodsTableColumn3: React.ViewStyle,
    statisticsInfoView: React.ViewStyle,
    statisticsGoodsCount: React.TextStyle,
    statisticsPriceCount: React.TextStyle,
    statisticsDiscountCount: React.TextStyle,
    buttonView: React.ViewStyle,
    button: React.ViewStyle,
    buttonTextStyle: React.TextStyle,
}>({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        paddingHorizontal: f.Device.getActualSize(10),
        paddingTop: f.Device.getActualSize(6),
        marginBottom: f.Device.getActualSize(6),
        alignItems: 'stretch'
    },
    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: f.Device.getActualSize(3),
        marginBottom: f.Device.getActualSize(4),
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    titleText: {
        fontSize: f.Device.getActualSize(8)
    },
    goodsTable: {},
    goodsTableTr: {},
    goodsTableThText: {},
    goodsTableTdText: {
        color: '#2ecc71'
    },
    goodsTableTrOdd: {
        backgroundColor: '#f6f6f6'
    },
    goodsTableColumn1: {
        flex: 1.5
    },
    goodsTableColumn2: {
        flex: 1
    },
    goodsTableColumn3: {
        flex: 1
    },
    statisticsInfoView: {
        marginTop: f.Device.getActualSize(6),
        paddingBottom: f.Device.getActualSize(2),
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    statisticsGoodsCount: {
        fontSize: f.Device.getActualSize(6)
    },
    statisticsPriceCount: {
        fontSize: f.Device.getActualSize(8),
        color: '#fb6c21'
    },
    statisticsDiscountCount: {
        color: 'black',
        fontSize: f.Device.getActualSize(6)
    },
    buttonView: {
        paddingVertical: f.Device.getActualSize(4),
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    button: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        paddingHorizontal: f.Device.getActualSize(8),
        paddingVertical: f.Device.getActualSize(3),
        marginLeft: f.Device.getActualSize(5)
    },
    buttonTextStyle: {
        fontSize: f.Device.getActualSize(7)
    }
});
