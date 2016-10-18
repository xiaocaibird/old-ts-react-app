declare namespace eCommon {
    export const enum checkUpgrade {
        noNew, haveNew, necessary
    }
    export const enum requestErrorState {
        commomError,
        requestFail,
        dataError,
        globalError,
        logicError,
    }

    export const enum popUp {
        warning, info, fail, success, confirm
    }
}