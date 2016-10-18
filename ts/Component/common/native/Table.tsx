import * as React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from './';
import { baseNativeComponent } from '../../base';
import { nComponentHp } from '../../../helper';
import { NativeFactory as f } from '../../../class/Factory';

type viewProps = {} & React.ViewProperties;
type textProps = {} & React.TextProperties;
type state = tCommon.reactState;

class Tr extends baseNativeComponent<viewProps, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.Tr, this.props.style],
        });
        return <View {...trDefaultProps} {...this.props} {...topProps} />
    }
}

class Th extends baseNativeComponent<viewProps, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.Th, this.props.style],
        });
        return <View {...thDefaultProps} {...this.props} {...topProps} />
    }
}
class ThText extends baseNativeComponent<textProps, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.ThText, this.props.style],
        });
        return <Text {...thTextDefaultProps} {...this.props} {...topProps} />
    }
}

class Td extends baseNativeComponent<viewProps, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.Td, this.props.style],
        });
        return <View {...tdDefaultProps} {...this.props} {...topProps} />
    }
}
class TdText extends baseNativeComponent<textProps, state>  {
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.TdText, this.props.style],
        });
        return <Text {...tdTextDefaultProps} {...this.props} {...topProps} />
    }
}

export class Table extends baseNativeComponent<viewProps, state>  {
    static Tr = Tr;
    static Th = Th;
    static ThText = ThText;
    static Td = Td;
    static TdText = TdText;
    render() {
        const topProps = nComponentHp.createInfrastructureComponentTopProps({
            style: [defaultStyles.Table, this.props.style],
        });
        return <View {...tableDefaultProps} {...this.props} {...topProps} />
    }
}

const defaultStyles = StyleSheet.create<{
    Table: React.ViewStyle,
    Tr: React.ViewStyle,
    Th: React.ViewStyle,
    ThText: React.TextStyle,
    Td: React.ViewStyle,
    TdText: React.TextStyle,
}>({
    Table: {
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 0
    },
    Tr: {
        flexDirection: 'row',
        alignItems: 'stretch',
        padding: 0,
        margin: 0,
    },
    Th: {
        flex: 1,
        margin: 0,
        padding: f.Device.getActualSize(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    ThText: {
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        fontWeight: 'bold',
        margin: f.Device.getActualSize(3),
        alignSelf: 'center',
        textAlign: 'center'
    },
    Td: {
        flex: 1,
        margin: 0,
        padding: f.Device.getActualSize(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    TdText: {
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        margin: f.Device.getActualSize(3),
        alignSelf: 'center',
        textAlign: 'center'
    }
});

const tableDefaultProps: React.ViewProperties = {

}

const trDefaultProps: React.ViewProperties = {

}

const thDefaultProps: React.ViewProperties = {

}
const thTextDefaultProps: React.TextProperties = {

}
const tdDefaultProps: React.ViewProperties = {

}

const tdTextDefaultProps: React.TextProperties = {

}

