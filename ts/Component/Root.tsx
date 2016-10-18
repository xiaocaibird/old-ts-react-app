import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import {
    View,
    StatusBar,
    LoadingSpinner
} from './common/native';
import { baseNativeComponent } from './base';
import { NavBar, ClearLargePicture, AddGoodsInfo } from './part/common';
import MainNavigator from './MainNavigator';

type props = {
    spinnerShow: boolean,
    navBarShow: boolean,
    navBarSelectIndex: number,
    addGoodsInfo: tAppInfo.addGoodsInfo,
    cartGoodsTotal: number,
    clearLargePicture: tAppInfo.clearLargePicture
};
type state = tCommon.reactState;

class Root extends baseNativeComponent<props, state> {
    render() {
        const {spinnerShow, navBarShow, navBarSelectIndex, addGoodsInfo, cartGoodsTotal, clearLargePicture} = this.props;
        return (
            <View style={styles.container} >
                <StatusBar hidden={false} translucent={false} barStyle='light-content' />
                <MainNavigator />
                <NavBar select={navBarSelectIndex} show={navBarShow} cartGoodsTotal={cartGoodsTotal} />
                <LoadingSpinner show={spinnerShow} size='large' />
                <View style={styles.ViewBg} />
                <AddGoodsInfo data={addGoodsInfo.data} show={addGoodsInfo.show} />
                <ClearLargePicture show={clearLargePicture.show} imagePath={clearLargePicture.path} />
            </View>
        )
    }
}

function select(state: tAppInfo.state) {
    return {
        spinnerShow: state.appGlobal.spinnerShow,
        navBarShow: state.appGlobal.navBarShow,
        navBarSelectIndex: state.appGlobal.navBarSelectIndex,
        addGoodsInfo: state.appGlobal.addGoodsInfo,
        cartGoodsTotal: state.appGlobal.cartGoodsTotal,
        clearLargePicture: state.appGlobal.clearLargePicture
    }
}

export default connect(select)(Root);

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ViewBg: React.ViewStyle
}>({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        flex: 1
    },
    ViewBg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -10,
        backgroundColor: '#ffffff'
    }
});


