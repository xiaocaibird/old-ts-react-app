import * as React from 'react';
import { StyleSheet } from 'react-native';
import { baseNativeComponent } from '../../base';
import {
    View,
    Image,
    ImageButton,
    Text,
    ListView
} from '../../common/native';
import { Factory as f } from '../../../class/Factory';
import { objHp } from '../../../helper';

type props = {
    list?: tComponent.goodsList,
    onRefresh: tCommon.anyPromiseFun,
    onEndReached: tCommon.anyFun,
    onTouchMove?: (event: React.GestureResponderEvent) => void,
    onTouchStart?: (event: React.GestureResponderEvent) => void,
};
type state = {
    dataSource?: React.ListViewDataSource
}

export class GoodsListView extends baseNativeComponent<props, state> {
    get ListViewInstance() {
        return (this.refs['ListView'] as ListView).instance;
    }
    constructor(props: props) {
        super();
        this.state = {
            dataSource: this.getDataSource(props.list)
        }
    }
    componentWillReceiveProps(nextProps: props) {
        if (objHp.isEqual(nextProps, this.props)) {
            return;
        }
        this.setState({
            dataSource: this.getDataSource(nextProps.list)
        })
    }
    getDataSource(list?: tComponent.goodsList) {
        if (!(list instanceof Array)) {
            list = [];
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(list);
    }
    render() {
        const {onRefresh, onEndReached, onTouchMove, onTouchStart} = this.props;
        const {dataSource} = this.state;

        return <View style={styles.container}>
            <ListView needTrim={true} ref='ListView' style={styles.ListViewContainer} contentContainerStyle={styles.ListView} onTouchMove={onTouchMove} onTouchStart={onTouchStart}
                onRefreshCallBack={onRefresh} dataSource={dataSource!} renderRow={this.ListViewRenderRow} onEndReached={onEndReached} />
        </View>
    }
    private ListViewRenderRow = (v: tComponent.goods) => {
        return <OneGoods data={v} key={'goods' + v.goods_id} />
    }
}

type oneGoodsProps = {
    data: tComponent.goods
};
type oneGoodsState = {
    data: tComponent.goods
}


class OneGoods extends baseNativeComponent<oneGoodsProps, oneGoodsState> {
    constructor(props: oneGoodsProps) {
        super();
        this.state = {
            data: props.data
        }
    }
    componentWillReceiveProps(nextProps: oneGoodsProps) {
        this.setState(
            {
                data: nextProps.data
            }
        )
    }
    render() {
        const {data} = this.state;
        const collectionImg = data.user_collect == 1 || data.user_collect == '1' ? require('./img/Collection_red.png') : require('./img/Collection.png');
        return (
            <View style={oneGoodsStyles.oneGoodsView}>
                <ImageButton style={oneGoodsStyles.goodsImg} imageStyle={oneGoodsStyles.goodsImg} source={{ uri: data.goods_img }} resizeMode='stretch' onPress={this.showClearLargePicture} />
                <View style={oneGoodsStyles.mainInfoView}>
                    <Text style={oneGoodsStyles.titleText}>{data.goods_name}</Text>
                    <Text style={oneGoodsStyles.desText}>{data.goods_spec}</Text>
                    {data.is_sales == 1 || data.is_sales == '1' ? <Image source={require('./img/cuxiao.png')} resizeMode='stretch' style={oneGoodsStyles.cuxiaoImg} /> : null}
                    <Text style={oneGoodsStyles.priceText}>￥<Text style={oneGoodsStyles.priceTextBig}>{data.min_price}</Text>元/{data.goods_unit}</Text>
                </View>
                <View style={oneGoodsStyles.rightButtonView}>
                    <ImageButton source={collectionImg} style={oneGoodsStyles.collectionContainer} imageStyle={oneGoodsStyles.collectionImg} onPress={this.onCollectionPress} />
                    <ImageButton source={require('./img/buy_red.png')} style={oneGoodsStyles.buyContainer} imageStyle={oneGoodsStyles.buyImg} onPress={this.onAddGoodsPress} />
                </View>
            </View>
        )
    }
    private showClearLargePicture = () => {
        const {data} = this.state;
        f.Redux.changeState(
            f.Redux.action.appClearLargePictureShow(
                {
                    show: true,
                    path: data.goods_img
                }
            )
        );
    }
    private onAddGoodsPress = () => {
        if (!f.User.isLogin()) {
            f.Prompt.confirmPopUp(
                '抱歉，需要登录后才能购买商品。', '请先登录', () => { f.Navigation.toLogin() }
            );
            return;
        }
        f.AsyncOperation.run(
            () => f.Request.getGoodsInfo({ goods_id: this.state.data.goods_id }).then(
                (data: any) => {
                    f.Redux.changeState(
                        f.Redux.action.goodsShowInfo({
                            show: true,
                            data: data
                        })
                    );
                }
            )
        );
    }

