import { ANativeNavigation } from '../../native/Navigation';
import { arrayHp } from '../../../helper';
import { Factory as f } from '../../Factory';
export class Navigation extends ANativeNavigation {
    static readonly instance: Navigation = new Navigation();
    private constructor() {
        super();
    }
    checkPreChange(route: React.Route) {
        if (route && route.component) {
            try {
                let c: any;
                if ((route.component as any).WrappedComponent) {
                    c = new (route.component as any).WrappedComponent();
                }
                else {
                    c = new route.component();
                }
                if (arrayHp.isArray(c.SceneProps) && arrayHp.find(c.SceneProps, (v) => v == eNativeCommon.sceneProps.user) != null) {
                    if (!f.User.isLogin()) {
                        this.toLogin(true);
                        return false;
                    }
                }

                if (typeof c.NavigatorType == 'number') {
                    f.Redux.changeState(
                        f.Redux.action.appNavBarSelectChange({ index: c.NavigatorType })
                    );
                }
                return true
            }
            catch (e) {
                if (this.entryScene && this.entryScene.component) {
                    this.toEntry(true);
                }
                return false
            }
        }
        else {
            if (this.entryScene && this.entryScene.component) {
                this.toEntry(true);
            }
            return false
        }
    }
}
