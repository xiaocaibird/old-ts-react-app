import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserHasLoggedScene } from '../base';
import {
    View,
    PasswordInput,
    Text,
    ScrollView,
    Button
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import { Factory as f } from '../../class/Factory';

type props = tCommon.reactProps;
type state = {
    password?: string,
    newPasswrod1?: string,
    newPasswrod2?: string,
}

export default class UserChangePwd extends baseUserHasLoggedScene<props, state> {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        const {password, newPasswrod1, newPasswrod2} = this.state;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='修改密码' />
                <ScrollView contentContainerStyle={styles.ScrollView} bounces={false}>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>原密码:</Text>
                        <PasswordInput placeholder='原密码' style={styles.formInput} value={password}
                            onChangeText={(t) => { this.onChange({ password: t }) } } />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>新密码:</Text>
                        <PasswordInput placeholder='新密码' style={styles.formInput} value={newPasswrod1}
                            onChangeText={(t) => { this.onChange({ newPasswrod1: t }) } } />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>确认密码:</Text>
                        <PasswordInput placeholder='确认密码' style={styles.formInput} value={newPasswrod2}
                            onChangeText={(t) => { this.onChange({ newPasswrod2: t }) } } />
                    </View>
                    <Button text='修    改' style={styles.saveButton} textStyle={styles.buttonText} onPress={this.updateInfo} />
                </ScrollView>
            </View>
        )
    }
    private updateInfo = () => {
        if (this.state.newPasswrod1 != this.state.newPasswrod2) {
            f.Prompt.failPopUp('两次输入的新密码不一致！', '修改密码失败');
            return;
        }
        f.AsyncOperation.run(
            () => {
                return f.Request.changePwd(
                    {
                        oldpwd: this.state.password!,
                        newpwd: this.state.newPasswrod1!
                    }
                );
            },
            () => {
                f.Prompt.promptToast('修改密码成功！');
            }
        )
    }

    private onChange = (state: state) => {
        this.setState(
            state
        );
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    formOne: React.ViewStyle,
    formTitle: React.TextStyle,
    formInput: React.TextStyle,
    saveButton: React.ViewStyle,
    buttonText: React.TextStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    ScrollView: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    saveButton: {
        width: f.Device.getWindowWidth() * 0.8,
        height: f.Device.getActualSize(20),
        marginTop: f.Device.getActualSize(15),
        marginBottom: f.Device.getActualSize(15),
        backgroundColor: '#2ecc71'
    },
    formOne: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        paddingLeft: f.Device.getActualSize(8),
        paddingVertical: f.Device.getActualSize(6),
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        alignItems: 'center'
    },
    formTitle: {
        width: f.Device.getActualSize(45),
        fontSize: f.Device.getActualSize(8),
        textAlign: 'left'
    },
    formInput: {
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        textAlign: 'left',
        height: f.Device.getActualSize(10)
    },
    buttonText: {
        color: '#ffffff'
    }
});