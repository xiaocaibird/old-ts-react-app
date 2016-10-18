import { AWebDevice } from '../../web/Device';

export class Device extends AWebDevice {
    static readonly instance: Device = new Device();
    private constructor() {
        super();
    }
    get PxRatio() {
        /*if (this._pxRatio == null) {
            this._pxRatio = PixelRatio.get();
            if (this._pxRatio >= 2) {
                this._pxRatio = 2
            }
            else if (this.PxRatio <= 1.5) {
                this._pxRatio = 1.5
            }
        }
        return this._pxRatio;*/
        return 1;
    }
}
