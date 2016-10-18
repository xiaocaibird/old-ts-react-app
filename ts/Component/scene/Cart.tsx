import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseCartScene } from '../base';
import {
    View,
    ListView,
    Text,
    Button
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import {
    OneCart
} from '../part/Cart';
import CartCheckOrder from './CartCheckOrder';
import { Factory as f } from '../../class/Factory';
import { arrayHp, objHp } from '../../helper';

type props = tCommon.reactProps;
type state = {
    list?: React.ListViewDataSource,
    nowTotal?: number
}

export default class Cart extends baseCartScene<props, state> {
    private list: tComponent.cartList = [];
    private submitList: { id: string, count: number, error: boolean }[] = [];
    private deleteListId: string[] = [];
    private minMoney: number = 0;
    private needUploadData = true;
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows([]);
        this.state = {
            list: dataSource,
            nowTotal: 0
        }
        this._sceneProps.push(eNativeCommon.sceneProps.user);
    }
    componentWillUnmount() {
        if (this.needUploadData) {
            this.uploadData()
        }
    }
    componentDidMount() {
        this.getCartList();
    }
    render() {
        const {list, nowTotal = 0} = this.state;

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='购物车' havePopLink={false} />
                <ListView ref='ListView' contentContainerStyle={styles.ListView} style={styles.ListViewContainer} needTrimWhenKeyboardShow={true}
                    dataSource={list!} renderRow={this.ListViewRenderRow} bounces={false} />
                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>
                        合计：{nowTotal.toFixed(2)}元<Text style={styles.minMoneyText}>{' - ￥' + this.minMoney.toFixed(2) + '起订'}</Text>
                    </Text>
                    <Button text={'确认(' + this.submitList.length + ')'} style={styles.bottomButton}
                        textStyle={styles.bottomButtonText} onPress={this.onSubmit} />
                </View>
            </View >
        )
    }
    private setNowFocusNode = (node: any) => {
        (this.refs['ListView'] as ListView).setNowFocusNode(node);
    }
    private setErrorInfo = (id: string, error: boolean) => {
        const index = arrayHp.findIndex(this.submitList, { id: id });
        if (this.submitList[index]) {
            this.submitList[index].error = error
        }
    }

    private onSubmit = () => {
        if (this.state.nowTotal + 0.00001 < this.minMoney) {
            f.Prompt.warningPopUp('抱歉，至少要购买' + this.minMoney.toFixed(2) + '元的商品才能下单。', '下单失败');
            return;
        }
        if (this.submitList.length <= 0) {
            f.Prompt.warningPopUp('抱歉，请至少选择一个有效商品。', '下单失败');
            return;
        }
        const errorItem = arrayHp.find(
            this.submitList, { error: true }
        );
        if (errorItem) {
            f.Prompt.warningPopUp('存在无效商品，请您重新确认购物车。', '下单失败');
            return;
        }

        this.uploadData().then(
            () => {
                f.Request.getCartList().then(
                    (data: { cartList: tComponent.cartList, orderLowest: any }) => {
                        this.needUploadData = false;
                        for (let j = 0; j < data.cartList.length; j++) {
                            const v = data.cartList[j];
                            if (v.goodsList instanceof Array) {
                                for (let i = 0; i < v.goodsList.length; i++) {
                                    if (v.goodsList[i].error_code != '') {
                                        f.Prompt.warningPopUp('存在无效商品，请您重新确认购物车。', '下单失败', () => {
                                            f.Navigation.resetTo(
                                                {
                                                    component: Cart
                                                }
                                            );
                                        })

                                        return;
                                    }
                                }
                            }
                        }
                        f.Navigation.resetTo(
                            {
                                component: CartCheckOrder
                            }
                        )
                    }
                )
            }
        )
    }

    private uploadData = () => {
        return f.AsyncOperation.run(
            () => {
                return f.Request.deleteCartsWithoutGlobalHandler({
                    goods_ids: this.deleteListId
                }).then(
                    () => {
                        if (this.submitList.length > 0) {
                            return Promise.all.apply(null, this.submitList.map((v) => {
                                return f.Request.addGoodsToCartWithoutGlobalHandler(
                                    {
                                        goods_id: v.id,
                                        goods_num: v.count
                                    }
                                )
                            }))
                        }
                        else {
                            return f.AsyncOperation.getResolve()
                        }
                    }
                    )
            }
        )
    }

    private changeCountCallBack = (addMoney: number, count: number = 0, id?: string) => {
        const index = arrayHp.findIndex(this.submitList, { id: id });
        if (this.submitList[index]) {
            this.submitList[index].count = count
        }
        this.setState(
            {
                nowTotal: this.state.nowTotal + addMoney
            }
        );
    }

    private deleteOne = (id: string, callback: tCommon.anyFun) => {
        f.Prompt.confirmPopUp('您确定要删除该商品？', '删除商品', () => {
            const index = arrayHp.findIndex(this.list,
                (v) => {
                    return arrayHp.find(v.goodsList, (g) => g.goods_id == id) != null
                }
            )
            if (!this.list[index]) return;
            callback();
            this.list = objHp.cloneDeep(this.list);

            f.Redux.changeState(
                f.Redux.action.goodsDeleteFromCart({
                    cartGoodsTotal: f.Redux.getState().appGlobal.cartGoodsTotal - 1
                })
            );

            arrayHp.remove(
                this.list[index].goodsList, (v) => {
                    return v.goods_id == id
                }
            )
            arrayHp.remove(
                this.submitList, (v) => {
                    return v.id == id
                }
            )
            this.deleteListId.push(id);

            if (this.list[index].goodsList.length <= 0) {
                arrayHp.pullAt(this.list, index);
            }

            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            const dataSource = ds.cloneWithRows(this.list);
            this.setState({
                list: dataSource
            });
        })

    }
    private ListViewRenderRow = (v: tComponent.cart) => {
        return <OneCart data={v} deleteOne={this.deleteOne} changeCountCallBack={this.changeCountCallBack}
            setErrorInfo={this.setErrorInfo} setNowFocusNode={this.setNowFocusNode} />
    }


    private getCartList = () => {
        return f.AsyncOperation.run(
            () => f.Request.getCartList().then(
                (data: { cartList: tComponent.cartList, orderLowest: any }) => {
                    this.minMoney = parseFloat(data.orderLowest.orderPrice);

                    this.list = data.cartList;
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    const dataSource = ds.cloneWithRows(data.cartList);

                    let nowTotal = 0;

                    data.cartList.forEach(
                        (v) => {
                            nowTotal += arrayHp.sum(v.goodsList.map(
                                (g) => {
                                    this.submitList.push({ id: g.goods_id, count: parseInt(g.buy_number), error: g.error_code ? true : false });
                                    return parseFloat(g.cur_price) * parseFloat(g.buy_number)
                                }
                            )
                            ) - parseFloat(v.cur_manjian_order_price);
                        }
                    );
                    f.Redux.changeState(
                        f.Redux.action.cartGetList(
                            {
                                cartGoodsTotal: this.submitList.length
                            }
                        )
                    )
                    this.setState({
                        list: dataSource,
                        nowTotal: nowTotal
                    });
                }
            )
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ListViewContainer: React.ViewStyle
    ListView: React.ViewStyle,
    bottomView: React.ViewStyle,
    bottomText: React.TextStyle,
    bottomButton: React.ViewStyle,
    bottomButtonText: React.TextStyle,
    minMoneyText: React.TextStyle,
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    ListViewContainer: {
        backgroundColor: '#f0f0f0',
        flex: 1
    },
    ListView: {
        flexDirection: 'column',
        paddingBottom: f.Device.getActualSize(10)
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
    minMoneyText: {
        fontSize: f.Device.getActualSize(7),
        alignSelf: 'flex-end',
        color: '#ffffff'
    }
});