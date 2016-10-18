import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { baseUserHasLoggedScene } from '../base';
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Text
} from '../common/native';
import Login from './Login';
import OrderList from './OrderList';
import UserInfo from './UserInfo';
import UserChangePwd from './UserChangePwd';
import UserCollection from './UserCollection';
import UserCoupon from './UserCoupon';
import { ServicePhone } from '../part/common/';
import { Factory as f } from '../../class/Factory';

type props = {
    nowUser: tAppInfo.nowUser
};
type state = tCommon.reactState;

class UserCenter extends baseUserHasLoggedScene<props, state> {
    render() {
        const {nowUser} = this.props;
        return (
            <View style={styles.container} >
                <ScrollView bounces={false} contentContainerStyle={styles.ScrollView}>
                    <View style={styles.topView}>
                        <Image source={require('./img/cy.png')} style={styles.logoImage} />
                        <Text style={styles.userNameText}>账号：{nowUser && nowUser.username}{
                            nowUser && (nowUser.status == 0 || nowUser.status == '0') ? <Text style={styles.userNameStatusText}>(待审核)</Text> : null}
                        </Text>
                    </View>
                    <View style={styles.servicePhoneView}>
                        <ServicePhone />
                    </View>
                    {
                        operatingListData.map(
                            (v, i) => {
                                return (
                                    <TouchableOpacity style={styles.operatingOne} key={'operating' + i} onPress={() => { v.onPress(v.route) } }>
                                        <Image source={v.img} style={styles.operatingImage} />
                                        <Text style={styles.operatingText}>{v.title}</Text>
                                        <Image source={require('./img/forward.png')} style={styles.forwardImage} />
                                    </TouchableOpacity>)
                            }
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}
const push = (route: React.Route) => {
    f.Navigation.push(route);
}
const resetTo = (route: React.Route) => {
    f.Navigation.resetTo(route);
}
const logout = () => {
    f.AsyncOperation.run(
        () => {
            return f.Request.userLogout()
        }
        ,
        () => {
            f.Redux.changeState(
                f.Redux.action.userLogout()
            );
            f.Navigation.toLogin(true);
        }
    )
}

const operatingListData: {
    title: string,
    img: any,
    route: React.Route,
    onPress: tCommon.anyFun
}[] = [
        {
            title: '我的订单',
            img: require('./img/Order.png'),
            route: { component: OrderList },
            onPress: resetTo
        },
        {
            title: '个人信息',
            img: require('./img/changeinfo.png'),
            route: { component: UserInfo },
            onPress: push
        },
        {
            title: '我的优惠券',
            img: require('./img/myorder.png'),
            route: { component: UserCoupon },
            onPress: push
        },
        {
            title: '我的收藏',
            img: require('./img/Collection.png'),
            route: { component: UserCollection },
            onPress: push
        },
        {
            title: '修改密码',
            img: require('./img/changePwd.png'),
            route: { component: UserChangePwd },
            onPress: push
        },
        {
            title: '注销登录',
            img: require('./img/exit.png'),
            route: { component: Login },
            onPress: logout
        },
    ];


function select(state: tAppInfo.state) {
    return {
        nowUser: state.userInfo.nowUser
    }
}

export default connect(select)(UserCenter);

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    topView: React.ViewStyle,
    logoImage: React.ImageStyle,
    userNameText: React.TextStyle,
    userNameStatusText: React.TextStyle,
    servicePhoneView: React.ViewStyle,
    operatingOne: React.ViewStyle,
    operatingImage: React.ImageStyle,
    operatingText: React.TextStyle,
    forwardImage: React.ImageStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f0f0'
    },
    ScrollView: {
        flexDirection: 'column',
        backgroundColor: '#f0f0f0',
        paddingBottom: f.Device.getActualSize(15)
    },
    topView: {
        flexDirection: 'column',
        paddingVertical: f.Device.getActualSize(15),
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    logoImage: {
        width: f.Device.getActualSize(40),
        height: f.Device.getActualSize(40),
        marginBottom: f.Device.getActualSize(10)
    },
    userNameText: {
        color: '#FFFFFF',
        fontSize: f.Device.getActualSize(8),
        fontWeight: 'bold'
    },
    userNameStatusText: {
        color: '#6a6a6a',
        fontWeight: 'normal'
    },
    servicePhoneView: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: f.Device.getActualSize(12),
        marginVertical: f.Device.getActualSize(6),
        backgroundColor: '#FFFFFF'
    },
    operatingOne: {
        backgroundColor: '#FFFFFF',
        paddingLeft: f.Device.getActualSize(6),
        paddingVertical: f.Device.getActualSize(6),
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    operatingImage: {
        width: f.Device.getActualSize(7),
        height: f.Device.getActualSize(7),
        marginRight: f.Device.getActualSize(4)
    },
    operatingText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: f.Device.getActualSize(8)
    },
    forwardImage: {
        width: f.Device.getActualSize(5),
        height: f.Device.getActualSize(8),
        marginRight: f.Device.getActualSize(5)
    }
});