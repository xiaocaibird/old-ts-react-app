import { AApp } from './infrastructure/App';
import { AStorage } from './infrastructure/Storage';
import { ARedux } from './infrastructure/Redux';
import { ARequest } from './infrastructure/Request';
import { APrompt } from './infrastructure/Prompt';
import { ANavigation } from './infrastructure/Navigation';
import { AErrorHandler } from './infrastructure/Error';
import { AAsyncOperation } from './infrastructure/AsyncOperation';
import { ADevice } from './infrastructure/Device';
import { AUser } from './infrastructure/User';

class _InfrastructureFactory {
    readonly App: AApp<any, any>;

    readonly Storage: AStorage;

    readonly Redux: ARedux<any, any>;

    readonly Request: ARequest;

    readonly Prompt: APrompt;

    readonly Navigation: ANavigation<any, any>;

    readonly ErrorHandler: AErrorHandler;

    readonly AsyncOperation: AAsyncOperation;

    readonly Device: ADevice;

    readonly User: AUser<any>;
}

export const InfrastructureFactory = new _InfrastructureFactory();
