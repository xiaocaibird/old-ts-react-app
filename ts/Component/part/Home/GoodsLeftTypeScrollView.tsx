import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from '../../common/native';
import { baseNativeComponent } from '../../base';
import { Factory as f } from '../../../class/Factory';

type props = {
    list: tComponent.goodsTypeList,
    selectId: string,
    onSelectOne: tCommon.anyFun,
    onRefresh: tCommon.anyPromiseFun
};
type state = tCommon.reactState;


export class GoodsLeftTypeScrollView extends baseNativeComponent<props, state> {
    render() {
        const {list, selectId, onSelectOne, onRefresh} = this.props;

        return <View style={styles.container}>
            <ScrollView onRefreshCallBack={onRefresh} needTrim={true}>
                {list.map(function (v, i) {
                    const oneTypeStyle = (!selectId && i == 0) || selectId == v.cat_id ? [styles.oneTypeView, styles.oneTypeViewActive] : styles.oneTypeView;
                    const textStyle = (!selectId && i == 0) || selectId == v.cat_id ? [styles.Text, styles.textActive] : styles.Text;
                    return (
                        <TouchableOpacity style={oneTypeStyle} key={'leftType' + v.cat_id} onPress={() => { onSelectOne(v.cat_id) } }>
                            <Text style={textStyle}>{v.cat_name}</Text>
                        </TouchableOpacity>)
                })
                }
            </ScrollView>
        </View>
    }

}

const width = f.Device.getActualSize(45);
const windowWidth = f.Device.getWindowWidth();
const _wdith = width > windowWidth * 0.25 ? windowWidth * 0.25 : width;

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    oneTypeView: React.ViewStyle,
    oneTypeViewActive: React.ViewStyle,
    Text: React.TextStyle,
    textActive: React.TextStyle
}>({
    container: {
        width: _wdith,
        backgroundColor: '#f3f6f5'
    },
    oneTypeView: {
        minHeight: f.Device.getActualSize(25),
        width: _wdith,
        borderLeftColor: '#f3f6f5',
        borderLeftWidth: f.Device.getActualSize(2),
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f3f6f5',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1
    },
    oneTypeViewActive: {
        borderLeftColor: '#2ecc71',
        backgroundColor: '#FFFFFF'
    },
    Text: {
        fontSize: f.Device.getActualSize(7),
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        paddingHorizontal: f.Device.getActualSize(4),
        paddingVertical: f.Device.getActualSize(4)
    },
    textActive: {
        color: '#2ecc71'
    }
});