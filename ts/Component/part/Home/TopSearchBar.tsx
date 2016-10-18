import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
} from '../../common/native';
import { baseNativeComponent } from '../../base';
import SearchGoods from '../../scene/SearchGoods';
import { Factory as f } from '../../../class/Factory';

type props = {
    onCityTextPress: tCommon.anyFun,
    locationInfo: tAppInfo.locationInfo
}
type state = tCommon.reactState;

export class TopSearchBar extends baseNativeComponent<props, state> {
    render() {
        const {locationInfo} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.cityTextContainer} onPress={this.props.onCityTextPress}>
                    <Text style={styles.cityText}>{locationInfo.city_name + locationInfo.district_name}</Text>
                </TouchableOpacity>
                <Image style={styles.Image} source={require('./img/search_icon.png')} />
                <TouchableOpacity style={styles.searchTextContainer} onPress={() => { f.Navigation.push({ component: SearchGoods }) } }>
                    <Text style={styles.searchText}>请输入搜索关键字</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    cityTextContainer: React.ViewStyle,
    cityText: React.TextStyle,
    Image: React.ImageStyle,
    searchTextContainer: React.ViewStyle,
    searchText: React.TextStyle
}>({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        position: 'absolute',
        width: f.Device.getWindowWidth() * 0.9,
        marginLeft: f.Device.getWindowWidth() * 0.05,
        marginTop: 25,
        opacity: 0.8,
        borderRadius: f.Device.getActualSize(3),
        height: f.Device.getActualSize(15),
        zIndex: 100
    },
    cityTextContainer: {
        paddingRight: f.Device.getActualSize(4),
        paddingLeft: f.Device.getActualSize(4),
        borderRightColor: '#999999',
        borderRightWidth: 1,
        height: f.Device.getActualSize(9),
        flexDirection: 'row',
        alignItems: 'center'
    },
    cityText: {
        fontSize: f.Device.getActualSize(6)
    },
    Image: {
        height: f.Device.getActualSize(7.5),
        width: f.Device.getActualSize(7.5),
        marginHorizontal: f.Device.getActualSize(3)
    },
    searchTextContainer: {
        flex: 1,
        height: f.Device.getActualSize(15),
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchText: {
        fontSize: f.Device.getActualSize(6),
        textAlign: 'left'
    }
});