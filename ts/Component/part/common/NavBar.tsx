import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';
import Home from '../../scene/Home';
import OrderList from '../../scene/OrderList';
import UserCenter from '../../scene/UserCenter';
import Cart from '../../scene/Cart';

type props = {
    select: number,
    show: boolean,
    cartGoodsTotal: number
}
type state = tCommon.reactState;

export class NavBar extends baseNativeComponent<props, state> {
    constructor() {
        super();
        this.onPress = this.onPress.bind(this);
    }
    private onPress(route: React.Route) {
        f.Navigation.resetTo(route);
    }
    render() {
        const {select, show, cartGoodsTotal} = this.props;
        return (
            <View style={styles.container} >
                {show ?
                    navItems.map((v, i) => {
                        const src = i == select ? v.src2 : v.src1;
                        const textStyle = i == select ? [styles.tabText, styles.tabTextActive] : styles.tabText;
                        return (
                            <TouchableOpacity key={'nv' + i} style={styles.tabContainer} onPress={() => { this.onPress(v.route) } }>
                                <Image style={styles.tabImg} source={src} resizeMode='stretch' />
                                <Text style={textStyle}>{v.text}</Text>
                                {
                                    i == 1 && cartGoodsTotal > 0 ?
                                        <View style={styles.cartCountView}>
                                            <Text style={styles.cartCount}>{cartGoodsTotal <= 99 ? cartGoodsTotal : 99}</Text>
                                        </View> : null
                                }
                            </TouchableOpacity>
                        )
                    })
                    : null}
            </View>)
    }
}
const navItems = [
    {
        text: '首页',
        src1: require('./img/home.png'),
        src2: require('./img/home2.png'),
        route: {
            component: Home
        }
    },
    {
        text: '购物车',
        src1: require('./img/shop.png'),
        src2: require('./img/shop2.png'),
        route: {
            component: Cart
        }
    },
    {
        text: '订单',
        src1: require('./img/order.png'),
        src2: require('./img/order2.png'),
        route: { component: OrderList }
    },
    {
        text: '我的',
        src1: require('./img/person.png'),
        src2: require('./img/person2.png'),
        route: {
            component: UserCenter
        }
    }
];

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    tabContainer: React.ViewStyle,
    tabImg: React.ImageStyle,
    tabText: React.TextStyle,
    tabTextActive: React.TextStyle,
    cartCountView: React.ViewStyle,
    cartCount: React.TextStyle
}
    >({
        container: {
            minHeight: f.Device.getActualSize(0),
            borderTopWidth: 1,
            borderTopColor: '#e1e1e1',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ffffff'
        },
        tabContainer: {
            flex: 1,
            minHeight: f.Device.getActualSize(0),
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        },
        tabImg: {
            width: f.Device.getActualSize(12),
            height: f.Device.getActualSize(12),
            marginBottom: f.Device.getActualSize(1.5),
            marginTop: f.Device.getActualSize(3)
        },
        tabText: {
            textAlign: 'center',
            color: 'black',
            fontSize: f.Device.getActualSize(6),
            marginBottom: f.Device.getActualSize(3)
        },
        tabTextActive: {
            color: '#2ecc71'
        },
        cartCountView: {
            position: 'absolute',
            width: f.Device.getActualSize(9),
            height: f.Device.getActualSize(9),
            borderRadius: f.Device.getActualSize(4.5),
            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            top: f.Device.getActualSize(2),
            left: f.Device.getWindowWidth() * 0.125 + f.Device.getActualSize(3)
        },
        cartCount: {
            flex: 1,
            color: '#ffffff',
            textAlign: 'center',
            fontSize: f.Device.getActualSize(7)
        }
    });