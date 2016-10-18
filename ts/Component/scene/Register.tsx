import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserScene } from '../base';
import {
    View,
    TextInput,
    PasswordInput,
    Text,
    ScrollView,
    Picker,
    Button
} from '../common/native';
import {
    CommonPageTitleBar,
    ServicePhone
} from '../part/common';
import { Factory as f } from '../../class/Factory';
import { arrayHp } from '../../helper';

type props = tCommon.reactProps;
type state = {
    userName?: string,
    password?: string,
    people?: string,
    shop?: string,
    area?: string,
    address?: string,
    code?: string,
    areaList?: tNativeComponent.Picker.dynamicData
}

export default class Register extends baseUserScene<props, state> {
    private areaSelectValues: string[] = [];
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        f.AsyncOperation.run(
            () => {
                return f.Request.getAreaList().then(
                    (data: tNativeComponent.Picker.dynamicData) => {
                        this.setState({
                            areaList: data
                        });
                    }
                )
            }
        );
    }

    render() {
        const {userName = '', password = '', people = '', shop = '', area = '点击选择', address = '', code = '', areaList = []} = this.state;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='注    册' />
                <ScrollView contentContainerStyle={styles.ScrollView} ref='ScrollView' bounces={false} needTrimWhenKeyboardShow={true}>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>手机号:</Text>
                        <TextInput placeholder='手机号' style={styles.formInput} value={userName}
                            onChangeText={(t) => { this.onChange({ userName: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>密码:</Text>
                        <PasswordInput placeholder='密码' style={styles.formInput} value={password} secureTextEntry={false}
                            onChangeText={(t) => { this.onChange({ password: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>收货人:</Text>
                        <TextInput placeholder='收货人' style={styles.formInput} value={people}
                            onChangeText={(t) => { this.onChange({ people: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>店铺名称:</Text>
                        <TextInput placeholder='店铺名称' style={styles.formInput} value={shop}
                            onChangeText={(t) => { this.onChange({ shop: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>所在地区:</Text>
                        <Text style={styles.formText} onPress={this.showAreaPicker}>{area}</Text>
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>详细地址:</Text>
                        <TextInput placeholder='详细地址' style={styles.formInput} value={address} maxLength={100}
                            onChangeText={(t) => { this.onChange({ address: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>邀请码:</Text>
                        <TextInput placeholder='邀请码' style={styles.formInput} value={code}
                            onChangeText={(t) => { this.onChange({ code: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <Button text='注    册' style={styles.registerButton} textStyle={styles.buttonText} onPress={this.onRegister} />
                    <ServicePhone />
                </ScrollView>
                <Picker ref='AreaPicker' isDynamic={true} defaultSelectValues={this.areaSelectValues}
                    data={areaList} title='选择地区' branchTitles={['省', '市', '区']}
                    okCallBack={this.onAreaPickerOkCallBack} />
            </View>
        )
    }
    private setNowFocusNode = (node: any) => {
        (this.refs['ScrollView'] as ScrollView).setNowFocusNode(node);
    }
    private onRegister = () => {
        f.AsyncOperation.run(
            () => {
                return f.Request.userRegister({
                    username: this.state.userName!,
                    password: this.state.password!,
                    consignee_name: this.state.people!,
                    shop_name: this.state.shop!,
                    address: this.state.address!,
                    invitation_code: this.state.code!,
                    district_id: this.areaSelectValues[2]
                })
            },
            () => {
                f.Prompt.promptToast('注册成功！');
                f.Navigation.toLogin(true);
            }
        )
    }

    private onChange = (state: state) => {
        this.setState(
            state
        );
    }

    private showAreaPicker = () => {
        (this.refs['AreaPicker'] as Picker).showPicker(true);
    }

    private onAreaPickerOkCallBack = (values: string[]) => {
        const {areaList = []} = this.state;
        try {
            const province = arrayHp.find(areaList, { value: values[0] }) || {};
            const city = arrayHp.find(province.children || [], { value: values[1] }) || {};
            const district = arrayHp.find(city.children || [], { value: values[2] }) || {};
            this.setState(
                {
                    area: province.lable + city.lable + district.lable
                }
            );
            this.areaSelectValues = [province.value, city.value, district.value];
        }
        catch (e) {

        }
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ScrollView: React.ViewStyle,
    formOne: React.ViewStyle,
    formTitle: React.TextStyle,
    formInput: React.TextStyle,
    formText: React.TextStyle,
    registerButton: React.ViewStyle,
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
    registerButton: {
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
    formText: {
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        textAlign: 'left'
    },
    buttonText: {
        color: '#ffffff'
    }
});