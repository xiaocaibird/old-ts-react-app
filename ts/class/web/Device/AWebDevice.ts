import { ADevice } from '../../infrastructure/Device';
import { WebFactory as f } from '../../Factory';

export abstract class AWebDevice extends ADevice {
    get UniqueID() {
        return '';
    }
    get SystemName() {
        if (!this._systemName) {
            this._systemName = 'PC';
            for (let v = 0; v < Agents.length; v++) {
                if (navigator.userAgent.indexOf(Agents[v]) > 0) { this._systemName = Agents[v]; break; }
            }
            if (this._systemName == 'iPhone') {
                this._systemName = 'iOS';
            }
        }
        return this._systemName;
    }

    get AppVersion() {
        return f.App.AppConfig.locatoinVersion.code;
    }

    get ReadableVersion() {
        return f.App.AppConfig.locatoinVersion.readableCode;
    }

    get DeviceModel() {
        return '';
    }

    get Manufacturer() {
        return '';
    }

    get DeviceBrand() {
        return '';
    }

    get DeviceId() {
        return '';
    }

    get SystemVersion() {
        return '';
    }

    get BundleId() {
        return '';
    }

    get BuildNumber() {
        return '';
    }

    get DeviceName() {
        return '';
    }

    get UserAgent() {
        return '';
    }

    get DeviceLocale() {
        return '';
    }

    get DeviceCountry() {
        return '';
    }

    get Timezone() {
        return '';
    }

    get InstanceID() {
        return '';
    }

    get IsIOS() {
        if (this._isIOS == null) {
            this._isIOS = this.SystemName.toLowerCase() == 'ios' ? true : false;
        }
        return this._isIOS;
    }

    get IsAndroid() {
        if (this._isAndroid == null) {
            this._isAndroid = this.SystemName.toLowerCase() == 'android' ? true : false;
        }

        return this._isAndroid;
    }

    get IsPC() {
        if (this._isPC == null) {
            this._isPC = this.SystemName.toLowerCase() == 'pc' ? true : false;
        }

        return this._isPC;
    }

    getWindowWidth(type: 'client' | 'offset' = 'client') {
        if (type == 'client')
            return document.body.clientWidth;

        return document.body.offsetWidth;
    }
    getWindowHeight(type: 'client' | 'offset' = 'client') {
        if (type == 'client')
            return document.body.clientHeight;

        return document.body.offsetHeight;
    }

    getScreenWidth(type: 'avail' = 'avail') {
        if (type == 'avail') {
            return window.screen.availWidth;
        }

        return window.screen.width;
    }
    getScreenHeight(type: 'avail' = 'avail') {
        if (type == 'avail') {
            return window.screen.availHeight;
        }

        return window.screen.height;
    }

    callPhone(_number: string) {

    }
}

const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone");
