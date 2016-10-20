import * as React from 'react';
import { baseWebComponent } from './base';

import NavBar from './common/NavBar.jsx';
import { connect } from 'react-redux';
import { store } from './helpers/globalObject.js';
import * as config from './helpers/config.js';
import * as cf from './helpers/commonFunction.js';
import AddGoods from './common/AddGoods.jsx';
import * as actions from './actions';

type props = {
    toMyOrder: boolean
};
type state = tCommon.reactState;

class RootScene extends baseWebComponent<props, state> {
    shouldComponentUpdate(nextProps, nextState) {
        return !cf.ImmutableCompare(nextProps, this.props);
    }
    deleteImgOnClick(e) {
        e.preventDefault();
        cf.changeAppState(actions.pageGoodsImgGetClear, { show: false, src: '' })
    }
    render() {
        const {pageLoadingShow, addGoodsShow, navSelectIndex, cartListInfo, pageShowBigImg} = this.props;
        return (
            <div className={classNames.container}>
                {this.props.children}
                <NavBar _index={navSelectIndex} _goodsCount={cartListInfo.cartGoodsTotal} />
                <div className={classNames.loading} style={{ display: pageLoadingShow ? 'block' : 'none' }}>
                    <img src={cf.getImgUrl('loading.gif')} />
                </div>
                <AddGoods _addGoodsShow={addGoodsShow} />
                <div className={classNames.showImg} style={{ display: pageShowBigImg.show ? 'block' : 'none' }}>
                    <div className={classNames.showImgBg}></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <img src={pageShowBigImg.src} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <img src={cf.getImgUrl('delete.png')} className={classNames.deleteImg} onClick={this.deleteImgOnClick} />
                </div>
            </div>
        )
    }
}

const classNames = {
    container: 'bodyContainer',
    loading: 'pageLoading',
    deleteImg: 'pageDeleteImg',

    showImg: 'pageShowBigImg',
    showImgBg: 'pageShowBigImgBg'
}

function select(state) {
    return {
        pageLoadingShow: state.,
        addGoodsShow: state.addGoodsShow,
        navSelectIndex: state.navSelectIndex,
        cartListInfo: state.cartListInfo,
        pageShowBigImg: state.pageShowBigImg
    }
}

export default connect(select)(RootScene);