export abstract class APrompt {
    protected abstract createPopUp(title: string, msg: string, type: eCommon.popUp,
        okCallBack?: tCommon.anyFun,
        cancelCallBack?: tCommon.anyFun, ...p: any[]): any;

    warningPopUp(msg: string, title = '警告', okCallBack?: tCommon.anyFun) {
        return this.createPopUp(title, msg, eCommon.popUp.warning, okCallBack)
    }
    successPopUp(msg: string, title = '操作成功', okCallBack?: tCommon.anyFun) {
        return this.createPopUp(title, msg, eCommon.popUp.success, okCallBack)
    }
    promptPopUp(msg: string, title = '提示', okCallBack?: tCommon.anyFun) {
        return this.createPopUp(title, msg, eCommon.popUp.info, okCallBack)
    }
    failPopUp(msg: string, title = '操作失败', okCallBack?: tCommon.anyFun) {
        return this.createPopUp(title, msg, eCommon.popUp.fail, okCallBack)
    }
    confirmPopUp(msg: string, title = '确认操作', okCallBack?: tCommon.anyFun, cancelCallBack?: tCommon.anyFun) {
        return this.createPopUp(title, msg, eCommon.popUp.confirm, okCallBack, cancelCallBack)
    }

    protected abstract createToast(msg: string, onShow?: tCommon.anyFun, onHide?: tCommon.anyFun, ...p: any[]): any;

    promptToast(msg: string, onShow?: tCommon.anyFun, onHide?: tCommon.anyFun) {
        return this.createToast(msg, onShow, onHide);
    }
}
