import { baseNativeComponent } from './';

export abstract class baseNativeSceneComponent<P, S> extends baseNativeComponent<P, S> {
    protected _sceneProps: eNativeCommon.sceneProps[] = [];
    get SceneProps() {
        return this._sceneProps;
    }
    protected _navigatorType: eNativeCommon.navigatorType = eNativeCommon.navigatorType.home;
    get NavigatorType() {
        return this._navigatorType;
    }
}
