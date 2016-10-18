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

import { ANativeApp } from './native/App';
import { ANativeStorage } from './native/Storage';
import { ANativeRedux } from './native/Redux';
import { ANativeRequest } from './native/Request';
import { ANativePrompt } from './native/Prompt';
import { ANativeNavigation } from './native/Navigation';
import { ANativeErrorHandler } from './native/Error';
import { ANativeAsyncOperation } from './native/AsyncOperation';
import { ANativeDevice } from './native/Device';
import { ANativeUser } from './native/User';

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

class _NativeFactory extends _InfrastructureFactory {
    readonly App: ANativeApp<any, any>;

    readonly Storage: ANativeStorage;

    readonly Redux: ANativeRedux<any, any>;

    readonly Request: ANativeRequest;

    readonly Prompt: ANativePrompt;

    readonly Navigation: ANativeNavigation;

    readonly ErrorHandler: ANativeErrorHandler;

    readonly AsyncOperation: ANativeAsyncOperation;

    readonly Device: ANativeDevice;

    readonly User: ANativeUser<any>;
}

export const InfrastructureFactory = new _InfrastructureFactory();
export const NativeFactory = new _NativeFactory();