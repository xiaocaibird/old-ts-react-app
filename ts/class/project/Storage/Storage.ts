import { AWebStorage } from '../../web/Storage';

export class Storage extends AWebStorage {
    static readonly instance: Storage = new Storage();
    private constructor() {
        super();
    }
}
