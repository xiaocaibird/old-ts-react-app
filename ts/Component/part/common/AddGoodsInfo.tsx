import * as React from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    MaskLayer,
    Animated,
    Image,
    ScrollView,
    TextInput,
    Text,
    Button,
    ImageButton
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';
import { objHp, arrayHp } from '../../../helper';

type props = {
    data?: tComponent.goodsInfo,
    show: boolean
};
type state = {
    bottomAnimated?: Animated.Value,
    count?: number
}

export class AddGoodsInfo extends baseNativeComponent<props, state> {
    private keyboardWillShowListener: React.EmitterSubscription;
    private keyboardWillHideListener: React.EmitterSubscription;

    private propsShowIsChangeByFalseToTrue: boolean = false;
    private isUpdated: boolean = false;

    constructor() {
        super();
        this.state = {
            bottomAnimated: new Animated.Value(-f.Device.getWindowHeight() * 0.5),
            count: 0
        }
    }
    componentDidMount() {
        if (f.Device.IsIOS) {
            this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow, null);
            this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide, null);
        }
    }
    componentWillUnmount() {
        if (this.keyboardWillShowListener) {
            this.keyboardWillShowListener.remove();
        }
        if (this.keyboardWillHideListener) {
            this.keyboardWillHideListener.remove();
        }
    }
    componentDidUpdate() {
        if (this.propsShowIsChangeByFalseToTrue) {
            Animated.spring(
                this.state.bottomAnimated!,
                {
                    toValue: 0
                }
            ).start();
        }
    }
    componentWillReceiveProps(nextProps: props) {
        this.propsShowIsChangeByFalseToTrue = false;
        if (objHp.isEqual(nextProps, this.props) || !nextProps || !nextProps.data) {
            return;
        }
        if (!this.props.show && nextProps.show) {
            this.propsShowIsChangeByFalseToTrue = true;
        }

        let count = parseInt(nextProps.data.min_quantity);
        if (isNaN(count) || count < 0) {
            count = 0;
        }
        this.setState(
            {
                count: count
            }
        );
        this.isUpdated = false;
    }
    hideAddGoods() {
        (this.refs['mainView'] as any)._component.measure(
            (
                _x: number,
                _y: number,
                _width: number,
                height: number,
                _pageX: number,
                _pageY: number
            ) => {
                Animated.timing(
                    this.state.bottomAnimated!,
                    {
                        toValue: -height
                    }
                ).start(() => {
                    f.Redux.changeState(
                        f.Redux.action.goodsShowInfo({ show: false })
                    )
                });
            }
        );

    }
    render() {
        const {data, show} = this.props;
        if (!data) {
            return <View style={styles.hide} />
        }

        const {bottomAnimated, count = 0} = this.state;
        const hide = show ? null : styles.hide;

        let nowStep: tComponent.goodsStepPrice | null = null;
        nowStep = arrayHp.findLast(data.step_price, function (v) { return parseInt(v.goods_number) <= count });

        const nowPrice = nowStep ? nowStep.goods_price : data.step_price[0].goods_price;
        return (
            <View style={[styles.container, hide]} >
                <MaskLayer onPress={this.onMaskLayerPress} />
                <Animated.View style={[styles.mainContainer, { bottom: bottomAnimated }]} ref='mainView'>
                    <ScrollView contentContainerStyle={styles.ScrollView} bounces={false}
                        showsVerticalScrollIndicator={true}>
                        <View style={styles.goodsMainView}>
                            <ImageButton style={styles.goodsImageContainer} source={{ uri: data.goods_img }} resizeMode='stretch' onPress={this.showClearLargePicture} />
                            <View style={styles.goodsInfoView}>
                                <Text style={styles.goodsNameText}>{data.goods_name}</Text>
                                <Text style={styles.goodSpecText}>{data.goods_spec}</Text>
                                <View style={styles.priceView}>
                                    {
                                        data.is_sales == '1' || data.is_sales == 1 ? <Image source={require('./img/cuxiao.png')} style={styles.priceViewImage} /> : null
                                    }
                                    {
                                        data.is_time_limit == '1' || data.is_time_limit == 1 ? <Image source={require('./img/miaosha.png')} style={styles.priceViewImage} /> : null
                                    }
                                    <Text style={styles.priceText}>￥{nowPrice}/{data.goods_unit}</Text>
                                </View>
                                <View style={styles.inputView}>
                                    <ImageButton source={require('./img/buy_red_jian.png')} onPress={this.onReducePress}
                                        style={styles.inputViewImageButton} imageStyle={styles.inputViewImage} />
                                    <TextInput value={count.toString()} style={styles.input} onChangeText={this.onChangeText}
                                        keyboardType='numeric' clearButtonMode='never' maxLength={10} />
                                    <ImageButton source={require('./img/buy_red.png')} onPress={this.onAddPress}
                                        style={styles.inputViewImageButton} imageStyle={styles.inputViewImage} />
                                </View>
                            </View>
                        </View>
                        {
                            data.manjian ?
                                <View style={styles.activeView}>
                                    <View style={styles.activeTitle}>
                                        <Image source={require('./img/reduce.png')} style={styles.activeImage} />
                                        <Text style={styles.activeTitleLeftText}>{data.manjian.manjian_name}</Text>
                                        <Text style={styles.activeTitleRightText}>{data.manjian.demo}</Text>
                                    </View>
                                    {
                                        data.manjian.step_list instanceof Array &&
                                        data.manjian.step_list.map(
                                            (v, i) => {
                                                return (
                                                    <Text key={i} style={styles.activeItemText}>
                                                        满{v.order_price}元，立减{v.dec_price}元
                                                </Text>
                                                )
                                            }
                                        )
                                    }
                                </View> : null}
                        {
                            data.fullgift ?
                                <View style={styles.activeView}>
                                    <View style={styles.activeTitle}>
                                        <Image source={require('./img/Give.png')} style={styles.activeImage} />
                                        <Text style={styles.activeTitleLeftText}>{data.fullgift.active_name}</Text>
                                        <Text style={styles.activeTitleRightText}>{data.fullgift.demo}</Text>
                                    </View>
                                    {
                                        data.fullgift.step_list instanceof Array &&
                                        data.fullgift.step_list.map(
                                            (v, i) => {
                                                return (
                                                    <Text key={i} style={styles.activeItemText}>
                                                        满{v.order_price}元，立赠{v.gift_number + v.goods_unit + v.goods_name}
                                                    </Text>
                                                )
                                            }
                                        )
                                    }
                                </View> : null}
                        {
                            data.step_price instanceof Array &&
                            data.step_price.map(
                                (v, i) => {
                                    return (
                                        <View key={i} style={styles.stepPriceOneView}>
                                            <Text style={styles.stepPriceOneViewLeftText}>
                                                ≥{v.goods_number + data.goods_unit}
                                            </Text>
                                            <Text style={styles.stepPriceOneViewRightText}>
                                                {v.goods_price}元/{data.goods_unit}
                                            </Text>
                                        </View>
                                    )
                                }
                            )
                        }
                    </ScrollView>
                    <View style={styles.bottomView}>
                        <Text style={styles.bottomText}>
                            合计：{(parseFloat(nowPrice) * count).toFixed(2)}元
                    </Text>
                        <Button text='确认' style={styles.bottomButton} onPress={this.onAddCartButton}
                            textStyle={styles.bottomButtonText} />
                    </View>
                </Animated.View>
            </View >
        )
    }
    private keyboardWillShow = (frames: any) => {
        if (this.props.show) {
            Animated.timing(
                this.state.bottomAnimated!,
                {
                    toValue: frames.endCoordinates.height
                }
            ).start();
        }
    }
    private keyboardWillHide = () => {
        if (this.props.show) {
            Animated.timing(
                this.state.bottomAnimated!,
                {
                    toValue: 0
                }
            ).start();
        }
    }
    private showClearLargePicture = () => {
        const {data} = this.props;
        f.Redux.changeState(
            f.Redux.action.appClearLargePictureShow(
                {
                    show: true,
                    path: data && data.goods_img
                }
            )
        );
    }
    private onAddCartButton = () => {
        const {data} = this.props;
        const {count} = this.state;
        if (!data) return;
        if (count < parseInt(data.min_quantity)) {
            f.Prompt.warningPopUp('您要购买的商品数量小于最低起订量！', '添加商品到购物车失败');
            return;
        }

        f.AsyncOperation.run(
            () => {
                return f.Request.addGoodsToCart({ goods_id: data.goods_id, goods_num: this.state.count! }).then(
                    () => {
                        f.Prompt.promptToast('添加商品进购物车成功！');
                        this.hideAddGoods();
                    }
                )
            }
        );
    }

    private onReducePress = () => {
        this.onChangeText(this.state.count - 1);
    }

    private onAddPress = () => {
        this.onChangeText(this.state.count + 1);
    }

    private onChangeText = (text: string | number) => {
        let count = parseInt(text.toString());
        if (isNaN(count) || count < 0) {
            count = 0;
        }
        this.setState(
            {
                count: count
            }
        )
    }
    private onMaskLayerPress = () => {
        this.hideAddGoods();
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    mainContainer: React.ViewStyle,
    hide: React.ViewStyle,
    bottomView: React.ViewStyle,
    bottomText: React.TextStyle,
    bottomButton: React.ViewStyle,
    bottomButtonText: React.TextStyle,
    ScrollView: React.ViewStyle,
    goodsMainView: React.ViewStyle,
    goodsImageContainer: React.ViewStyle,
    goodsInfoView: React.ViewStyle,
    goodsNameText: React.TextStyle,
    goodSpecText: React.TextStyle,
    priceView: React.ViewStyle,
    priceViewImage: React.ImageStyle,
    priceText: React.TextStyle,
    inputView: React.ViewStyle,
    inputViewImageButton: React.ImageStyle,
    inputViewImage: React.ImageStyle,
    input: React.TextStyle,
    activeView: React.ViewStyle,
    activeTitle: React.ViewStyle,
    activeImage: React.ImageStyle,
    activeTitleLeftText: React.TextStyle,
    activeTitleRightText: React.TextStyle,
    activeItemText: React.TextStyle,
    stepPriceOneView: React.ViewStyle,
    stepPriceOneViewLeftText: React.TextStyle,
    stepPriceOneViewRightText: React.TextStyle,
}>({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        zIndex: 110,
    },
    hide: {
        zIndex: -10000,
        opacity: 0
    },
    bottomView: {
        height: f.Device.getActualSize(22),
        paddingLeft: f.Device.getActualSize(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignItems: 'stretch'
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
        fontSize: f.Device.getActualSize(9)
    },
    mainContainer: {
        position: 'absolute',
        backgroundColor: '#E5E5E5',
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        maxHeight: f.Device.getWindowHeight() * 0.6
    },
    ScrollView: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    goodsMainView: {
        paddingTop: f.Device.getActualSize(8),
        paddingHorizontal: f.Device.getActualSize(6),
        paddingBottom: f.Device.getActualSize(4),
        marginBottom: f.Device.getActualSize(3),
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff'
    },
    goodsImageContainer: {
        width: f.Device.getScreenWidth() * 0.3,
        height: f.Device.getScreenWidth() * 0.3,
        marginRight: f.Device.getActualSize(5)
    },
    goodsInfoView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    goodsNameText: {
        fontWeight: 'bold',
        fontSize: f.Device.getActualSize(10),
        marginBottom: f.Device.getActualSize(4),
        textAlign: 'right'
    },
    goodSpecText: {
        color: '#6a6a6a',
        fontSize: f.Device.getActualSize(8),
        marginBottom: f.Device.getActualSize(4),
        textAlign: 'right'
    },
    priceView: {
        marginBottom: f.Device.getActualSize(4),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    priceViewImage: {
        height: f.Device.getActualSize(11),
        width: f.Device.getActualSize(24),
        marginLeft: f.Device.getActualSize(5)
    },
    priceText: {
        marginLeft: f.Device.getActualSize(10),
        color: 'red',
        fontSize: f.Device.getActualSize(9),
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    inputViewImageButton: {
        width: f.Device.getActualSize(16),
        height: f.Device.getActualSize(16),
    },
    inputViewImage: {
        width: f.Device.getActualSize(16),
        height: f.Device.getActualSize(16),
    },
    input: {
        width: f.Device.getActualSize(30),
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderRadius: f.Device.getActualSize(3),
        textAlign: 'center',
        paddingVertical: f.Device.getActualSize(3),
        marginHorizontal: f.Device.getActualSize(5),
        height: f.Device.getActualSize(16),
        fontSize: f.Device.getActualSize(8),
    },
    activeView: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        marginBottom: f.Device.getActualSize(3),
        paddingBottom: f.Device.getActualSize(3),
    },
    activeTitle: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: f.Device.getActualSize(4),
        paddingVertical: f.Device.getActualSize(3),
        backgroundColor: '#ffffff'
    },
    activeImage: {
        width: f.Device.getActualSize(9),
        height: f.Device.getActualSize(9),
        marginRight: f.Device.getActualSize(5),
    },
    activeTitleLeftText: {
        fontSize: f.Device.getActualSize(8),
        fontWeight: 'bold'
    },
    activeTitleRightText: {
        fontSize: f.Device.getActualSize(8),
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'right'
    },
    activeItemText: {
        fontSize: f.Device.getActualSize(7),
        marginTop: f.Device.getActualSize(3),
        marginHorizontal: f.Device.getActualSize(4),
    },
    stepPriceOneView: {
        backgroundColor: '#ffffff',
        paddingHorizontal: f.Device.getActualSize(4),
        paddingVertical: f.Device.getActualSize(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepPriceOneViewLeftText: {
        fontSize: f.Device.getActualSize(7)
    },
    stepPriceOneViewRightText: {
        fontSize: f.Device.getActualSize(7),
        color: 'red'
    }
});