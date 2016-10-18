import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View
} from '../common/native';
import { baseNativeSceneComponent } from '../base';

type props = tCommon.reactProps;
type state = tCommon.reactState;

export default class AppLoading extends baseNativeSceneComponent<props, state> {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}


const styles = StyleSheet.create<{
    container: React.ViewStyle
}>({
    container: {
        flex: 1
    }
});