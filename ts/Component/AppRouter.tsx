import * as React from 'react';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router';
import { Factory as f } from '../class/Factory';
import { baseWebComponent } from './base';

import RootScene from './RootScene';
import Home from './containers/Home.jsx';
import User from './containers/User.jsx';
import UserCenter from './containers/UserCenter.jsx';
import UserInfo from './containers/UserInfo.jsx';
import UserCoupon from './containers/UserCoupon.jsx';
import Order from './containers/Order.jsx';
import OrderList from './containers/OrderList.jsx';
import OrderInfo from './containers/OrderInfo.jsx';
import Login from './containers/Login.jsx';
import LoginIndex from './containers/LoginIndex.jsx';
import LoginRegister from './containers/LoginRegister.jsx';
import GoodsSearch from './containers/GoodsSearch.jsx';
import RecentBuy from './containers/RecentBuy.jsx';
import Sales from './containers/Sales.jsx';
import UserCollection from './containers/UserCollection.jsx';
import Cart from './containers/Cart.jsx';
import CartIndex from './containers/CartIndex.jsx';
import CartCheck from './containers/CartCheck.jsx';
import CartCheckCoupon from './containers/CartCheckCoupon.jsx';
import CartSubmitComplete from './containers/CartSubmitComplete.jsx';
import UserChangePwd from './containers/UserChangePwd.jsx';


type props = {
    toMyOrder: boolean
};
type state = tCommon.reactState;

export default class AppRouter extends baseWebComponent<props, state> {
    private isInited: boolean = false;
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={RootScene} >
                    <IndexRedirect to="/Home" />
                    <Route path='/Home' component={Home} onEnter={(_nextState, replace) => this.initCheck(replace)} />
                    <Route path='/GoodsSearch' component={GoodsSearch} />
                    <Route path='/RecentBuy' component={RecentBuy} onEnter={(nextState, replace) => this.loginCheck(nextState, replace, 0)} />
                    <Route path='/Sales' component={Sales} />
                    <Route path='/Cart' component={Cart} onEnter={(nextState, replace) => this.loginCheck(nextState, replace, 1)}  >
                        <IndexRoute component={CartIndex} />
                        <Route path='/Cart/Check' component={CartCheck} onEnter={
                            (nextState, replace) => this.requiredStateCheck(nextState, replace, 'orderCheckInfo')
                        } />
                        <Route path='/Cart/Check/Coupon' component={CartCheckCoupon} onEnter={
                            (nextState, replace) => this.requiredStateCheck(nextState, replace, 'orderCheckInfo')
                        } />
                        <Route path='/Cart/SubmitComplete' component={CartSubmitComplete} />

                    </Route>
                    <Route path='/Order' component={Order} onEnter={(nextState, replace) => this.loginCheck(nextState, replace, 2)} >
                        <IndexRoute component={OrderList} />
                        <Route path='/Order/Info' component={OrderInfo} onEnter={
                            (nextState, replace) => this.requiredStateCheck(nextState, replace, 'orderInfo', '/Order')
                        } />
                    </Route>
                    <Route path="/User" component={User} onEnter={(nextState, replace) => this.loginCheck(nextState, replace, 3)} >
                        <IndexRoute component={UserCenter} />
                        <Route path='/User/Info' component={UserInfo} />
                        <Route path='/User/Coupon' component={UserCoupon} />
                        <Route path='/User/Collection' component={UserCollection} />
                        <Route path='/User/ChangePwd' component={UserChangePwd} />
                    </Route>
                    <Route path='/Login' component={Login} onEnter={() => this.NavComponentSelect(3)}>
                        <IndexRoute component={LoginIndex} />
                        <Route path='/Login/Register' component={LoginRegister} />
                    </Route>
                </Route>
            </Router>
        )
    }

    private requiredStateCheck = (_nextState: ReactRouter.RouterState, replace: ReactRouter.RedirectFunction, key: string, url: string = '/') => {
        if (!(f.Redux.getState() as any)[key]) {
            replace(url);
        }
    }
    private NavComponentSelect = (i: number) => {
        f.Redux.changeState(
            f.Redux.action.appNavBarSelectChange({ index: i })
        );
    }

    private loginCheck = (_nextState: ReactRouter.RouterState, replace: ReactRouter.RedirectFunction, i: number) => {
        if (!f.User.isLogin())
            replace('/Login');
        else {
            this.NavComponentSelect(i);
        }

    }

    private initCheck = (replace: ReactRouter.RedirectFunction) => {
        if (!this.isInited && this.props.toMyOrder) {
            this.isInited = true;
            replace('/Order');
        }
        else {
            this.isInited = true;
            this.NavComponentSelect(0);
        }
    }
}

