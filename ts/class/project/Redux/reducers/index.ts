import { combineReducers } from 'redux';
import { appGlobal } from './appGlobal';
import { userInfo } from './user';


const rootReducer = combineReducers<tAppInfo.state>({
    appGlobal,
    userInfo
});

export default rootReducer;


