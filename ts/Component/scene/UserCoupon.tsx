import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserHasLoggedScene } from '../base';
import {
    View,
    ListView,
    Button
} from '../common/native';
import {
    CommonPageTitleBar
} from '../part/common';
import {
    OneCoupon
} from '../part/UserCoupon';
import { Factory as f } from '../../class/Factory';

type props = tCommon.reactProps;
type state = {
    list?: React.ListViewDataSource,
    unusedCount?: number,
    invalidCount?: number,
    usedCount?: number
}

export default class UserCoupon extends baseUserHasLoggedScene<props, state> {
    private goodsListPageSize = f.App.AppConfig.listViewPageSize;
    private nowGoodsListRowCount = f.App.AppConfig.listViewPageSize;
    private isGoodsListViewMounted = false;
    private isUpdateGoodsListView = true;
    private nowCouponType: 'used' | 'unused' | 'invalid' = 'unused';
    constructor() {
        super();
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const dataSource = ds.cloneWithRows([]);
        this.state = {
            list: dataSource,
            unusedCount: 0,
            invalidCount: 0,
            usedCount: 0
        }
    }
    componentDidMount() {
        this.getCouponList();
    }
    render() {
        const {list, unusedCount, invalidCount, usedCount} = this.state;

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='我的优惠券' />
                <View style={styles.ButtonContainer}>
                    <Button text={'未使用(' + unusedCount + ')'} onPress={() => { this.onButtonPress('unused') } }
                        style={styles.Button} textStyle={[styles.ButtonText, this.nowCouponType == 'unused' ? styles.ButtonTextActive : null]} />
                    <Button text={'已过期(' + invalidCount + ')'} onPress={() => { this.onButtonPress('invalid') } }
                        style={styles.Button} textStyle={[styles.ButtonText, this.nowCouponType == 'invalid' ? styles.ButtonTextActive : null]} />
                    <Button text={'已使用(' + usedCount + ')'} onPress={() => { this.onButtonPress('used') } }
                        style={styles.Button} textStyle={[styles.ButtonText, this.nowCouponType == 'used' ? styles.ButtonTextActive : null]} />
                </View>
                <ListView needTrim={true} contentContainerStyle={styles.ListView} style={styles.ListViewContainer}
                    onRefreshCallBack={this.onRefresh} dataSource={list!} renderRow={this.ListViewRenderRow} onEndReached={this.onEndReached} />
            </View >
        )
    }
    private onButtonPress = (type: 'used' | 'unused' | 'invalid') => {
        this.nowCouponType = type;
        this.nowGoodsListRowCount = this.goodsListPageSize;
        this.isUpdateGoodsListView = true;
        this.getCouponList();
    }
    private onEndReached = () => {
        if (!this.isGoodsListViewMounted) return;

        const nowCount = this.nowGoodsListRowCount;
        this.nowGoodsListRowCount += this.goodsListPageSize;

        return this.getCouponList().then(
            () => {
                if (!this.isUpdateGoodsListView && nowCount == this.nowGoodsListRowCount) {
                    f.Prompt.promptToast('没有更多优惠券了！');
                }
                this.isUpdateGoodsListView = false;
            }
        );
    }
    private ListViewRenderRow = (v: tComponent.coupon) => {
        return <OneCoupon data={v} key={v.coupon_id} />
    }
    private onRefresh = () => {
        this.nowGoodsListRowCount = this.goodsListPageSize;
        return this.getCouponList()
    }
    private getCouponList = () => {
        return f.AsyncOperation.run(
            () => f.Request.getCouponList({ psize: this.nowGoodsListRowCount, type: this.nowCouponType }).then(
                (data: any) => {
                    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    const dataSource = ds.cloneWithRows(data.couList);
                    this.setState({
                        unusedCount: data.couponStat.unused,
                        invalidCount: data.couponStat.invalid,
                        usedCount: data.couponStat.used,
                        list: dataSource
                    });
                    this.nowGoodsListRowCount = data.couList.length;
                    this.isGoodsListViewMounted = true;
                }
            )
        )
    }
}


const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ButtonContainer: React.ViewStyle,
    Button: React.ViewStyle,
    ButtonText: React.TextStyle,
    ButtonTextActive: React.TextStyle,
    ListViewContainer: React.ViewStyle
    ListView: React.ViewStyle,
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    ListViewContainer: {
        backgroundColor: '#f0f0f0',
        flex: 1
    },
    ListView: {
        flexDirection: 'column',
        paddingBottom: f.Device.getActualSize(15)
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    Button: {
        flex: 1,
        paddingVertical: f.Device.getActualSize(6)
    },
    ButtonText: {
        fontSize: f.Device.getActualSize(9)
    },
    ButtonTextActive: {
        color: '#2ecc71'
    }
});