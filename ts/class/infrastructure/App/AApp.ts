import { dateHp } from '../../../helper';

export abstract class AApp<TInitData, TAppConfig> {
    constructor() {
        this.upgrade = this.upgrade.bind(this);
    }

    protected readonly lastUnLoadInfoInStorageKey = "_my__App_storageLastUnLoadInfo";

    protected refreshStateInStorageHourSpan = 24
    setRefreshStateInStorageHourSpan(hourSpan: number) {
        this.refreshStateInStorageHourSpan = hourSpan;
    }

    protected initData: TInitData;

    protected abstract _appConfig: TAppConfig;
    abstract get AppConfig(): TAppConfig;


    protected abstract clearState(...p: any[]): any;
    protected abstract setInitData<T>(...p: any[]): Promise<T>;
    protected abstract checkUpgrade(...p: any[]): eCommon.checkUpgrade;

    abstract init<T>(...p: any[]): Promise<T>;
    abstract reset(...p: any[]): any;
    abstract upgrade(...p: any[]): any;
    abstract spinnerShow(show: boolean, ...p: any[]): any;

    protected isRefreshStateInStroage(lastUnloadTime: number) {
        const lastUnloadDate = new Date(lastUnloadTime);
        const hourSpan = dateHp.diff(lastUnloadDate, new Date(), 'h');

        if (hourSpan < this.refreshStateInStorageHourSpan) {
            return false;
        }
        return true;
    }
}

