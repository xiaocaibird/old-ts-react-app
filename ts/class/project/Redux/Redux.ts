import { ANativeRedux } from '../../native/Redux';
import rootReducer from './reducers';
import * as action from './actions';
export class Redux extends ANativeRedux<tAppInfo.state, typeof action> {
    static readonly instance: Redux = new Redux();
    private constructor() {
        super(rootReducer)
    }
    action = action
}