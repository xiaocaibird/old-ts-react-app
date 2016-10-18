import { createStore } from 'redux';

export abstract class ARedux<TState, TAction> {
    action: TAction;

    constructor(
        private readonly rootReducer: Redux.Reducer<TState>
    ) {

    }
    private _store: Redux.Store<TState>;
    get Store() {
        if (!this._store) {
            this.storeCreater()
        }
        return this._store
    }
    private storeCreater(initState?: TState) {
        if (initState) {
            this._store = createStore(this.rootReducer, initState);
        }
        else {
            this._store = createStore(this.rootReducer);
        }
    }
    initStore(initState?: TState) {
        this.storeCreater(initState)
    }

    changeState(action: tRedux.actionReturn) {
        this.Store.dispatch(action);
    }
    getState() {
        return this.Store.getState();
    }
}