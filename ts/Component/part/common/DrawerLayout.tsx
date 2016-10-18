import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    MaskLayer,
    Animated
} from '../../common/native';

type props = {
    pressMaskLayerToHide?: boolean
};
type state = {
    show?: boolean,
    topAnimated?: Animated.Value
}

export class DrawerLayout extends baseNativeComponent<props, state> {
    private isDidMount: boolean = false;
    private animatedViewHeight: number = 0;
    constructor() {
        super();
        this.state = {
            topAnimated: new Animated.Value(0)
        }
    }
    showChange() {
        this.showDrawerLayout(!this.state.show);
    }
    showDrawerLayout(show: boolean) {
        if (!this.state.show && show) {
            this.setState(
                {
                    show: true
                }
            );
            Animated.spring(
                this.state.topAnimated!,
                {
                    toValue: 0
                }
            ).start();
        }
        else if (this.state.show && !show) {
            Animated.timing(
                this.state.topAnimated!,
                {
                    toValue: -this.animatedViewHeight
                }
            ).start(() => {
                this.setState(
                    {
                        show: false
                    }
                );
            });
        }
    }
    render() {
        const {show = false, topAnimated} = this.state;
        const hide = show ? null : styles.hide;
        return (
            <View style={[styles.container, hide]} >
                <MaskLayer onPress={this.props.pressMaskLayerToHide ? this.onMaskLayerPress : undefined} />
                <Animated.View style={[styles.mainContainer, { top: topAnimated }]} onLayout={this.animatedViewOnLayout}>
                    {this.props.children}
                </Animated.View>
            </View >
        )
    }
    private onMaskLayerPress = () => {
        this.showDrawerLayout(false);
    }
    private animatedViewOnLayout = (event: React.LayoutChangeEvent) => {
        this.animatedViewHeight = event.nativeEvent.layout.height;
        if (!this.isDidMount) {
            this.state.topAnimated!.setValue(-event.nativeEvent.layout.height);
            this.isDidMount = true;
        }
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    mainContainer: React.ViewStyle,
    hide: React.ViewStyle,
}>({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'stretch',
        zIndex: 10
    },
    mainContainer: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        zIndex: 1,
        left: 0,
        right: 0,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    hide: {
        zIndex: -10000
    }
});