import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    MaskLayer,
    Animated,
    Image,
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';

type props = {
    imagePath: string,
    show: boolean
};
type state = {
    opacityAnimated?: Animated.Value
}

export class ClearLargePicture extends baseNativeComponent<props, state> {
    constructor() {
        super();
        this.state = {
            opacityAnimated: new Animated.Value(0)
        }
    }
    componentDidUpdate() {
        if (this.props.show) {
            Animated.timing(
                this.state.opacityAnimated!,
                {
                    toValue: 1
                }
            ).start();
        }
    }
    hidePicture() {
        Animated.timing(
            this.state.opacityAnimated!,
            {
                toValue: 0
            }
        ).start(() => {
            f.Redux.changeState(
                f.Redux.action.appClearLargePictureShow({ show: false })
            )
        });
    }
    render() {
        const {imagePath, show} = this.props;
        const {opacityAnimated} = this.state;
        const hide = show ? null : styles.hide;

        return (
            <Animated.View style={[styles.container, hide, { opacity: opacityAnimated }]} >
                <MaskLayer onPress={this.onMaskLayerPress} />
                {imagePath ? <Image source={{ uri: imagePath }} style={styles.image} /> : null}
            </Animated.View>
        )
    }
    private onMaskLayerPress = () => {
        this.hidePicture();
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    hide: React.ViewStyle,
    image: React.ImageStyle
}>({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 115,
    },
    hide: {
        zIndex: -10000
    },
    image: {
        width: f.Device.getWindowWidth() * 0.85,
        height: f.Device.getWindowWidth() * 0.85
    }
});