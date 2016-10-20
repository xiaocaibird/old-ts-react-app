import { AWebRedux } from '../../web/Redux';
import rootReducer from './reducers';
import * as action from './actions';
export class Redux extends AWebRedux<tProject.state, typeof action> {
    static readonly instance: Redux = new Redux();
    private constructor() {
        super(rootReducer)
    }
    action = action
}
