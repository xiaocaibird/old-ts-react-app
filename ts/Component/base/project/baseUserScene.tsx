import { baseNativeSceneComponent } from '../';

export abstract class baseUserScene<P, S> extends baseNativeSceneComponent<P, S> {
    constructor() {
        super();
        this._navigatorType = eNativeCommon.navigatorType.user;
    }
}