import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { baseNativeSceneComponent } from '../base';
import {
    View,
    Picker,
    ScrollView,
    Animated
} from '../common/native';
import {
    GoodsTopTypeScrollView,
    ActiveScroll,
    GoodsLeftTypeScrollView,
    TopSearchBar
} from '../part/Home';
import GoodsSales from './GoodsSales';
import { GoodsListView } from '../part/common';
import { Factory as f } from '../../class/Factory';
import { strHp, arrayHp } from '../../helper';

type props = {
    locationInfo: tAppInfo.locationInfo
};
type state = {
    activeList?: tComponent.activeList,
    goodsTopTypeList?: tComponent.goodsTypeList,
    goodsTopTypeSelectId?: string,
    goodsLeftTypeList?: tComponent.goodsTypeList,
    goodsLeftTypeSelectId?: string,
    goodsList?: tComponent.goodsList,
    areaList?: tNativeComponent.Picker.dynamicData,
    activeShow?: boolean,
    heightAnimated?: Animated.Value
};

type position = { x: number, y: number, px: number, py: number };
const activeViewHeight = f.Device.getWindowWidth() * 0.478;

class Home extends baseNativeSceneComponent<props, state> {
    private goodsListPageSize = f.App.AppConfig.listViewPageSize;
    private nowGoodsListRowCount = f.App.AppConfig.listViewPageSize;
    private isGoodsListViewMounted = false;
    private isUpdateGoodsListView = true;
    private lastTouchPosition: position = {
        x: 0, y: 0, px: 0, py: 0
    };
    constructor() {
        super();
        this.state = {
            activeShow: true,
            heightAnimated: new Animated.Value(activeViewHeight)
        }
    }
    private init() {
        f.AsyncOperation.run(
            () => {
                return this.loadAllData();
            }
        );
    }
    private loadAllData() {
        return Promise.all(
            [
                this.getActiveList(),
                this.getGoodsTopTypeList(),
                this.getAreaList()
            ]
        );
    }
    private getActiveList() {
        return f.Request.getActiveList().then(
            (data: tComponent.activeList) => {
                this.setState({
                    activeList: data
                })
            }
        )
    }

    private getGoodsTopTypeList() {
        return f.Request.getGoodsTypeList({ pid: '0' }).then(
            (topTypeList: tComponent.goodsTypeList) => {
                let selectId = '';

                const ms = arrayHp.find(topTypeList, { spell: 'miaosha' });

                if (ms) {
                    selectId = ms.cat_id;
                }
                else {
                    const first = arrayHp.find(topTypeList, (v) => {
                        return !strHp.trim(v.spell)
                    });

                    if (first) {
                        selectId = first.cat_id;
                    }
                }
                return f.Request.getGoodsTypeList({ pid: selectId }).then(
                    (leftTypeList: tComponent.goodsTypeList) => {
                        const cat_id = leftTypeList[0] ? leftTypeList[0].cat_id : '';
                        return f.Request.getGoodsList({ cat_id: cat_id, psize: this.goodsListPageSize }).then(
                            (data: tComponent.goodsList) => {
                                this.isUpdateGoodsListView = true;
                                this.setState({
                                    goodsTopTypeList: topTypeList,
                                    goodsTopTypeSelectId: selectId,
                                    goodsLeftTypeList: leftTypeList,
                                    goodsLeftTypeSelectId: cat_id,
                                    goodsList: data
                                });
                                this.nowGoodsListRowCount = data.length;
                                this.isGoodsListViewMounted = true;
                            }
                        )
                    }
                );

            }
        )
    }
    private getGoodsLeftTypeList(pid: string) {
        return f.Request.getGoodsTypeList({ pid: pid }).then(
            (typeList: tComponent.goodsTypeList) => {
                const cat_id = typeList[0] ? typeList[0].cat_id : '';
                return f.Request.getGoodsList({ cat_id: cat_id, psize: this.goodsListPageSize }).then(
                    (data: tComponent.goodsList) => {
                        this.isUpdateGoodsListView = true;
                        this.setState({
                            goodsTopTypeSelectId: pid,
                            goodsLeftTypeList: typeList,
                            goodsLeftTypeSelectId: cat_id,
                            goodsList: data
                        });
                        this.nowGoodsListRowCount = data.length;
                    }
                )
            }
        )
    }

    private getGoodsList(id: string) {
        return f.Request.getGoodsList({ cat_id: id, psize: this.nowGoodsListRowCount }).then(
            (data: tComponent.goodsList) => {
                this.setState({
                    goodsLeftTypeSelectId: id,
                    goodsList: data
                });
                this.nowGoodsListRowCount = data.length;
            }
        )
    }

    private getAreaList() {
        return f.Request.getAreaList().then(
            (data: tNativeComponent.Picker.dynamicData) => {
                this.setState({
                    areaList: data
                });
            }
        )
    }

