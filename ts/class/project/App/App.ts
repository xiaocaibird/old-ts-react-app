import { ANativeApp } from '../../native/App';
import { Factory as f } from '../../Factory';
import { strHp, objHp } from '../../../helper';

export class App extends ANativeApp<tAppInfo.initData, tAppInfo.appConfig> {
    static readonly instance: App = new App();
    private constructor() {
        super();
        this.setRefreshStateInStorageHourSpan(0);
    }

    protected _appConfig: tAppInfo.appConfig;
    get AppConfig() {
        if (!this._appConfig) {
            this._appConfig =
                {
                    lastVersion: {
                        code: f.Device.AppVersion,
                        upgradeUrl: '',
                        needUpgrade: false
                    },
                    locatoinVersion: {
                        code: f.Device.AppVersion,
                        readableCode: f.Device.ReadableVersion
                    },
                    token: '',
                    listViewPageSize: 20
                };
        }
        return this._appConfig;
    }

    protected checkUpgrade() {
        if (!this.AppConfig.lastVersion.code || this.AppConfig.lastVersion.code <= this.AppConfig.locatoinVersion.code) {
            return eCommon.checkUpgrade.noNew
        }
        else if (this.AppConfig.lastVersion.needUpgrade) {
            return eCommon.checkUpgrade.necessary
        }
        return eCommon.checkUpgrade.haveNew;
    }

    protected clearState() {
        f.Storage.remove(this.lastUnLoadInfoInStorageKey);
        f.Redux.changeState(f.Redux.action.appReset());
    }

    protected setInitData() {
        return f.Request.getAppInitData().then(
            (data: any) => {
                this.initData = data;
            }
        )
    }

    upgrade() {
        f.Storage.remove(this.lastUnLoadInfoInStorageKey);
        try {
            if (f.Device.IsIOS) {
                return f.Navigation.openUrl(this.AppConfig.lastVersion.upgradeUrl);
            }
            else if (f.Device.IsAndroid) {
                return f.Navigation.openUrl(this.AppConfig.lastVersion.upgradeUrl);
            }
        }
        catch (e) {
            f.ErrorHandler.log(e);
        }
        return f.AsyncOperation.getReject();
    }

    init() {
        const setInitState = () => {
            return this.setInitData().then(
                () => {
                    try {
                        if (!this.initData) {
                            return f.AsyncOperation.getReject();
                        }
                        const v = this.initData.version;

                        this._appConfig = objHp.assign({}, this.AppConfig, {
                            lastVersion: v ? {
                                code: v.version_no ? v.version_no : f.Device.AppVersion,
                                upgradeUrl: v.down_url ? v.down_url : '',
                                needUpgrade: v.must_update == '1' || v.must_update == 1 ? true : false
                            } : {
                                    code: f.Device.AppVersion,
                                    upgradeUrl: '',
                                    needUpgrade: false
                                },
                            locatoinVersion: { code: f.Device.AppVersion },
                            token: this.initData.token
                        });
                        const check = this.checkUpgrade();

                        if (check != eCommon.checkUpgrade.necessary) {
                            f.Redux.changeState(f.Redux.action.appInit(this.initData));

                            if (check == eCommon.checkUpgrade.haveNew) {
                                f.Prompt.confirmPopUp(
                                    '当前软件版本：' + f.App.AppConfig.locatoinVersion.code + '。最新版本：' + f.App.AppConfig.lastVersion.code + '。是否要更新？',
                                    '有新的版本',
                                    f.App.upgrade
                                );
                            }

                            return f.AsyncOperation.getResolve();
                        }
                        else {

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

        return f.Storage.getValue(this.lastUnLoadInfoInStorageKey).then(
            (lastUnLoadInfoStr) => {
                try {
                    if (lastUnLoadInfoStr) {
                        const lastUnLoadInfo = strHp.toJson<tAppInfo.lastUnLoadInfo>(lastUnLoadInfoStr);
                        if (lastUnLoadInfo && lastUnLoadInfo.lastUnloadTime && lastUnLoadInfo.state && !this.isRefreshStateInStroage(lastUnLoadInfo.lastUnloadTime)) {
                            lastUnLoadInfo.state.appGlobal.spinnerShow = false;
                            lastUnLoadInfo.state.appGlobal.navBarShow = false;
                            lastUnLoadInfo.state.appGlobal.navBarSelectIndex = 0;
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
            },
            () => {
                return setInitState();
            }
        );

    }

    spinnerShow(show: boolean) {
        f.Redux.changeState(f.Redux.action.appSpinnerShow({ show: show }));
    }
}