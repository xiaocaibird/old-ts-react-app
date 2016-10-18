import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseUserHasLoggedScene } from '../base';
import {
    View,
} from '../common/native';
import {
    CommonPageTitleBar,
    GoodsListView
} from '../part/common';
import { Factory as f } from '../../class/Factory';

type props = tCommon.reactProps;
type state = {
    list?: tComponent.goodsList
}

export default class UserCollection extends baseUserHasLoggedScene<props, state> {
    private goodsListPageSize = f.App.AppConfig.listViewPageSize;
    private nowGoodsListRowCount = f.App.AppConfig.listViewPageSize;
    private isGoodsListViewMounted = false;
    private isUpdateGoodsListView = true;
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.getGoodsList();
    }
    render() {
        const {list} = this.state;

        return (
            <View style={styles.container}>
                <CommonPageTitleBar titie='我的收藏' />
                <GoodsListView list={list} onRefresh={this.onRefresh} onEndReached={this.onEndReached} />
            </View >
        )
    }
    private onEndReached = () => {
        if (!this.isGoodsListViewMounted) return;

        const nowCount = this.nowGoodsListRowCount;
        this.nowGoodsListRowCount += this.goodsListPageSize;

        return this.getGoodsList().then(
            () => {
                if (!this.isUpdateGoodsListView && nowCount == this.nowGoodsListRowCount) {
                    f.Prompt.promptToast('没有更多商品了！');
                }
                this.isUpdateGoodsListView = false;
            }
        );
    }

    private onRefresh = () => {
        this.nowGoodsListRowCount = this.goodsListPageSize;
        return this.getGoodsList()
    }
    private getGoodsList = () => {
        return f.AsyncOperation.run(
            () => f.Request.getUserCollectionGoodsList({ psize: this.nowGoodsListRowCount }).then(
                (data: tComponent.goodsList) => {
                    this.setState({
                        list: data
                    });
                    this.nowGoodsListRowCount = data.length;
                    this.isGoodsListViewMounted = true;
                }
            )
        )
    }
}


const styles = StyleSheet.create<{
    container: React.ViewStyle,
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
});