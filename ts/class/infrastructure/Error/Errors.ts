export class requestError extends Error {
    constructor(
        name: string,
        message = '',
        public state = eCommon.requestErrorState.commomError,
        public postData: tCommon.anyObject | undefined = {},
        public returnData: tCommon.anyObject | undefined = {}
    ) {
        super(message);
        this.name = name;
    }
}