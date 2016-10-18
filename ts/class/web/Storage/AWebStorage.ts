import { AStorage } from '../../infrastructure/Storage';

export abstract class AWebStorage extends AStorage {
    clear() {
        if (window.localStorage)
            window.localStorage.clear();
    }

    getValue(key: string) {
        if (window.localStorage)
            return window.localStorage[key]
        return null;
    }

    setValue(key: string, value: string) {
        if (window.localStorage)
            window.localStorage.setItem(key, value);
    }

    remove(key: string) {
        if (window.localStorage)
            window.localStorage.removeItem(key);
    }

}
