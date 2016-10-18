import { baseUserScene } from './';

export abstract class baseUserHasLoggedScene<P, S> extends baseUserScene<P, S> {
    constructor() {
        super();
        this._sceneProps.push(eNativeCommon.sceneProps.user);
    }
}