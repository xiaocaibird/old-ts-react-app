import * as ac from '../actions';
import { objHp } from '../../../../helper';

type art = tRedux.actionReturn;
type rht = tRedux.reducerHandler;


const appGlobalDefault: tAppInfo.appGlobal = {

}

const appGlobalHandler: {
    [k: string]: rht
} = {
        [ac.app_reset]: () => {
            return objHp.cloneDeep(appGlobalDefault)
        },
        [ac.app_recoverByLastUnLoadState]: (_state: tAppInfo.appGlobal, newValue: ac.app_recoverByLastUnLoadState) => {
            return newValue.appGlobal;
        },
        //以上为每个reducer都要实现的action

        
    };

export const appGlobal = (state = objHp.cloneDeep(appGlobalDefault), action: art) => {
    const _handler = appGlobalHandler[action.type];
    if (_handler) {
        return _handler(state, action.newValue);
    }

    return state;
}