    componentDidMount() {
        this.init();
    }
    render() {
        const {locationInfo} = this.props;
        const {activeList = [], goodsTopTypeList = [], goodsTopTypeSelectId = '', goodsLeftTypeList = [], goodsLeftTypeSelectId = '', goodsList = [], areaList = [], heightAnimated} = this.state;
        return (
            <View style={styles.container}>
                <TopSearchBar onCityTextPress={this.showAreaPicker} locationInfo={locationInfo} />
                <Animated.View style={[{ height: heightAnimated }]}>
                    <ScrollView contentContainerStyle={styles.ScrollView} onRefreshCallBack={this.onPageRefresh} refreshWillTitle='下拉刷新页面' needTrim={true}>
                        <ActiveScroll list={activeList} activeCallBack={this.activeCallBack} />
                    </ScrollView>
                </Animated.View>
                <GoodsTopTypeScrollView list={goodsTopTypeList} selectId={goodsTopTypeSelectId} onSelectOne={this.onGoodsTopTypeSelectOne} />
                <View style={styles.mainView}>
                    <GoodsLeftTypeScrollView list={goodsLeftTypeList} selectId={goodsLeftTypeSelectId} onSelectOne={this.onGoodsLeftTypeSelectOne} onRefresh={this.onGoodsLeftTypeRefresh} />
                    <GoodsListView list={goodsList} ref='GoodsListView'
                        onRefresh={this.onGoodsRefresh} onEndReached={this.onGoodsEndReached} onTouchMove={this.GoodsListViewTouchMove} onTouchStart={this.GoodsListViewTouchStart} />
                </View>
                <Picker ref='AreaPicker' isDynamic={true} data={areaList} title='选择地区' defaultSelectValues={[locationInfo.province_id, locationInfo.city_id, locationInfo.district_id]}
                    branchTitles={['省', '市', '区']} okCallBack={this.onAreaPickerOkCallBack} />
            </View>
        );
    }
    private GoodsListViewTouchStart = (event: React.GestureResponderEvent) => {
        this.lastTouchPosition = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
            px: event.nativeEvent.pageX,
            py: event.nativeEvent.pageY
        };
    }
    private GoodsListViewTouchMove = (event: React.GestureResponderEvent) => {
        const nowPosition: position = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
            px: event.nativeEvent.pageX,
            py: event.nativeEvent.pageY
        };
        if (this.state.activeShow) {
            if (nowPosition.py < this.lastTouchPosition.py) {
                this.setState(
                    {
                        activeShow: false
                    }
                );
                Animated.timing(
                    this.state.heightAnimated!,
                    {
                        toValue: 25 + f.Device.getActualSize(15)
                    }
                ).start();
            }
        }
        else {
            if (nowPosition.py > this.lastTouchPosition.py) {
                const offset: number = (this.refs['GoodsListView'] as GoodsListView).ListViewInstance.scrollProperties.offset;
                if (offset < 5) {
                    this.setState(
                        {
                            activeShow: true
                        }
                    );
                    Animated.timing(
                        this.state.heightAnimated!,
                        {
                            toValue: activeViewHeight
                        }
                    ).start();
                }
            }
        }
        this.lastTouchPosition = nowPosition;
    }
    private onGoodsTopTypeSelectOne = (id: string) => {
        if (id == this.state.goodsTopTypeSelectId) return;
        f.AsyncOperation.run(
            () => {
                return this.getGoodsLeftTypeList(id);
            }
        );
    }

    private onGoodsLeftTypeSelectOne = (id: string) => {
        if (id == this.state.goodsLeftTypeSelectId) return;
        this.isUpdateGoodsListView = true;
        this.nowGoodsListRowCount = this.goodsListPageSize;
        f.AsyncOperation.run(
            () => {
                return this.getGoodsList(id);
            }
        );
    }


    private onGoodsLeftTypeRefresh = () => {
        return f.AsyncOperation.run(
            () => {
                return this.getGoodsLeftTypeList(this.state.goodsTopTypeSelectId!);
            }
        );
    }

    private onPageRefresh = () => {
        return f.AsyncOperation.run(
            () => {
                return this.loadAllData();
            }
        );
    }

    private onGoodsRefresh = () => {
        this.nowGoodsListRowCount = this.goodsListPageSize;
        return f.AsyncOperation.run(
            () => {
                return this.getGoodsList(this.state.goodsLeftTypeSelectId!);
            }
        );
    }
    private onGoodsEndReached = () => {
        if (!this.isGoodsListViewMounted) return;

        const nowCount = this.nowGoodsListRowCount;
        this.nowGoodsListRowCount += this.goodsListPageSize;

        return f.AsyncOperation.run(
            () => {
                return this.getGoodsList(this.state.goodsLeftTypeSelectId!).then(
                    () => {
                        if (!this.isUpdateGoodsListView && nowCount == this.nowGoodsListRowCount) {
                            f.Prompt.promptToast('没有更多商品了！');
                        }
                        this.isUpdateGoodsListView = false;
                    }
                );
            }
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

            f.Redux.changeState(f.Redux.action.appLocationChange(
                {
                    locationInfo: {
                        province_id: province.value,
                        province_name: province.lable,
                        city_id: city.value,
                        city_name: city.lable,
                        district_id: district.value,
                        district_name: district.lable
                    }
                }
            ));
            f.AsyncOperation.run(
                () => {
                    return f.Request.changeDis({ district_id: district.value }).then(
                        () => {
                            return this.loadAllData();
                        }
                    )
                }
            );
        }
        catch (e) {

        }
    }

    private activeCallBack = (type: string) => {
        if (type == 'reg') {
            f.Navigation.toLogin();
        }
        else if (type == 'miaosha') {
            f.Navigation.pop();
            const id = '-4';
            if (arrayHp.find(this.state.goodsTopTypeList!, { spell: 'miaosha' })) {
                this.onGoodsTopTypeSelectOne(id);
            }
        }
        else if (type == 'chuxiao') {
            if (arrayHp.find(this.state.goodsTopTypeList!, { spell: 'chuxiao' })) {
                f.Navigation.replace({
                    component: GoodsSales
                });
            }
            else {
                f.Navigation.pop();
            }
        }
    }
}

function select(state: tAppInfo.state) {
    return {
        locationInfo: state.appGlobal.locationInfo
    }
}

export default connect(select)(Home);

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    mainView: React.ViewStyle,
    ScrollView: React.ViewStyle
}>({
    container: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative'
    },
    ScrollView: {
        height: activeViewHeight
    },
    mainView: {
        flex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1'
    }
});
