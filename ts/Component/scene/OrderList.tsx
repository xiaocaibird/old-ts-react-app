import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseOrderScene } from '../base';
import {
    View,
    Table,
    Text,
    TextInput,
    ListView,
    Picker,
    DateTimePicker,
    Button
} from '../common/native';
import {
    CommonPageTitleBar,
    DrawerLayout
} from '../part/common';
import {
    OneOrder
} from '../part/OrderList';
import { Factory as f } from '../../class/Factory';
import { objHp } from '../../helper';

type props = tCommon.reactProps;
type state = {
    list?: React.ListViewDataSource,
    searchKeyValues?: {
        order_no?: string,
        stime?: string,
        etime?: string,
        order_mode?: string,
        order_modeText?: string
    }
}

export default class OrderList extends baseOrderScene<props, state> {
    private isListViewMounted = false;
    private isListViewUpdate = true;
    private pageSize = f.App.AppConfig.listViewPageSize;
    private orderListPostData: {
        psize: number,
        order_no?: string,
        stime?: string,
        etime?: string,
        order_mode?: number
    } = {
        psize: f.App.AppConfig.listViewPageSize
    }
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows([]);
        this.state = {
            list: dataSource,
            searchKeyValues: {
                order_no: '',
                order_modeText: '全部订单',
                order_mode: '0'
            }
        }
    }
    componentDidMount() {
        this.getOrderList();
    }

    render() {
        const {list, searchKeyValues = {}} = this.state;

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='我的订单' havePopLink={false} haveRightButton={true} buttonText='筛选' buttonPressCallBack={this.topButtonPressCallBack} />
                <View style={styles.scrollContainer}>
                    <ListView needTrim={true} contentContainerStyle={styles.ListView} style={styles.ListViewContainer}
                        onRefreshCallBack={this.onRefresh} dataSource={list!} renderRow={this.ListViewRenderRow} onEndReached={this.onEndReached} />
                    <DrawerLayout ref='DrawerLayout' pressMaskLayerToHide={true}>
                        <View style={styles.DrawerLayoutContent}>
                            <Table style={styles.Table}>
                                <Table.Tr style={styles.Tr}>
                                    <Table.Td style={styles.Td1}>
                                        <Text style={styles.titleText}>订单编号:</Text>
                                    </Table.Td>
                                    <Table.Td style={styles.Td2}>
                                        <TextInput style={styles.TextInput} placeholder='订单编号' value={searchKeyValues.order_no} onChangeText={this.onOrderNumberTextChange} />
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr style={styles.Tr}>
                                    <Table.Td style={styles.Td1}>
                                        <Text style={styles.titleText}>订单状态:</Text>
                                    </Table.Td>
                                    <Table.Td style={styles.Td2}>
                                        <Text onPress={this.onOrderStatusTextPress} style={styles.orderStatusText}>{searchKeyValues.order_modeText}</Text>
                                    </Table.Td>
                                </Table.Tr>
                                <Table.Tr style={styles.Tr}>
                                    <Table.Td style={styles.Td1}>
                                        <Text style={styles.titleText}>生成时间:</Text>
                                    </Table.Td>
                                    <Table.Td style={styles.Td2}>
                                        <Text onPress={this.onBeginDateTextPress} style={styles.dateText}>{searchKeyValues.stime ? searchKeyValues.stime : '开始时间'}</Text>
                                        <Text style={styles.middleText}>-</Text>
                                        <Text onPress={this.onEndDateTextPress} style={styles.dateText}>{searchKeyValues.etime ? searchKeyValues.etime : '结束时间'}</Text>
                                    </Table.Td>
                                </Table.Tr>
                            </Table>
                            <Button text='确定' style={styles.button} textStyle={styles.buttonText} onPress={this.onButtonPress} />
                        </View>
                    </DrawerLayout>
                </View>
                <Picker ref='OrderStatusPicker' isDynamic={false} branchPickersStyles={styles.OrderStatusPickerStyles} data={orderStatusList} title='订单状态' okCallBack={this.onOrderStatusPickerOkCallBack} />
                <DateTimePicker ref='beginDatePicker' title='开始时间' type={DateTimePicker.type.date} okCallBack={this.onBeginDatePickerOkCallBack} cancelCallBack={this.onBeginDatePickerCancelCallBack} />
                <DateTimePicker ref='endDatePicker' title='结束时间' type={DateTimePicker.type.date} okCallBack={this.onEndDatePickerOkCallBack} cancelCallBack={this.onEndDatePickerCancelCallBack} />
            </View >
        )
    }

    private onEndReached = () => {
        if (!this.isListViewMounted) return;

        const nowCount = this.orderListPostData.psize;
        this.orderListPostData.psize += this.pageSize;

        this.getOrderList().then(
            () => {
                if (!this.isListViewUpdate && nowCount == this.orderListPostData.psize) {
                    f.Prompt.promptToast('没有更多订单了！');
                }

                this.isListViewUpdate = false;
            }
        )
    }

    private onButtonPress = () => {
        try {
            const {searchKeyValues} = this.state;
            this.orderListPostData = {
                psize: this.pageSize,
                order_no: searchKeyValues!.order_no,
                order_mode: searchKeyValues!.order_mode != '0' ? parseInt(searchKeyValues!.order_mode!) : undefined,
                stime: searchKeyValues!.stime,
                etime: searchKeyValues!.etime
            }
            this.isListViewUpdate = true;
            this.getOrderList();
            (this.refs['DrawerLayout'] as DrawerLayout).showDrawerLayout(false);
        }
        catch (e) {

        }
    }

    private onBeginDateTextPress = () => {
        (this.refs['beginDatePicker'] as DateTimePicker).showPicker(true);
    }

    private onEndDateTextPress = () => {
        (this.refs['endDatePicker'] as DateTimePicker).showPicker(true);
    }

    private onOrderStatusTextPress = () => {
        (this.refs['OrderStatusPicker'] as DateTimePicker).showPicker(true);
    }

    private onOrderStatusPickerOkCallBack = (values: string[], items: tNativeComponent.Picker.item[]) => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    order_mode: values[0],
                    order_modeText: items[0] && items[0].lable
                })
            }
        );
    }
    private onBeginDatePickerOkCallBack = (values: string[]) => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    stime: values[0] + '-' + (parseInt(values[1]) + 1) + '-' + values[2]
                })
            }
        );
    }
    private onBeginDatePickerCancelCallBack = () => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    stime: undefined
                })
            }
        );
    }
    private onEndDatePickerOkCallBack = (values: string[]) => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    etime: values[0] + '-' + (parseInt(values[1]) + 1) + '-' + values[2]
                })
            }
        );
    }
    private onEndDatePickerCancelCallBack = () => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    etime: undefined
                })
            }
        );
    }
    private onOrderNumberTextChange = (text: string) => {
        this.setState(
            {
                searchKeyValues: objHp.assign({}, this.state.searchKeyValues, {
                    order_no: text
                })
            }
        );
    }

    private topButtonPressCallBack = () => {
        (this.refs['DrawerLayout'] as DrawerLayout).showChange();
    }

    private ListViewRenderRow = (v: tComponent.Order) => {
        return <OneOrder data={v} key={v.order_id} cancelOrderCallBack={this.cancelOrder} />
    }

    private cancelOrder = (order: tComponent.Order) => {
        f.Prompt.confirmPopUp(
            '您确定要取消编号为:' + order.order_no + '的订单？',
            '取消订单',
            () => {
                f.AsyncOperation.run(
                    () => f.Request.cancelOrder({ order_id: order.order_id }).then(
                        () => {
                            return f.Request.getOrderList(this.orderListPostData).then(
                                (data: tComponent.OrderList) => {
                                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                                    const dataSource = ds.cloneWithRows(data);
                                    this.setState(
                                        {
                                            list: dataSource
                                        }
                                    );
                                    this.orderListPostData.psize = data.length;
                                }
                            )
                        }
                    ),
                    () => {
                        f.Prompt.promptToast('订单取消成功!');
                    }
                )
            }
        );
    }

    private onRefresh = () => {
        this.orderListPostData.psize = this.pageSize;
        return this.getOrderList();
    }

    private getOrderList = () => {
        return f.AsyncOperation.run(
            () => f.Request.getOrderList(this.orderListPostData).then(
                (data: tComponent.OrderList) => {
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    const dataSource = ds.cloneWithRows(data);
                    this.setState(
                        {
                            list: dataSource
                        }
                    );
                    this.orderListPostData.psize = data.length;
                    this.isListViewMounted = true;
                }
            )
        )
    }
}

