import { ANativeAsyncOperation } from '../../native/AsyncOperation';
import { Factory as f } from '../../Factory';

export class AsyncOperation extends ANativeAsyncOperation {
    static readonly instance: AsyncOperation = new AsyncOperation();
    private constructor() {
        super();
    }

    protected prepare() {
        f.App.spinnerShow(true);
    }

    protected finally() {
        setTimeout(() => {
            f.App.spinnerShow(false);
        }, 300);
    }

    protected success() {
        /*f.Prompt.promptToast('加载完成！');*/
    }

    protected fail() {
        /*f.Prompt.promptToast('加载失败！请稍后再试！');*/
    }
}
