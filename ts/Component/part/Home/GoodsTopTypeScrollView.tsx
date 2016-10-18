import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView
} from '../../common/native';
import { baseNativeComponent } from '../../base';
import GoodsSales from '../../scene/GoodsSales';
import UserRecentBuy from '../../scene/UserRecentBuy';
import UserCollection from '../../scene/UserCollection';
import { Factory as f } from '../../../class/Factory';

type props = {
    list: tComponent.goodsTypeList,
    selectId: string,
    onSelectOne: tCommon.anyFun
};
type state = tCommon.reactState;


export class GoodsTopTypeScrollView extends baseNativeComponent<props, state> {
    render() {
        const {list, selectId} = this.props;
        const onPress = this.onPress;
        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    {list.map(function (v) {
                        const textStyle = selectId == v.cat_id ? [styles.Text, styles.textActive] : styles.Text;
                        return (
                            <TouchableOpacity style={styles.oneTypeView} key={'topType' + v.cat_id} onPress={() => { onPress(v) } }>
                                <Image style={styles.Image} source={{ uri: selectId == v.cat_id ? v.icon_focus_path : v.icon_path }} resizeMode='stretch' />
                                <Text style={textStyle}>{v.cat_name}</Text>
                            </TouchableOpacity>)
                    })
                    }
                </ScrollView>
            </View>
        )
    }
    private onPress = (v: tComponent.goodsTopType) => {
        if (v.spell == 'chuxiao') {
            f.Navigation.push({ component: GoodsSales });
            return;
        }
        if (v.spell == 'goumai') {
            f.Navigation.push({ component: UserRecentBuy });
            return;
        }
        if (v.spell == 'shouchang') {
            f.Navigation.push({ component: UserCollection });
            return;
        }
        this.props.onSelectOne(v.cat_id);
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    oneTypeView: React.ViewStyle,
    Image: React.ImageStyle,
    Text: React.TextStyle,
    textActive: React.TextStyle
}>({
    container: {
        height: f.Device.getActualSize(35),
        width: f.Device.getWindowWidth(),
        backgroundColor: 'white'
    },
    oneTypeView: {
        height: f.Device.getActualSize(35),
        width: f.Device.getActualSize(35),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Image: {
        width: f.Device.getActualSize(15),
        height: f.Device.getActualSize(15),
        marginBottom: f.Device.getActualSize(2)
    },
    Text: {
        fontSize: f.Device.getActualSize(7),
        textAlign: 'center',
        color: 'black'
    },
    textActive: {
        color: '#2ecc71'
    }
});