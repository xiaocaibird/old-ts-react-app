import { AApp } from '../../infrastructure/App';
import { WebFactory as f } from '../../Factory';

export abstract class AWebApp<TInitData, TAppConfig> extends AApp<TInitData, TAppConfig> {
    reset(msg: string = '请求超时！请稍后刷新页面！', callback?: tCommon.anyFun) {
        f.Prompt.warningPopUp(msg, undefined, () => {
            if (typeof callback === 'function') callback();
            this.clearState();
            if (!f.Navigation.isEntry()) {
                f.Navigation.toEntry();
                f.Navigation.reload();
            }
            else {
                f.Navigation.reload();
            }
        });
    }

    //非继承成员
    protected versionInfoCookieKey = '_my__app_cookieVersion';
}
