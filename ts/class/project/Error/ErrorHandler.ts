import { AWebErrorHandler } from '../../web/Error';

export class ErrorHandler extends AWebErrorHandler {
    static readonly instance: ErrorHandler = new ErrorHandler();
    private constructor() {
        super();
        this.setLogMixin(logMixin);
    }
}

const logMixin: tCommon.anyFun | undefined = undefined;
