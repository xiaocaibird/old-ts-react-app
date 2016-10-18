import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeSceneComponent } from '../base';
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
    list?: tComponent.goodsList,
    searchValue?: string
}

export default class SearchGoods extends baseNativeSceneComponent<props, state> {
    private goodsListPageSize = f.App.AppConfig.listViewPageSize;
    private nowGoodsListRowCount = f.App.AppConfig.listViewPageSize;
    private isGoodsListViewMounted = false;
    private isUpdateGoodsListView = true;

    private searchValue: string;
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    render() {
        const {list, searchValue} = this.state;

        return (
            <View style={styles.container}>
                <CommonPageTitleBar isSearchBar={true} inputValue={searchValue} onInputChangeText={this.onInputChangeText} onSubmitEditing={this.onSubmitEditing} inputPaceholder='请输入搜索关键字' />
                <GoodsListView list={list} onRefresh={this.onRefresh} onEndReached={this.onEndReached} />
            </View >
        )
    }
    private onInputChangeText = (text: string) => {
        this.setState(
            {
                searchValue: text
            }
        );
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
    private onSubmitEditing = () => {
        this.isUpdateGoodsListView = true;
        this.nowGoodsListRowCount = this.goodsListPageSize;
        this.searchValue = this.state.searchValue!;
        return this.getGoodsList();
    }
    private getGoodsList = () => {
        if (!this.searchValue) {
            this.nowGoodsListRowCount = 0;
        }
        return f.AsyncOperation.run(
            () => f.Request.getGoodsList({ psize: this.nowGoodsListRowCount, goods_name: this.searchValue }).then(
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