import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserScene } from '../base';
import {
    View,
    TextInput,
    PasswordInput,
    ScrollView,
    Button
} from '../common/native';
import {
    CommonPageTitleBar,
    ServicePhone,
} from '../part/common';
import UserCenter from './UserCenter';
import Register from './Register';
import { Factory as f } from '../../class/Factory';

type props = tCommon.reactProps;
type state = {
    userName?: string,
    password?: string
}

export default class Login extends baseUserScene<props, state> {
    constructor() {
        super();
        this.state = {
            userName: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='登    录' havePopLink={false} />
                <ScrollView bounces={false} contentContainerStyle={styles.ScrollView}>
                    <TextInput style={[styles.TextInput, styles.inputTopMargin]} maxLength={11} placeholder='用户名' value={this.state.userName} onChangeText={this.onUserNameChange} />
                    <PasswordInput style={styles.TextInput} onSubmitEditing={this.onLogin} value={this.state.password} onChangeText={this.onPasswordChange} />
                    <Button text='登    录' style={styles.buttonLogin} textStyle={styles.buttonText} onPress={this.onLogin} />
                    <Button text='注    册' style={styles.buttonRegister} textStyle={styles.buttonText} onPress={() => { f.Navigation.push({ component: Register }) } } />
                    <ServicePhone />
                </ScrollView>
            </View>
        )
    }

    private onUserNameChange = (text: string) => {
        this.setState(
            {
                userName: text
            }
        );
    }

    private onPasswordChange = (text: string) => {
        this.setState(
            {
                password: text
            }
        );
    }

    private onLogin = () => {
        f.AsyncOperation.run(
            () => {
                return f.Request.userLogin(
                    {
                        username: this.state.userName!,
                        password: this.state.password!
                    }
                ).then(
                    (data: any) => {
                        f.Redux.changeState(
                            f.Redux.action.userLogin(
                                {
                                    nowUser: data.userInfo,
                                    cartGoodsTotal: data.cartGoodsTotal || 0
                                }
                            )
                        );

                        return f.Request.changeDis({ district_id: f.Redux.getState().appGlobal.locationInfo.district_id }).then(
                            () => {
                                f.Navigation.resetTo({ component: UserCenter });
                            }
                        );
                    }
                    );
            }
        );
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    inputTopMargin: React.ViewStyle,
    TextInput: React.TextStyle,
    buttonLogin: React.ViewStyle,
    buttonRegister: React.ViewStyle,
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
    inputTopMargin: {
        marginTop: f.Device.getActualSize(20),
    },
    TextInput: {
        width: f.Device.getWindowWidth() * 0.8,
        height: f.Device.getActualSize(20),
        marginTop: f.Device.getActualSize(10),
        textAlign: 'center',
        borderRadius: f.Device.getActualSize(4),
        borderWidth: 1,
        borderColor: '#e1e1e1'
    },
    buttonLogin: {
        width: f.Device.getWindowWidth() * 0.8,
        height: f.Device.getActualSize(20),
        marginTop: f.Device.getActualSize(15),
        backgroundColor: '#2ecc71'
    },
    buttonRegister: {
        width: f.Device.getWindowWidth() * 0.8,
        height: f.Device.getActualSize(20),
        marginTop: f.Device.getActualSize(10),
        marginBottom: f.Device.getActualSize(20),
        backgroundColor: '#fb6c21'
    },
    buttonText: {
        color: '#ffffff'
    }
});