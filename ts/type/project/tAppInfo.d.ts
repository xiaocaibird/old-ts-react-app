declare namespace tAppInfo {
    export type lastUnLoadInfo = {
        state: state,
        lastUnloadTime: number
    }
    export type initData = {

    }
    export type appConfig = {
        lastVersion: lastVersion,
        locatoinVersion: locatoinVersion,
        listViewPageSize: number
    }

    export type lastVersion = {
        code: string,
        needUpgrade: boolean,
        upgradeUrl: string
    }

    export type locatoinVersion = {
        code: string,
        readableCode: string
    }

    export type state = {
        appGlobal: appGlobal,
        userInfo: userInfo
    }
    export type appGlobal = {

    }
    export type userInfo = {
        nowUser: nowUser
    }

    export type nowUser = {

    } | undefined
}
