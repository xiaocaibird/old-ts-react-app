import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserHasLoggedScene } from '../base';
import {
    View,
    TextInput,
    Text,
    ScrollView,
    Picker,
    Button
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import { Factory as f } from '../../class/Factory';
import { arrayHp } from '../../helper';

type props = tCommon.reactProps;
type state = {
    phone?: string,
    people?: string,
    shop?: string,
    area?: string,
    address?: string,
    code?: string,
    areaList?: tNativeComponent.Picker.dynamicData
}

export default class UserInfo extends baseUserHasLoggedScene<props, state> {
    private areaSelectValues: string[] = [];
    private areaSelectLabel: string[] = [];

    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {
        f.AsyncOperation.run(
            () => {
                return Promise.all(
                    [
                        f.Request.getAreaList(),
                        f.Request.getUserInfo()
                    ]
                ).then(
                    (data: [tNativeComponent.Picker.dynamicData, tAppInfo.nowUser]) => {
                        this.areaSelectValues = [data[1]!.province_id, data[1]!.city_id, data[1]!.district_id];
                        this.areaSelectLabel = [data[1]!.province_name, data[1]!.city_name, data[1]!.district_name];
                        this.setState(
                            {
                                areaList: data[0],
                                phone: data[1]!.consignee_mobile,
                                people: data[1]!.consignee_name,
                                shop: data[1]!.shop_name,
                                area: data[1]!.province_name + data[1]!.city_name + data[1]!.district_name,
                                address: data[1]!.address,
                                code: data[1]!.invitation_code,
                            }
                        )

                    }
                    );
            }
        );
    }

    render() {
        const {phone = '', people = '', shop = '', area = '点击选择', address = '', code = '', areaList = []} = this.state;
        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='个人信息' />
                <ScrollView contentContainerStyle={styles.ScrollView} ref='ScrollView' bounces={false} needTrimWhenKeyboardShow={true}>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>收货人:</Text>
                        <TextInput placeholder='收货人' style={styles.formInput} value={people}
                            onChangeText={(t) => { this.onChange({ people: t }) } } setNowFocusNode={this.setNowFocusNode} />
                    </View>
                    <View style={styles.formOne}>
                        <Text style={styles.formTitle}>手机号:</Text>
                        <TextInput placeholder='手机号' style={styles.formInput} value={phone}
                            onChangeText={(t) => { this.onChange({ phone: t }) } } setNowFocusNode={this.setNowFocusNode} />
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
                    <Button text='保    存' style={styles.saveButton} textStyle={styles.buttonText} onPress={this.updateInfo} />
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
    private updateInfo = () => {
        f.AsyncOperation.run(
            () => {
                return f.Request.updateUserInfo({
                    consignee_mobile: this.state.phone!,
                    consignee_name: this.state.people!,
                    shop_name: this.state.shop!,
                    address: this.state.address!,
                    invitation_code: this.state.code!,
                    district_id: this.areaSelectValues[2]
                }).then(
                    () => {
                        const newUserInfo: any = {
                            consignee_mobile: this.state.phone!,
                            consignee_name: this.state.people!,
                            shop_name: this.state.shop!,
                            invitation_code: this.state.code!,
                            province_id: this.areaSelectValues[0],
                            province_name: this.areaSelectLabel[0],
                            city_id: this.areaSelectValues[1],
                            city_name: this.areaSelectLabel[1],
                            district_id: this.areaSelectValues[2],
                            district_name: this.areaSelectLabel[2],
                            address: this.state.address!,
                        };
                        f.Redux.changeState(
                            f.Redux.action.userUpdateInfo(newUserInfo)
                        );
                        return f.Request.changeDis({ district_id: this.areaSelectValues[2] });
                    }
                    )
            },
            () => {
                f.Prompt.promptToast('保存成功');
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
            this.areaSelectLabel = [province.lable, city.lable, district.lable]
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
    formText: {
        flex: 1,
        fontSize: f.Device.getActualSize(7),
        textAlign: 'left'
    },
    buttonText: {
        color: '#ffffff'
    }
});