export abstract class ADevice {
    protected _uniqueID: string;
    abstract get UniqueID(): string;

    protected _systemName: string;
    abstract get SystemName(): string;

    protected _appVersion: string;
    abstract get AppVersion(): string;

    protected _readableVersion: string;
    abstract get ReadableVersion(): string;

    protected _deviceModel: string;
    abstract get DeviceModel(): string;

    protected _manufacturer: string;
    abstract get Manufacturer(): string;

    protected _deviceBrand: string;
    abstract get DeviceBrand(): string;

    protected _deviceId: string;
    abstract get DeviceId(): string;

    protected _systemVersion: string;
    abstract get SystemVersion(): string;

    protected _bundleId: string;
    abstract get BundleId(): string;

    protected _buildNumber: string;
    abstract get BuildNumber(): string;

    protected _deviceName: string;
    abstract get DeviceName(): string;

    protected _userAgent: string;
    abstract get UserAgent(): string;

    protected _deviceLocale: string;
    abstract get DeviceLocale(): string;

    protected _deviceCountry: string;
    abstract get DeviceCountry(): string;

    protected _timezone: string;
    abstract get Timezone(): string;

    protected _instanceID: string;
    abstract get InstanceID(): string;

    protected _pxRatio: number;
    abstract get PxRatio(): number;

    protected _isIOS: boolean;
    abstract get IsIOS(): boolean;

    protected _isAndroid: boolean;
    abstract get IsAndroid(): boolean;

    abstract getWindowWidth(...p: any[]): number;
    abstract getWindowHeight(...p: any[]): number;

    abstract getScreenWidth(...p: any[]): number;
    abstract getScreenHeight(...p: any[]): number;

    abstract callPhone(number: string, ...p: any[]): any;

    getActualSize(px: number) {
        return this.PxRatio * px;
    }
}