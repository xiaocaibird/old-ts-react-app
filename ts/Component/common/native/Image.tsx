import * as React from 'react';
import { Image as RNImage, StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import { nComponentHp } from '../../../helper';
type props = {} & React.ImageProperties;
type state = tCommon.reactState;

export class Image extends baseNativeComponent<props, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.style, this.props.style],
        });
        return <RNImage {...defaultProps} {...this.props} {...topProps} />
    }
}
const defaultStyles = StyleSheet.create<{
    style: React.ImageStyle
}>({
    style: {
    }
});
const defaultProps: React.ImageProperties = {
    source: { uri: '' },
    resizeMode: 'stretch'
}

