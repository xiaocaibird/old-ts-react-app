import { ANativeDevice } from '../../native/Device';
import { PixelRatio } from 'react-native';

export class Device extends ANativeDevice {
    static readonly instance: Device = new Device();
    private constructor() {
        super();
    }
    get PxRatio() {
        if (this._pxRatio == null) {
            this._pxRatio = PixelRatio.get();
            if (this._pxRatio >= 2) {
                this._pxRatio = 2
            }
            else if (this.PxRatio <= 1.5) {
                this._pxRatio = 1.5
            }
        }
        return this._pxRatio;
    }
}
