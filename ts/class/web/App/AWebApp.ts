import { AApp } from '../../infrastructure/App';
import { WebFactory as f } from '../../Factory';

export abstract class AWebApp<TInitData, TAppConfig> extends AApp<TInitData, TAppConfig> {
    reset(msg: string = '通信异常！请稍后刷新页面！') {
        this.clearState();
        f.Prompt.warningPopUp(msg, undefined, () => {
            if (!f.Navigation.isEntry()) {
                f.Navigation.toEntry();
                f.Navigation.reload();
            }
            else {
                f.Navigation.reload();
            }
        });
    }
}
