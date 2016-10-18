import { baseNativeSceneComponent } from '../';

export abstract class baseOrderScene<P, S> extends baseNativeSceneComponent<P, S> {
    constructor() {
        super();
        this._navigatorType = eNativeCommon.navigatorType.order;
        this._sceneProps.push(eNativeCommon.sceneProps.user);
    }
}