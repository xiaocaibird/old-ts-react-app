export abstract class AUser<T> {
    abstract getUser(...p: any[]): T | undefined;
    abstract isLogin(...p: any[]): boolean;
}
