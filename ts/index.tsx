import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './Component/AppRouter.jsx';
import { Factory as f } from './class/Factory';
import 'react-fastclick';
import './helpers/extendMethod.js';
import '../css/common.css';
import '../css/home.css';
import '../css/iSlider.min.css';
import '../css/order.css';
import '../css/transition.css3.css';
import '../css/user.css';
import '../css/login.css';
import '../css/goodsSearch.css';
import '../css/cart.css';
import '../css/xcConfirm.css';
import '../css/mobiscroll/mobiscroll.animation.css';
/*import '../css/mobiscroll/mobiscroll.icons.css';*/
import '../css/mobiscroll/mobiscroll.scroller.css';
/*import '../css/mobiscroll/mobiscroll.scroller.android.css';*/
import '../css/mobiscroll/mobiscroll.scroller.android-holo.css';
/*import '../css/mobiscroll/mobiscroll.scroller.sense-ui.css';*/
import '../css/mobiscroll/mobiscroll.widget.css';
/*import '../css/mobiscroll/mobiscroll.widget.android.css';*/
import '../css/mobiscroll/mobiscroll.widget.android-holo.css';
/*import '../css/mobiscroll/mobiscroll.widget.sense-ui.css';*/
if (navigator.cookieEnabled) {
  f.App.init().then(
    () => {
      try {
        const rootElement = document.getElementById('container');
        render(
          <Provider store={f.Redux.Store}>
            <AppRouter toMyOrder={!!wechat_initData.my_order} />
          </Provider>,
          rootElement!
        );
      }
      catch (e) {
        f.ErrorHandler.isHasAppGlobalError = true;
        f.ErrorHandler.log(e);
        f.App.reset();
      }
    },
    () => { }
  )
}
else {
  alert('抱歉！由于您的浏览器禁用了cookie，该站点无法正常使用。请开启cookie或更换浏览器。');
}