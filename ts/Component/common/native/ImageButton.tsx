import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    Image,
    TouchableOpacity
} from './';
import { nComponentHp } from '../../../helper';

type props = React.ImageProperties & {
    style?: React.ViewStyle,
    imageStyle?: React.ImageStyle,
    onPress?: tCommon.anyFun
}
type state = tCommon.reactState;

export class ImageButton extends baseNativeComponent<props, state> {
    render() {
        const { style, imageStyle, onPress} = this.props;
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [styles.imageStyle, imageStyle],
            onPress: undefined,
            imageStyle: undefined
        });
        return (
            <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
                <Image {...this.props} {...topProps} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    imageStyle: React.ImageStyle
}>({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    imageStyle: {
        flex: 1
    }
});