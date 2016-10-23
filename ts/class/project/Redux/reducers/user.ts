import * as ac from '../actions';
import { objHp } from '../../../../helper';

type art = tRedux.actionReturn;
type rht = tRedux.reducerHandler;


const userInfoDefault: tApp.userInfo = {
    nowUser: undefined
}

const userInfoHandler: {
    [k: string]: rht
} = {
        [ac.app_reset]: () => {
            return objHp.cloneDeep(userInfoDefault)
        },
        [ac.app_recoverByLastUnLoadState]: (_state: tApp.userInfo, newValue: ac.app_recoverByLastUnLoadState) => {
            return newValue.userInfo;
        },

        [ac.app_init]: (state: tApp.userInfo, newValue: ac.app_init) => {
            const v = {
                nowUser: newValue.isLogin && newValue.userInfo ? newValue.userInfo : undefined
            }
            return objHp.assign({}, state, v);
        },

        [ac.user_logout]: (state: tApp.userInfo) => {
            return objHp.assign({}, state, { nowUser: undefined });
        },
        [ac.user_login]: (state: tApp.userInfo, newValue: ac.user_login) => {
            const v = {
                nowUser: newValue.nowUser
            }
            return objHp.assign({}, state, v);
        },
        [ac.user_updateInfo]: (state: tApp.userInfo, newValue: ac.user_updateInfo) => {
            if (!newValue) return state;
            const v = {
                nowUser: objHp.assign({}, state.nowUser, newValue)
            }
            return objHp.assign({}, state, v);
        },
    };

export const userInfo = (state = objHp.cloneDeep(userInfoDefault), action: art) => {
    const _handler = userInfoHandler[action.type];
    if (_handler) {
        return _handler(state, action.newValue);
    }

    return state;
}