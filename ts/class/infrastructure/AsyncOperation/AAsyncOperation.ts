export abstract class AAsyncOperation {
    protected abstract prepare(...p: any[]): any;
    protected abstract finally(...p: any[]): any;
    protected abstract success(...p: any[]): any;
    protected abstract fail(...p: any[]): any;

    run(task: tCommon.anyPromiseFun, successCallBack?: tCommon.anyFun, failCallBack?: tCommon.anyFun, prepareFun?: tCommon.anyFun, finallyFun?: tCommon.anyFun) {
        if (typeof prepareFun === 'function') {
            prepareFun();
        }
        else {
            this.prepare();
        }
        return task().then(
            () => {
                if (typeof successCallBack === 'function') {
                    successCallBack();
                }
                else {
                    this.success();
                }

                if (typeof finallyFun === 'function') {
                    finallyFun();
                }
                else {
                    this.finally();
                }
            },
            () => {
                if (typeof failCallBack === 'function') {
                    failCallBack();
                }
                else {
                    this.fail();
                }

                if (typeof finallyFun === 'function') {
                    finallyFun();
                }
                else {
                    this.finally();
                }
            }
        );
    }

    createPromise<T>(fun: tCommon.promiseInitFun) {
        return new Promise<T>(fun);
    }
    getResolve<T>(param?: T) {
        return Promise.resolve(param);
    }
    getReject<T>(param?: T) {
        return Promise.reject(param);
    }
}