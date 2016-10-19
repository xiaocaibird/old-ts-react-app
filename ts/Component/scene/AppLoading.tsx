import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View, Image
} from '../common/native';
import { baseNativeSceneComponent } from '../base';

type props = tCommon.reactProps;
type state = tCommon.reactState;

export default class AppLoading extends baseNativeSceneComponent<props, state> {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./img/cy.png')} style={styles.Image} />
            </View>
        );
    }
}


const styles = StyleSheet.create<{
    container: React.ViewStyle,
    Image: React.ImageStyle
}>({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    Image: {
        alignSelf: 'center'
    }
});