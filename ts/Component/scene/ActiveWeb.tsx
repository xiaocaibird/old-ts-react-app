import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeSceneComponent } from '../base';
import {
    View,
    WebView
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';

type props = {
    url: string,
    onShouldStartLoadWithRequest?: (p: React.WebViewIOSLoadRequestEvent) => boolean,
    onLoadStart?: (p: React.NavState) => void
};
type state = tCommon.reactState;

export default class ActiveWeb extends baseNativeSceneComponent<props, state> {
    render() {
        const {url, onShouldStartLoadWithRequest, onLoadStart} = this.props;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='活    动' />
                <View style={styles.WebViewContainer}>
                    <WebView source={{ uri: url }} style={styles.WebView} onLoadStart={onLoadStart}
                        bounces={false} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} />
                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create<{
    container: React.ViewStyle,
    WebViewContainer: React.ViewStyle,
    WebView: React.ViewStyle,
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    WebViewContainer: {
        flex: 1
    },
    WebView: {
        flex: 1
    }
});