import * as ac from '../actions';
import { objHp } from '../../../../helper';

type art = tRedux.actionReturn;
type rht = tRedux.reducerHandler;


const userInfoDefault: tAppInfo.userInfo = {
    nowUser: undefined
}

const userInfoHandler: {
    [k: string]: rht
} = {
        [ac.app_reset]: () => {
            return objHp.cloneDeep(userInfoDefault)
        },
        [ac.app_recoverByLastUnLoadState]: (_state: tAppInfo.userInfo, newValue: ac.app_recoverByLastUnLoadState) => {
            return newValue.userInfo;
        },
        //以上为每个reducer都要实现的action


                
    };

export const userInfo = (state = objHp.cloneDeep(userInfoDefault), action: art) => {
    const _handler = userInfoHandler[action.type];
    if (_handler) {
        return _handler(state, action.newValue);
    }

    return state;
}