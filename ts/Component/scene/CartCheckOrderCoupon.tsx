import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseCartScene, baseNativeComponent } from '../base';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import { Factory as f } from '../../class/Factory';

type props = {
    list: tComponent.couponList,
    selectCallBack: tCommon.anyFun,
    selectId: string | undefined
}
type state = {
    list?: tComponent.couponList,
    selectId?: string
}

export default class CartCheckOrderCoupon extends baseCartScene<props, state> {
    constructor(props: props) {
        super();
        if (!props) return;

        this.state = {
            list: props.list,
            selectId: props.selectId
        }
    }
    render() {
        const {selectCallBack} = this.props;
        const {list, selectId} = this.state;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='选择优惠券' haveRightButton={true} buttonText='确定' buttonPressCallBack={() => { selectCallBack(selectId); f.Navigation.pop() } } />
                <ScrollView contentContainerStyle={styles.ListView} style={styles.ListViewContainer} bounces={false} >
                    {
                        list instanceof Array &&
                        list.map(
                            (v) => {
                                return <OneCoupon data={v} key={v.coupon_id} selectId={this.state.selectId} onPress={this.OneCouponPress} />
                            }
                        )
                    }
                </ScrollView>
            </View >
        )
    }
    private OneCouponPress = (id: string) => {
        if (this.state.selectId == id) {
            this.setState(
                {
                    selectId: undefined
                }
            )
        }
        else {
            this.setState(
                {
                    selectId: id
                }
            )
        }
    }

}

type couponProps = {
    data: tComponent.coupon,
    selectId?: string,
    onPress: tCommon.anyFun
}
type couponState = tCommon.reactState;


class OneCoupon extends baseNativeComponent<couponProps, couponState> {
    render() {
        const {data, selectId, onPress} = this.props;
        const manPrice = parseInt(data.order_price);
        const priceText = parseFloat(data.coupons_price).toFixed(2);
        const manPriceText = parseFloat(data.order_price).toFixed(2);
        const select = data.coupon_id == selectId;
        return (
            <TouchableOpacity style={[couponOneStyles.container, select ? couponOneStyles.selectOne : null]} onPress={() => { onPress(data.coupon_id) } } >
                <View style={couponOneStyles.topView}>
                    <Text style={[couponOneStyles.priceText, select ? couponOneStyles.selectOneText : null]}>￥<Text style={couponOneStyles.numberText}>{priceText}</Text>
                    </Text>
                    <View style={couponOneStyles.topRightView}>
                        <Text style={couponOneStyles.manjianText}>
                            {
                                manPrice == 0 ? '直减' + priceText : '满' + manPriceText + '减' + priceText
                            }
                        </Text>
                        <View style={couponOneStyles.lineView}>
                        </View>
                        <Text style={couponOneStyles.dateText}>
                            有效期至:{data.end_use_time}
                        </Text>
                    </View>
                </View>
                <View style={couponOneStyles.bottomView}>
                    <Text style={couponOneStyles.bottomTitle}>
                        适用地区:
                    </Text>
                    <Text style={couponOneStyles.bottomInfo}>
                        {data.limit_area_demo}
                    </Text>
                </View>
                <View style={couponOneStyles.bottomView}>
                    <Text style={couponOneStyles.bottomTitle}>
                        适用商品:
                    </Text>
                    <Text style={couponOneStyles.bottomInfo}>
                        {
                            data.limit_cat_demo
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const couponOneStyles = StyleSheet.create<{
    container: React.ViewStyle,
    topView: React.ViewStyle,
    priceText: React.TextStyle,
    numberText: React.TextStyle,
    topRightView: React.ViewStyle,
    manjianText: React.TextStyle,
    lineView: React.ViewStyle,
    dateText: React.TextStyle,
    bottomView: React.ViewStyle,
    bottomTitle: React.TextStyle,
    bottomInfo: React.TextStyle,
    selectOne: React.ViewStyle,
    selectOneText: React.TextStyle

}>({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        marginHorizontal: f.Device.getActualSize(8),
        paddingHorizontal: f.Device.getActualSize(8),
        paddingTop: f.Device.getActualSize(10),
        paddingBottom: f.Device.getActualSize(4),
        marginTop: f.Device.getActualSize(6),
        alignItems: 'stretch',
        borderTopColor: '#bfbfbf',
        borderTopWidth: f.Device.getActualSize(3),
        borderRadius: f.Device.getActualSize(3)
    },
    selectOne: {
        borderTopColor: '#2ecc71',
    },
    topView: {
        flexDirection: 'row',
        paddingBottom: f.Device.getActualSize(12),
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    priceText: {
        textAlign: 'left',
        fontSize: f.Device.getActualSize(12),
        color: '#bfbfbf'
    },
    selectOneText: {
        color: '#2ecc71'
    },
    numberText: {
        fontSize: f.Device.getActualSize(20)
    },
    topRightView: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    manjianText: {
        fontSize: f.Device.getActualSize(10),
    },
    lineView: {
        height: f.Device.getActualSize(3),
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        marginHorizontal: f.Device.getActualSize(5)
    },
    dateText: {
        fontSize: f.Device.getActualSize(7),
    },
    bottomView: {
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
        paddingVertical: f.Device.getActualSize(3),
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bottomTitle: {
        fontSize: f.Device.getActualSize(8),
        marginHorizontal: f.Device.getActualSize(5),
    },
    bottomInfo: {
        flex: 1,
        fontSize: f.Device.getActualSize(7)
    }
});


const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ListViewContainer: React.ViewStyle
    ListView: React.ViewStyle,
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
        paddingBottom: f.Device.getActualSize(15)
    }
});