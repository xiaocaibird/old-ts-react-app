import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from './';
import { baseNativeComponent } from '../../base';
import { nComponentHp } from '../../../helper';

type props = {} & tNativeComponent.TextInput.props;
type state = tCommon.reactState;

export class PasswordInput extends baseNativeComponent<props, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.style, this.props.style],
        });
        return <TextInput {...defaultProps} {...this.props} {...topProps} />
    }
}

const defaultStyles = StyleSheet.create<{
    style: React.TextStyle
}>({
    style: {

    }
});

const defaultProps: React.TextInputProperties = {
    maxLength: 12,
    secureTextEntry: true,
    placeholder: '密    码'
}