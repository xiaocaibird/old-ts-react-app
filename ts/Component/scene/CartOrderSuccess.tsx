import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseCartScene } from '../base';
import {
    View,
    Text,
    Button,
    Image,
    ScrollView
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import OrderList from './OrderList';
import { Factory as f } from '../../class/Factory';

type props = {
    orderNo: string
};
type state = tCommon.reactState;

export default class CartOrderSuccess extends baseCartScene<props, state> {
    render() {
        const {orderNo} = this.props;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='提交订单' havePopLink={false} />
                <ScrollView bounces={false} contentContainerStyle={styles.ScrollView}>
                    <Image style={styles.image} source={require('./img/success.png')} />
                    <Text style={styles.Text1}>提交订单成功！</Text>
                    <Text style={styles.Text2}>订单号:{orderNo}</Text>
                    <Button text='返回首页' style={styles.Button1} textStyle={styles.ButtonText} onPress={() => { f.Navigation.toEntry() } } />
                    <Button text='历史订单' style={styles.Button2} textStyle={styles.ButtonText} onPress={() => { f.Navigation.resetTo({ component: OrderList }) } } />
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    image: React.ImageStyle,
    Text1: React.TextStyle,
    Text2: React.TextStyle
    Button1: React.ViewStyle,
    Button2: React.ViewStyle,
    ButtonText: React.TextStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    ScrollView: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: f.Device.getActualSize(15)
    },
    image: {
        marginTop: f.Device.getActualSize(35),
        height: f.Device.getActualSize(60),
        width: f.Device.getActualSize(60)
    },
    Text1: {
        color: '#2ecc71',
        fontSize: f.Device.getActualSize(12),
        marginTop: f.Device.getActualSize(10),
    },
    Text2: {
        fontSize: f.Device.getActualSize(10),
        marginTop: f.Device.getActualSize(6),
    },
    Button1: {
        borderRadius: f.Device.getActualSize(3),
        borderColor: '#2ecc71',
        borderWidth: 1,
        width: f.Device.getWindowWidth() * 0.8,
        paddingVertical: f.Device.getActualSize(5),
        marginTop: f.Device.getActualSize(15)
    },
    Button2: {
        borderRadius: f.Device.getActualSize(3),
        borderColor: '#2ecc71',
        borderWidth: 1,
        width: f.Device.getWindowWidth() * 0.8,
        paddingVertical: f.Device.getActualSize(5),
        marginTop: f.Device.getActualSize(6),
    },
    ButtonText: {
        fontSize: f.Device.getActualSize(9),
        color: '#2ecc71'
    }
});