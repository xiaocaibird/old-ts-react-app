import * as _ from 'lodash';

export namespace strHp {
    export const isstring = (obj: any) => {
        return (typeof obj === 'string')
    }

    export const toJson = <T>(str: string) => {
        try {
            return JSON.parse(str) as T;
        }
        catch (e) {
            return null;
        }
    }

    export const trim = (str: string) => {
        try {
            return _.trim(str.toString())
        }
        catch (e) {
            return ''
        }
    }
}