const orderStatusList: tNativeComponent.Picker.item[][] = [[
    {
        value: '0',
        lable: '全部订单'
    },
    {
        value: '1',
        lable: '审核中'
    },
    {
        value: '2',
        lable: '未发货'
    },
    {
        value: '3',
        lable: '等待收货'
    },
    {
        value: '4',
        lable: '订单完成'
    },
    {
        value: '5',
        lable: '订单失败'
    }
]]

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    scrollContainer: React.ViewStyle,
    ListViewContainer: React.ViewStyle
    ListView: React.ViewStyle,
    DrawerLayoutContent: React.ViewStyle,
    Table: React.ViewStyle,
    Tr: React.ViewStyle,
    Td1: React.ViewStyle,
    Td2: React.ViewStyle,
    titleText: React.TextStyle,
    TextInput: React.TextStyle,
    dateText: React.TextStyle,
    middleText: React.TextStyle,
    orderStatusText: React.TextStyle,
    OrderStatusPickerStyles: React.ViewStyle,
    button: React.ViewStyle,
    buttonText: React.TextStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    scrollContainer: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    ListViewContainer: {
        backgroundColor: '#f0f0f0',
        flex: 1
    },
    ListView: {
        flexDirection: 'column',
        paddingBottom: f.Device.getActualSize(15)
    },
    DrawerLayoutContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    Table: {
        flex: 1,
    },
    Tr: {
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        paddingVertical: f.Device.getActualSize(4)
    },
    Td1: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    Td2: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
    },
    titleText: {
        textAlign: 'center',
        fontSize: f.Device.getActualSize(8)
    },
    TextInput: {
        height: f.Device.getActualSize(8),
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        color: '#2ecc71'
    },
    dateText: {
        flex: 1,
        textAlign: 'center',
        fontSize: f.Device.getActualSize(7),
        color: '#2ecc71'
    },
    middleText: {
        width: f.Device.getActualSize(10),
        fontSize: f.Device.getActualSize(7),
        textAlign: 'center'
    },
    orderStatusText: {
        flex: 1,
        textAlign: 'left',
        fontSize: f.Device.getActualSize(7),
        color: '#2ecc71'
    },
    OrderStatusPickerStyles: {
        width: f.Device.getWindowWidth() * 0.5,
    },
    button: {
        width: f.Device.getWindowWidth() * 0.8,
        height: f.Device.getActualSize(20),
        marginVertical: f.Device.getActualSize(10),
        backgroundColor: '#2ecc71',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#ffffff'
    }
});