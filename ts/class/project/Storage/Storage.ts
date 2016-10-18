import { ANativeStorage } from '../../native/Storage';

export class Storage extends ANativeStorage {
    static readonly instance: Storage = new Storage();
    private constructor() {
        super();
    }
}
