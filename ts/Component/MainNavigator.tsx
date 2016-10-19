import * as React from 'react';
import {
    Navigator,
    View
} from './common/native';
import {
    baseNativeComponent
} from './base';
import SplashScreen from 'react-native-splash-screen';
import Home from './scene/Home';
import Login from './scene/Login';
import AppLoading from './scene/AppLoading';
import { Factory as f } from '../class/Factory';
import { funHp } from '../helper';

type props = tCommon.reactProps;
type state = tCommon.reactState;

export default class MainNavigator extends baseNativeComponent<props, state> {
    constructor() {
        super();
        f.Navigation.entryScene = { component: Home };
        f.Navigation.loginScene = { component: Login };
    }
    componentDidMount() {
        f.Navigation.setNavigator((this.refs["Navigator"] as any));

        if (f.Device.IsIOS) {
            setTimeout(
                () => {
                    try {
                        SplashScreen.hide();
                    }
                    catch (e) {

                    }
                },
                5000
            )
        }

        f.AsyncOperation.run(
            () => {
                return f.App.init().then(
                    () => {

                        f.Navigation.toEntry(true);
                        return f.AsyncOperation.getResolve();
                    },
                    () => {
                        f.Prompt.confirmPopUp(
                            '当前的软件版本(' + f.App.AppConfig.locatoinVersion.code + ')已经过时，无法正常使用！点击确定升级到最新版本！',
                            '版本过时',
                            f.App.upgrade
                        );
                        return f.AsyncOperation.getReject();
                    }
                )
            },
            funHp.noop,
            funHp.noop,
            funHp.noop,
            () => {
                try {
                    SplashScreen.hide();
                }
                catch (e) {

                }
            }
        );
    }
    render() {
        return (
            <Navigator ref='Navigator'
                initialRoute={{ component: AppLoading }}
                configureScene={() => {
                    return Navigator.SceneConfigs.FadeAndroid;
                } }
                renderScene={(route) => {
                    if (route.component)
                        return <route.component {...route["params"]} />
                    return <View />
                } }
                />
        );
    }
}



