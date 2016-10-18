declare namespace tRedux {
    export type reducerHandler = Function

    export type actionReturn = { type: string, newValue?: newValue }
    export type newValue = { [k: string]: any }
}