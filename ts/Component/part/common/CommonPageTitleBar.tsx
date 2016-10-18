import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Text,
    Button,
    ImageButton,
    TextInput
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';

type props = {
    titie?: string,
    havePopLink?: boolean,
    haveRightButton?: boolean,
    buttonText?: string,
    buttonPressCallBack?: tCommon.anyFun,
    isSearchBar?: boolean,
    inputPaceholder?: string,
    onInputChangeText?: tCommon.anyFun,
    inputValue?: string,
    onSubmitEditing?: tCommon.anyFun,
}
type state = tCommon.reactState;

export class CommonPageTitleBar extends baseNativeComponent<props, state> {
    render() {
        const {
            titie,
            havePopLink = true,
            haveRightButton = false,
            isSearchBar = false,
            buttonText = '按钮',
            buttonPressCallBack,
            onInputChangeText,
            inputValue,
            onSubmitEditing,
            inputPaceholder} = this.props;
        return (
            !isSearchBar ? <View style={styles.container}>
                {havePopLink ?
                    <ImageButton source={require('./img/back.png')}
                        style={styles.backLink} onPress={() => { f.Navigation.pop() } }
                        imageStyle={styles.backLinkImage} />
                    : null}
                {
                    haveRightButton ?
                        <Button text={buttonText} onPress={buttonPressCallBack} style={styles.button} textStyle={styles.buttonText} />
                        : null}
                <Text style={styles.Text}>{titie}</Text>
            </View> :
                <View style={styles.container}>
                    {havePopLink ?
                        <ImageButton source={require('./img/back.png')}
                            style={styles.backLink} onPress={() => { f.Navigation.pop() } }
                            imageStyle={styles.backLinkImage} />
                        : null}
                    <TextInput style={styles.TextInput} placeholder={inputPaceholder} maxLength={30} onChangeText={onInputChangeText} value={inputValue} onSubmitEditing={onSubmitEditing} />
                </View>
        )
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    backLink: React.ViewStyle,
    backLinkImage: React.ImageStyle,
    Text: React.TextStyle,
    button: React.ViewStyle,
    buttonText: React.TextStyle,
    TextInput: React.TextStyle
}>({
    container: {
        paddingTop: f.Device.IsIOS ? 30 : f.Device.getActualSize(6),
        paddingBottom: f.Device.getActualSize(6),
        backgroundColor: '#2ecc71',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        zIndex: 100
    },
    backLink: {
        paddingLeft: f.Device.getActualSize(10),
        paddingRight: f.Device.getActualSize(15),
        position: 'absolute',
        left: 0
    },
    backLinkImage: {
        height: f.Device.getActualSize(12),
        width: f.Device.getActualSize(6)
    },
    Text: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: f.Device.getActualSize(10),
        fontWeight: 'bold'
    },
    button: {
        position: 'absolute',
        right: f.Device.getActualSize(10),
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: f.Device.getActualSize(3),
        paddingHorizontal: f.Device.getActualSize(5),
        paddingVertical: f.Device.getActualSize(3),
    },
    buttonText: {
        fontSize: f.Device.getActualSize(6),
        color: '#ffffff',
        textAlign: 'center'
    },
    TextInput: {
        width: f.Device.getWindowWidth() * 0.7,
        marginLeft: f.Device.getWindowWidth() * 0.1,
        height: f.Device.getActualSize(12),
        fontSize: f.Device.getActualSize(7),
        paddingVertical: f.Device.getActualSize(2),
        textAlign: 'center',
        backgroundColor: '#ffffff'
    }
});