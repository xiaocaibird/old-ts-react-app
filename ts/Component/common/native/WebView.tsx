import * as React from 'react';
import { WebView as RNWebView, StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import { nComponentHp } from '../../../helper';
type props = {} & React.WebViewProperties;
type state = tCommon.reactState;

export class WebView extends baseNativeComponent<props, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.style, this.props.style],
        });
        return <RNWebView {...defaultProps} {...this.props} {...topProps} />
    }
}
const defaultStyles = StyleSheet.create<{
    style: React.ViewStyle
}>({
    style: {
    }
});
const defaultProps: React.WebViewProperties = {

}

