import * as React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import { NativeFactory as f } from '../../../class/Factory';
import { nComponentHp } from '../../../helper';

type props = {} & React.TextProperties;
type state = tCommon.reactState;

export class Text extends baseNativeComponent<props, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.style, this.props.style],
        });
        return <RNText {...defaultProps} {...this.props} {...topProps} />
    }
}

const defaultStyles = StyleSheet.create<{
    style: React.TextStyle
}>({
    style: {
        fontSize: f.Device.getActualSize(7),
        backgroundColor: 'transparent'
    }
});

const defaultProps: React.TextProperties = {

}