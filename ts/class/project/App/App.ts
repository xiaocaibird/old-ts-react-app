import { AWebApp } from '../../web/App';
import { Factory as f } from '../../Factory';
import { strHp, objHp, cookieHp } from '../../../helper';

export class App extends AWebApp<tApp.initData, tApp.appConfig> {
    static readonly instance: App = new App();
    private constructor() {
        super();
        this.setRefreshStateInStorageHourSpan(0);
    }

    get AppConfig() {
        if (!this._appConfig) {
            this._appConfig =
                {
                    lastVersion: {
                        code: wechat_initData.version,
                        upgradeUrl: '',
                        needUpgrade: false
                    },
                    locatoinVersion: {
                        code: cookieHp.getValue(this.versionInfoCookieKey) || '',
                        readableCode: cookieHp.getValue(this.versionInfoCookieKey) || ''
                    },
                    token: '',
                    listViewPageSize: 20
                };
        }
        return this._appConfig;
    }

    protected checkUpgrade() {
        if (!this.AppConfig.locatoinVersion.code || this.AppConfig.lastVersion.code > this.AppConfig.locatoinVersion.code) {
            return eCommon.checkUpgrade.necessary
        }

        return eCommon.checkUpgrade.noNew;
    }

    protected clearState() {
        f.Storage.remove(this.lastUnLoadInfoInStorageKey);
        f.Redux.changeState(f.Redux.action.appReset());
    }

    protected setInitData() {
        this.initData = wechat_initData;
        return f.AsyncOperation.getResolve();
    }

    upgrade() {
        this.reset('即将进行版本更新！', () => cookieHp.setValue(this.versionInfoCookieKey, this.AppConfig.lastVersion.code, undefined, true));
    }

    init() {
        window.onerror = (msg, url, num) => {
            f.ErrorHandler.isHasAppGlobalError = true;
            f.ErrorHandler.log({ msg: msg, url: url, lineNum: num });
            this.reset();
        }

        let isRefresh = false;
        window.onbeforeunload = () => {
            /*isRefresh = true;*/
        }

        window.onunload = () => {
            if (f.ErrorHandler.isHasAppGlobalError || isRefresh) {
                f.Storage.remove(this.lastUnLoadInfoInStorageKey);
                return
            }

            f.Storage.setValue(this.lastUnLoadInfoInStorageKey,
                JSON.stringify(
                    {
                        lastUnloadTime: new Date().getTime(),
                        state: f.Redux.getState()
                    }
                )
            );
        }

        const setInitState = () => {
            return this.setInitData().then(
                () => {
                    try {
                        if (!this.initData) {
                            return f.AsyncOperation.getReject();
                        }
                        document.title = this.initData.app_title;

                        this._appConfig = objHp.assign({}, this.AppConfig, {
                            token: this.initData.token
                        });
                        const check = this.checkUpgrade();

                        if (check != eCommon.checkUpgrade.necessary) {
                            f.Redux.changeState(f.Redux.action.appInit(this.initData));

                            if (f.Device.IsPC) {
                                f.Prompt.warningPopUp('在使用过程中如遇到问题，请使用<span style="color:red;">手机</span>登录我们的微信商城。<br />电脑版商城将会在近期推出。敬请期待！');
                            }

                            return f.AsyncOperation.getResolve();
                        }
                        else {
                            this.upgrade();
                            return f.AsyncOperation.getReject();
                        }
                    }
                    catch (e) {
                        f.ErrorHandler.log(e);
                        return f.AsyncOperation.getReject();
                    }
                }
            )
        };

        const lastUnLoadInfoStr = f.Storage.getValue(this.lastUnLoadInfoInStorageKey);

        try {
            if (lastUnLoadInfoStr) {
                const lastUnLoadInfo = strHp.toJson<tApp.lastUnLoadInfo>(lastUnLoadInfoStr);
                if (lastUnLoadInfo && lastUnLoadInfo.lastUnloadTime && lastUnLoadInfo.state && !this.isRefreshStateInStroage(lastUnLoadInfo.lastUnloadTime)) {
                    lastUnLoadInfo.state.appGlobal.spinnerShow = false;
                    lastUnLoadInfo.state.appGlobal.addGoodsInfo.show = false;
                    lastUnLoadInfo.state.appGlobal.clearLargePicture.show = false;
                    f.Redux.changeState(f.Redux.action.appRecoverByLastUnLoadState(lastUnLoadInfo.state));
                }
            }
        }
        catch (e) {
            f.ErrorHandler.log(e);
        }
        return setInitState();
    }

    spinnerShow(show: boolean) {
        f.Redux.changeState(f.Redux.action.appSpinnerShow({ show: show }));
    }
}