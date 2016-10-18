import { ANativeErrorHandler } from '../../native/Error';

export class ErrorHandler extends ANativeErrorHandler {
    static readonly instance: ErrorHandler = new ErrorHandler();
    private constructor() {
        super();
        this.setLogMixin(logMixin);
    }
}

const logMixin: tCommon.anyFun | undefined = undefined;
