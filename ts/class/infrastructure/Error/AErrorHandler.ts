export abstract class AErrorHandler {
    private logMixin: tCommon.anyFun = defaultLogError;

    isHasAppGlobalError: boolean = false;

    setLogMixin(mixin?: tCommon.anyFun) {
        if (mixin)
            this.logMixin = mixin;
    }
    log(error: tCommon.anyObject) {
        try {
            console.log('error log');
            if (typeof this.logMixin === 'function')
                this.logMixin(error);
        }
        catch (e) {

        }
    }
}

const defaultLogError = (_error: tCommon.anyObject) => {
    /*console.log(error);*/
}

