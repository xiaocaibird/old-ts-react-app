import { ANavigation } from '../../infrastructure/Navigation';
import { Navigator, Linking } from 'react-native';
import { objHp } from '../../../helper';

export abstract class ANativeNavigation extends ANavigation<Navigator, React.Route> {
    push(route: React.Route, noCheck?: boolean) {
        if (noCheck || this.checkPreChange(route)) {
            this.navigator.push(route);
        }
    }

    replace(route: React.Route, noCheck?: boolean) {
        if (noCheck || this.checkPreChange(route)) {
            this.navigator.replace(route);
        }
    }

    resetTo(route: React.Route, noCheck?: boolean) {
        if (noCheck || this.checkPreChange(route)) {
            this.navigator.resetTo(route);
        }
    }
    jumpTo(route: React.Route, noCheck?: boolean) {
        if (noCheck || this.checkPreChange(route)) {
            this.navigator.jumpTo(route);
        }
    }
    pop() {
        try {
            this.navigator.pop();
        }
        catch (e) {
            this.toEntry(true);
        }
    }
    back() {
        try {
            this.navigator.jumpBack();
        }
        catch (e) {
            this.toEntry(true);
        }
    }
    forward() {
        try {
            this.navigator.jumpForward();
        }
        catch (e) {
            this.toEntry(true);
        }
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

    reload() {
        const Routes = this.navigator.getCurrentRoutes();
        const nowRoute = Routes[Routes.length - 1];

        this.replace(nowRoute);
    }

    isEntry() {
        const Routes = this.navigator.getCurrentRoutes();
        const nowRoute = Routes[Routes.length - 1];

        if (nowRoute && objHp.isEqual(nowRoute, this.entryScene)) {
            return true;
        }

        return false;
    }

    openUrl(url: string) {
        return Linking.openURL(url);
    }
}
