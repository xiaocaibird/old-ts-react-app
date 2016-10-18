import DeviceInfo from 'react-native-device-info';
import { Dimensions, Platform } from 'react-native';
import { ADevice } from '../../infrastructure/Device';
import Communications from 'react-native-communications';

export abstract class ANativeDevice extends ADevice {
    get UniqueID() {
        if (!this._uniqueID) {
            this._uniqueID = DeviceInfo.getUniqueID();
        }

        return this._uniqueID;
    }
    get SystemName() {
        if (!this._systemName) {
            this._systemName = Platform.OS;
        }
        return this._systemName;
    }

    get AppVersion() {
        if (!this._appVersion) {
            this._appVersion = DeviceInfo.getVersion();
        }

        return this._appVersion;
    }

    get ReadableVersion() {
        if (!this._readableVersion) {
            this._readableVersion = DeviceInfo.getReadableVersion();
        }

        return this._readableVersion;
    }

    get DeviceModel() {
        if (!this._deviceModel) {
            this._deviceModel = DeviceInfo.getModel();
        }

        return this._deviceModel;
    }

    get Manufacturer() {
        if (!this._manufacturer) {
            this._manufacturer = DeviceInfo.getManufacturer();
        }

        return this._manufacturer;
    }

    get DeviceBrand() {
        if (!this._deviceBrand) {
            this._deviceBrand = DeviceInfo.getBrand();
        }

        return this._deviceBrand;
    }

    get DeviceId() {
        if (!this._deviceId) {
            this._deviceId = DeviceInfo.getDeviceId();
        }

        return this._deviceId;
    }

    get SystemVersion() {
        if (!this._systemVersion) {
            this._systemVersion = DeviceInfo.getSystemVersion();
        }

        return this._systemVersion;
    }

    get BundleId() {
        if (!this._bundleId) {
            this._bundleId = DeviceInfo.getBundleId();
        }

        return this._bundleId;
    }

    get BuildNumber() {
        if (!this._buildNumber) {
            this._buildNumber = DeviceInfo.getBuildNumber();
        }

        return this._buildNumber;
    }

    get DeviceName() {
        if (!this._deviceName) {
            this._deviceName = DeviceInfo.getDeviceName();
        }

        return this._deviceName;
    }

    get UserAgent() {
        if (!this._userAgent) {
            this._userAgent = DeviceInfo.getUserAgent();
        }

        return this._userAgent;
    }

    get DeviceLocale() {
        if (!this._deviceLocale) {
            this._deviceLocale = DeviceInfo.getDeviceLocale();
        }

        return this._deviceLocale;
    }

    get DeviceCountry() {
        if (!this._deviceCountry) {
            this._deviceCountry = DeviceInfo.getDeviceCountry();
        }

        return this._deviceCountry;
    }

    get Timezone() {
        if (!this._timezone) {
            this._timezone = DeviceInfo.getTimezone();
        }

        return this._timezone;
    }

    get InstanceID() {
        if (!this._instanceID) {
            this._instanceID = DeviceInfo.getInstanceID();
        }

        return this._instanceID;
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

    getWindowWidth() {
        return Dimensions.get('window').width
    }
    getWindowHeight() {
        return Dimensions.get('window').height
    }

    getScreenWidth() {
        if (this.IsIOS) {
            return this.getWindowWidth();
        }
        return Dimensions.get('screen').width
    }
    getScreenHeight() {
        if (this.IsIOS) {
            return this.getWindowHeight();
        }
        return Dimensions.get('screen').height
    }

    callPhone(number: string, prompt: boolean = false) {
        Communications.phonecall(number, prompt)
    }
}