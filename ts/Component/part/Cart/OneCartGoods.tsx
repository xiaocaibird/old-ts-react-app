import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Image,
    ImageButton,
    Text,
    TextInput
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';
import { arrayHp } from '../../../helper';

type props = {
    data: tComponent.cartGoods,
    deleteCallBack: (id: string, callback: tCommon.anyFun) => void,
    changeCountCallBack: (id: string, count: number, addMoney: number) => void,
    setErrorInfo: (id: string, error: boolean) => void,
    setNowFocusNode: (node: any) => void
};
type state = {
    count?: number,
    price?: number,
    stepPriceList?: tComponent.goodsStepPrice[],
    errorType?: string
}

export class OneCartGoods extends baseNativeComponent<props, state> {
    constructor(props: props) {
        super();
        let count = parseInt(props.data.buy_number);
        if (isNaN(count) || count < 0) {
            count = 0;
        }
        this.state = {
            count: count,
            price: parseFloat(props.data.cur_price),
            stepPriceList: [],
            errorType: props.data.error_code
        }
    }

    render() {
        const {data, setNowFocusNode} = this.props;
        const {count = 0, price = 0, errorType = ''} = this.state;

        const errorText = getErrorText(errorType);
        return (
            <View style={styles.oneGoodsView}>
                <ImageButton style={styles.goodsImg} imageStyle={styles.goodsImg} source={{ uri: data.goods_img }} resizeMode='stretch' onPress={this.showClearLargePicture} />
                <View style={styles.rightView}>
                    <View style={styles.rightTopView}>
                        <View style={styles.mainInfoView}>
                            <Text style={[styles.titleText, errorText ? styles.errorTitleText : null]}>{data.goods_name}
                                {errorText ? <Text style={styles.errorText}>({errorText})</Text> : null}
                            </Text>
                            <Text style={styles.desText}>{data.goods_spec}</Text>
                            {data.is_sales == 1 || data.is_sales == '1' ? <Image source={require('./img/cuxiao.png')} resizeMode='stretch' style={styles.cuxiaoImg} /> : null}
                            {data.is_time_limit == 1 || data.is_time_limit == '1' ? <Image source={require('./img/miaosha.png')} resizeMode='stretch' style={styles.cuxiaoImg} /> : null}
                            <Text style={styles.priceText}>￥<Text style={styles.priceTextBig}>{price.toFixed(2)}</Text>元/{data.goods_unit}</Text>
                        </View>
                        <ImageButton source={require('./img/delete.png')} style={styles.deleteImageContainer} imageStyle={styles.deleteImage} onPress={this.onDeletePress} />
                    </View>
                    <View style={styles.inputView}>
                        <ImageButton source={require('./img/buy_red_jian.png')} onPress={this.onReducePress}
                            style={styles.inputViewImageButton} imageStyle={styles.inputViewImage} />
                        <TextInput value={count.toString()} style={styles.input} onChangeText={this.onChangeText}
                            keyboardType='numeric' clearButtonMode='never' maxLength={10} setNowFocusNode={setNowFocusNode} />
                        <ImageButton source={require('./img/buy_red.png')} onPress={this.onAddPress}
                            style={styles.inputViewImageButton} imageStyle={styles.inputViewImage} />
                    </View>
                </View>
            </View>
        )
    }
    private showClearLargePicture = () => {
        const {data} = this.props;
        f.Redux.changeState(
            f.Redux.action.appClearLargePictureShow(
                {
                    show: true,
                    path: data.goods_img
                }
            )
        );
    }
    private onDeletePress = () => {
        const {deleteCallBack, data, changeCountCallBack} = this.props;
        deleteCallBack(data.goods_id, () => {
            changeCountCallBack(data.goods_id, 0, -(this.state.count * this.state.price));
        });
    }

    private onReducePress = () => {
        this.onChangeText(this.state.count - 1);
    }

    private onAddPress = () => {
        this.onChangeText(this.state.count + 1);

    }

