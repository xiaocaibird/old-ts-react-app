
declare namespace tCommon {
    export type anyObject = {
        [k: string]: any,
        [i: number]: any
    }

    export type anyFun = (...param: any[]) => any;
    export type anyPromiseFun = (...param: any[]) => Promise<any>;
    export type promiseInitFun = (resolve: anyFun, reject: anyFun) => void;


    export type reactProps = anyObject;
    export type reactState = anyObject;
}