    private onCollectionPress = () => {
        if (!f.User.isLogin()) {
            f.Prompt.confirmPopUp(
                '抱歉，需要登录后才能收藏商品。', '请先登录', () => { f.Navigation.toLogin() }
            );
            return;
        }
        const {data} = this.state;
        f.AsyncOperation.run(
            () => {
                return f.Request.goodsCollect({
                    goods_id: data.goods_id,
                    operate: data.user_collect == 1 || data.user_collect == '1' ? 'cancel' : 'collect'
                }).then(
                    () => {
                        this.setState({
                            data: objHp.assign({}, data, { user_collect: data.user_collect == 1 || data.user_collect == '1' ? 0 : 1 })
                        });
                    }
                    )
            },
        );
    }
}

const styles = StyleSheet.create<{
    container: React.ViewStyle,
    ListViewContainer: React.ViewStyle
    ListView: React.ViewStyle,
}>({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        paddingHorizontal: f.Device.getActualSize(4)
    },
    ListViewContainer: {
        flex: 1
    },
    ListView: {
        flexDirection: 'column',
        paddingBottom: f.Device.getActualSize(15)
    }
});

const oneGoodsStyles = StyleSheet.create<{
    oneGoodsView: React.ViewStyle,
    goodsImg: React.ImageStyle,
    mainInfoView: React.ViewStyle,
    titleText: React.TextStyle,
    desText: React.TextStyle,
    priceText: React.TextStyle,
    priceTextBig: React.TextStyle,
    rightButtonView: React.ViewStyle,
    cuxiaoImg: React.ImageStyle,
    collectionContainer: React.ViewStyle,
    collectionImg: React.ImageStyle,
    buyContainer: React.ImageStyle,
    buyImg: React.ImageStyle,
}>({
    oneGoodsView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        paddingTop: f.Device.getActualSize(4),
        paddingBottom: f.Device.getActualSize(6),
        backgroundColor: '#FFFFFF',
    },
    goodsImg: {
        width: f.Device.getActualSize(40),
        height: f.Device.getActualSize(40)
    },
    mainInfoView: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: f.Device.getActualSize(5)
    },
    titleText: {
        fontSize: f.Device.getActualSize(8),
        fontWeight: 'bold',
        marginBottom: f.Device.getActualSize(3)
    },
    desText: {
        fontSize: f.Device.getActualSize(7),
        color: '#6a6a6a',
        marginBottom: f.Device.getActualSize(3)
    },
    priceText: {
        fontSize: f.Device.getActualSize(7),
        color: 'red',
        marginTop: f.Device.getActualSize(3)
    },
    priceTextBig: {
        fontSize: f.Device.getActualSize(9)
    },
    cuxiaoImg: {
        width: f.Device.getActualSize(25),
        height: f.Device.getActualSize(10)
    },
    rightButtonView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    collectionContainer: {
        width: f.Device.getActualSize(12),
        height: f.Device.getActualSize(12),
    },
    collectionImg: {
        width: f.Device.getActualSize(12),
        height: f.Device.getActualSize(12),
    },
    buyContainer: {
        width: f.Device.getActualSize(15),
        height: f.Device.getActualSize(15),
    },
    buyImg: {
        width: f.Device.getActualSize(15),
        height: f.Device.getActualSize(15),
    }
});