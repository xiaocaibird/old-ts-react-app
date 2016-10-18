import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    Image,
    Text,
    TouchableOpacity
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';

type props = tCommon.reactProps;
type state = tCommon.reactState;

export class ServicePhone extends baseNativeComponent<props, state> {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => { f.Device.callPhone('4008268365') } }>
                <Image source={require('./img/tel.png')} style={styles.Image} />
                <Text style={styles.Text}>客服电话：4008-268-365</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    Image: React.ImageStyle,
    Text: React.TextStyle
}>({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    Image: {
        height: f.Device.getActualSize(10),
        width: f.Device.getActualSize(10),
        marginRight: f.Device.getActualSize(5)
    },
    Text: {
        fontSize: f.Device.getActualSize(8)
    }
});