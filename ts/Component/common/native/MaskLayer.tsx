import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    TouchableOpacity
} from './';

type props = {
    style?: React.ViewStyle,
    onPress?: tCommon.anyFun
}
type state = tCommon.reactState;

export class MaskLayer extends baseNativeComponent<props, state> {
    render() {
        return (
            <View style={[styles.opacityBg, this.props.style]}>
                {this.props.onPress ? <TouchableOpacity onPress={this.props.onPress} style={styles.opacityBgOnPress}>
                </TouchableOpacity> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create<{
    opacityBg: React.ViewStyle,
    opacityBgOnPress: React.ViewStyle
}>({
    opacityBg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.4
    },
    opacityBgOnPress: {
        flex: 1,
        alignSelf: 'stretch'
    },
});