import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Image,
    TouchableOpacity,
    Text
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';
import { OneCartGoods } from './';
import { arrayHp } from '../../../helper';

type props = {
    data: tComponent.cart,
    deleteOne: (id: string, callback: tCommon.anyFun) => void,
    changeCountCallBack: (addMoney: number, count?: number, id?: string) => void,
    setErrorInfo: (id: string, error: boolean) => void,
    setNowFocusNode: (node: any) => void
}
type state = {
    titleOpen?: boolean,
    stepItem?: tComponent.cartManJianStep
}

export class OneCart extends baseNativeComponent<props, state> {
    private nowTotal: number;
    constructor(props: props) {
        super();
        const nowTotal = arrayHp.sum(props.data.goodsList.map((v) => {
            return parseFloat(v.cur_price) * parseFloat(v.buy_number)
        }))
        this.nowTotal = nowTotal;

        let stepItem: tComponent.cartManJianStep | undefined = undefined;
        stepItem = arrayHp.findLast(props.data.stepList, function (v) { return parseInt(v.order_price) <= nowTotal });

        this.state = {
            titleOpen: false,
            stepItem: stepItem
        }
    }
    render() {
        const {data, deleteOne, setErrorInfo, setNowFocusNode} = this.props;
        const {titleOpen = false, stepItem} = this.state;

        return (
            <View style={styles.container}>
                {
                    data.manjian_id.toString() != '0' ?
                        <View style={styles.titleContainer}>
                            <TouchableOpacity style={styles.titleView} onPress={this.titleOpen}>
                                <Image source={require('./img/manjian.png')} style={styles.titleImage} />
                                <Text style={styles.titleText}>{data.manjian_name + (stepItem ? '  满' + stepItem.order_price + '元，立减' + stepItem.dec_price : '')}</Text>
                                <Image source={titleOpen ? titleDownImage : titleRightImage}
                                    style={titleOpen ? styles.titleOpenImageDown : styles.titleOpenImageRight} />
                            </TouchableOpacity>
                            {
                                titleOpen && data.stepList instanceof Array &&
                                data.stepList.map(
                                    (v) => {
                                        return (
                                            <View style={styles.manjianItemView} key={v.step_id}>
                                                <View style={styles.manjianItemImageView}>
                                                    {
                                                        stepItem && v.step_id == stepItem.step_id ? <Image source={require('./img/check.png')} style={styles.manjianItemImage} /> : null
                                                    }
                                                </View>
                                                <Text>满{v.order_price}元，立减{v.dec_price}</Text>
                                            </View>
                                        )
                                    }
                                )
                            }
                        </View> : null
                }

                {
                    data.goodsList instanceof Array &&
                    data.goodsList.map(
                        (v) => {
                            return (
                                <OneCartGoods data={v} key={v.goods_id} deleteCallBack={deleteOne} setNowFocusNode={setNowFocusNode}
                                    changeCountCallBack={this.changeCountCallBack} setErrorInfo={setErrorInfo} />
                            )
                        }
                    )
                }
            </View>
        )
    }

    private titleOpen = () => {
        this.setState(
            {
                titleOpen: !this.state.titleOpen
            }
        )
    }


    private changeCountCallBack = (id: string, count: number, addMoney: number) => {
        const {data, changeCountCallBack} = this.props;

        const preTotal = this.nowTotal;
        const preManJian = this.state.stepItem ? parseFloat(this.state.stepItem.dec_price) : 0;

        const nowTotal = this.nowTotal + addMoney;
        this.nowTotal = nowTotal;

        let stepItem: tComponent.cartManJianStep | undefined = undefined;
        stepItem = arrayHp.findLast(data.stepList, function (v) { return parseFloat(v.order_price) <= nowTotal });
        this.setState(
            {
                stepItem: stepItem
            }
        )
        const nowManJian = stepItem ? parseFloat(stepItem.dec_price) : 0;

        changeCountCallBack((nowTotal - nowManJian) - (preTotal - preManJian), count, id)
    }
}

const titleRightImage = require('./img/forward.png');
const titleDownImage = require('./img/down.png');

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    titleContainer: React.ViewStyle,
    titleView: React.ViewStyle,
    titleImage: React.ImageStyle,
    titleText: React.TextStyle,
    titleOpenImageRight: React.ImageStyle,
    titleOpenImageDown: React.ImageStyle,
    manjianItemView: React.ViewStyle,
    manjianItemImageView: React.ViewStyle,
    manjianItemImage: React.ImageStyle,
    manjianItemText: React.TextStyle,

}>({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: f.Device.getActualSize(15),
    },
    titleContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    titleView: {
        paddingHorizontal: f.Device.getActualSize(5),
        paddingVertical: f.Device.getActualSize(4),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fffbe6'
    },
    titleImage: {
        height: f.Device.getActualSize(12),
        width: f.Device.getActualSize(26),
        marginRight: f.Device.getActualSize(8),
    },
    titleText: {
        fontSize: f.Device.getActualSize(7),
        fontWeight: 'bold',
        flex: 1,
        marginRight: f.Device.getActualSize(4),
    },
    titleOpenImageRight: {
        width: f.Device.getActualSize(6),
        height: f.Device.getActualSize(10),
    },
    titleOpenImageDown: {
        width: f.Device.getActualSize(10),
        height: f.Device.getActualSize(6),
    },
    manjianItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        paddingVertical: f.Device.getActualSize(3),
        paddingHorizontal: f.Device.getActualSize(5),
    },
    manjianItemImageView: {
        width: f.Device.getActualSize(34)
    },
    manjianItemImage: {
        width: f.Device.getActualSize(7),
        height: f.Device.getActualSize(7),
        marginRight: f.Device.getActualSize(4)
    },
    manjianItemText: {
        flex: 1,
        textAlign: 'left',
        fontSize: f.Device.getActualSize(7)
    }
});