import { ANavigation } from '../../infrastructure/Navigation';
import { strHp } from '../../../helper';

export abstract class AWebNavigation extends ANavigation<ReactRouter.History, string>  {
    push(route: HistoryModule.LocationDescriptor) {
        this.navigator.push(route);
    }

    replace(route: HistoryModule.LocationDescriptor) {
        this.navigator.replace(route);
    }

    resetTo(route: HistoryModule.LocationDescriptor) {
        this.replace(route);
    }
    jumpTo(route: HistoryModule.LocationDescriptor) {
        this.push(route);
    }
    pop() {
        this.back();
    }
    back() {
        this.navigator.goBack();
    }
    forward() {
        this.navigator.goForward();
    }

    toEntry(isReset: boolean = true) {
        if (isReset)
            this.resetTo(this.entryScene)
        else
            this.jumpTo(this.entryScene)
    }

    toLogin(isReset: boolean = true) {
        if (isReset)
            this.resetTo(this.loginScene)
        else
            this.jumpTo(this.loginScene)
    }

    reload(forcedReload: boolean = false) {
        window.location.reload(forcedReload);
    }

    isEntry() {
        const nowUrl = strHp.trim(window.location.hash.toLowerCase());
        const s = ('#' + this.entryScene).toLowerCase();

        if (nowUrl != '' && nowUrl != '#/' && nowUrl != '#' && nowUrl.indexOf(s) == -1) {
            return false
        }

        return true;
    }

    openUrl(url: string, target: string = '_top') {
        return window.open(url, target)
    }
}
