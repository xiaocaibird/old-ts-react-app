export abstract class AStorage {
    abstract clear(...p: any[]): any;
    abstract getValue(key: string, ...p: any[]): any;
    abstract remove(key: string, ...p: any[]): any;
    abstract setValue(key: string, value: any, ...p: any[]): any;
}
