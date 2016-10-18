import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Text
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';

type props = {
    data: tComponent.coupon
}
type state = tCommon.reactState;


export class OneCoupon extends baseNativeComponent<props, state> {
    render() {
        const {data} = this.props;
        const manPrice = parseInt(data.order_price);
        const priceText = parseFloat(data.coupons_price).toFixed(2);
        const manPriceText = parseFloat(data.order_price).toFixed(2);
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <Text style={styles.priceText}>￥<Text style={styles.numberText}>{priceText}</Text>
                    </Text>
                    <View style={styles.topRightView}>
                        <Text style={styles.manjianText}>
                            {
                                manPrice == 0 ? '直减' + priceText : '满' + manPriceText + '减' + priceText
                            }
                        </Text>
                        <View style={styles.lineView}>
                        </View>
                        <Text style={styles.dateText}>
                            有效期至:{data.end_use_time}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomTitle}>
                        适用地区:
                    </Text>
                    <Text style={styles.bottomInfo}>
                        {data.limit_area_demo}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.bottomTitle}>
                        适用商品:
                    </Text>
                    <Text style={styles.bottomInfo}>
                        {
                            data.limit_cat_demo
                        }
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create<{
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
    bottomInfo: React.TextStyle
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
        borderTopColor: '#2ecc71',
        borderTopWidth: f.Device.getActualSize(3),
        borderRadius: f.Device.getActualSize(3)
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
        color: '#2ecc71'
    },
    numberText: {
        fontSize: f.Device.getActualSize(20),
        color: '#2ecc71'
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