    private onChangeText = (text: string | number) => {
        const {data, changeCountCallBack, setErrorInfo} = this.props;
        if (data.error_code && data.error_code != 'min_quantity_error' && data.error_code != 'limit_stock_error' && data.error_code != 'goods_stock_error') {
            f.Prompt.warningPopUp('抱歉，该商品已经失效。无法操作。请将该商品从购物车中删除。', '商品失效');
            return;
        }

        let count = parseInt(text.toString());
        if (isNaN(count) || count < 0) {
            count = 0;
        }

        let errorType: string = '';
        if (count < parseInt(data.min_quantity)) {
            errorType = 'min_quantity_error';
        }
        else if (count > parseInt(data.canBuy)) {
            errorType = 'limit_stock_error';
        }
        else if (count > parseInt(data.goods_stock)) {
            errorType = 'goods_stock_error';
        }


        setErrorInfo(data.goods_id, errorType ? true : false);


        let stepPriceList = this.state.stepPriceList;

        const preTotal = this.state.count * this.state.price;

        if (!stepPriceList || stepPriceList.length <= 0) {
            f.AsyncOperation.run(
                () => f.Request.getGoodsInfo({ goods_id: data.goods_id }).then(
                    (data: tComponent.goodsInfo) => {
                        if (data.step_price instanceof Array) {
                            stepPriceList = data.step_price;
                            const nowStep = arrayHp.findLast(stepPriceList, function (v) { return parseInt(v.goods_number) <= count });

                            const nowPrice = nowStep ? nowStep.goods_price : stepPriceList[0].goods_price;
                            this.setState(
                                {
                                    count: count,
                                    price: parseFloat(nowPrice),
                                    stepPriceList: stepPriceList,
                                    errorType: errorType
                                }
                            )
                            const nowTotal = count * parseFloat(nowPrice);
                            changeCountCallBack(data.goods_id, count, nowTotal - preTotal);
                        }
                        else {
                            this.setState(
                                {
                                    count: count,
                                    errorType: errorType
                                }
                            )
                            const nowTotal = count * this.state.price;
                            changeCountCallBack(data.goods_id, count, nowTotal - preTotal);
                        }

                    }
                )
            )
        }
        else {
            const nowStep = arrayHp.findLast(stepPriceList, function (v) { return parseInt(v.goods_number) <= count });

            const nowPrice = nowStep ? nowStep.goods_price : stepPriceList[0].goods_price;
            this.setState(
                {
                    count: count,
                    price: parseFloat(nowPrice),
                    errorType: errorType
                }
            )

            const nowTotal = count * parseFloat(nowPrice);
            changeCountCallBack(data.goods_id, count, nowTotal - preTotal);
        }
    }
}

const getErrorText = (errorCode: string) => {
    switch (errorCode) {
        case 'goods_not_online':
            return '商品已经下架'
        case 'sell_time_error':
            return '不在销售时间内'
        case 'min_quantity_error':
            return '小于最低起订量'
        case 'goods_stock_error':
            return '库存不足'
        case 'limit_stock_error':
            return '超过限购数量'
        default:
            return ''
    }
}

const styles = StyleSheet.create<{
    oneGoodsView: React.ViewStyle,
    goodsImg: React.ImageStyle,
    rightView: React.ViewStyle,
    rightTopView: React.ViewStyle,
    mainInfoView: React.ViewStyle,
    titleText: React.TextStyle,
    errorTitleText: React.TextStyle,
    errorText: React.TextStyle,
    desText: React.TextStyle,
    priceText: React.TextStyle,
    priceTextBig: React.TextStyle,
    cuxiaoImg: React.ImageStyle,
    inputView: React.ViewStyle,
    inputViewImageButton: React.ImageStyle,
    inputViewImage: React.ImageStyle,
    input: React.TextStyle,
    deleteImageContainer: React.ViewStyle,
    deleteImage: React.ImageStyle
}>({
    oneGoodsView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        paddingTop: f.Device.getActualSize(4),
        paddingBottom: f.Device.getActualSize(6),
        backgroundColor: '#FFFFFF',
        paddingHorizontal: f.Device.getActualSize(4)
    },
    goodsImg: {
        width: f.Device.getActualSize(40),
        height: f.Device.getActualSize(40)
    },
    rightView: {
        flexDirection: 'column',
        flex: 1,
    },
    rightTopView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainInfoView: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: f.Device.getActualSize(5)
    },
    titleText: {
        fontSize: f.Device.getActualSize(8),
        fontWeight: 'bold',
        marginBottom: f.Device.getActualSize(3)
    },
    errorTitleText: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'red'
    },
    errorText: {
        color: '#899299'
    },
    desText: {
        fontSize: f.Device.getActualSize(7),
        color: '#6a6a6a',
        marginBottom: f.Device.getActualSize(3)
    },
    priceText: {
        fontSize: f.Device.getActualSize(7),
        color: 'red',
    },
    priceTextBig: {
        fontSize: f.Device.getActualSize(9)
    },
    cuxiaoImg: {
        width: f.Device.getActualSize(25),
        height: f.Device.getActualSize(10),
        marginBottom: f.Device.getActualSize(3)
    },
    deleteImageContainer: {
        width: f.Device.getActualSize(14),
        height: f.Device.getActualSize(14)
    },
    deleteImage: {
        width: f.Device.getActualSize(14),
        height: f.Device.getActualSize(14),
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputViewImageButton: {
        width: f.Device.getActualSize(14),
        height: f.Device.getActualSize(14),
    },
    inputViewImage: {
        width: f.Device.getActualSize(14),
        height: f.Device.getActualSize(14),
    },
    input: {
        width: f.Device.getActualSize(25),
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderRadius: f.Device.getActualSize(3),
        textAlign: 'center',
        paddingVertical: f.Device.getActualSize(3),
        marginHorizontal: f.Device.getActualSize(6),
        height: f.Device.getActualSize(16),
        fontSize: f.Device.getActualSize(8),
    },

});