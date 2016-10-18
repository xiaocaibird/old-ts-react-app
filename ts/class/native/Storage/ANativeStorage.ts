import { AStorage } from '../../infrastructure/Storage';
import { AsyncStorage } from 'react-native';

export abstract class ANativeStorage extends AStorage {
    clear() {
        return AsyncStorage.clear();
    }

    getValue(key: string) {
        return AsyncStorage.getItem(key);
    }

    setValue(key: string, value: string) {
        return AsyncStorage.setItem(key, value);
    }

    remove(key: string) {
        return AsyncStorage.removeItem(key);
    }

}
