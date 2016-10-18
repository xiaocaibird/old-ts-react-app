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

import { App } from './project/App';
import { Storage } from './project/Storage';
import { Redux } from './project/Redux';
import { Request } from './project/Request';
import { Prompt } from './project/Prompt';
import { Navigation } from './project/Navigation';
import { ErrorHandler } from './project/Error';
import { AsyncOperation } from './project/AsyncOperation';
import { Device } from './project/Device';
import { User } from './project/User';

class _InfrastructureFactory {
    readonly App: AApp<any, any> = App.instance;

    readonly Storage: AStorage = Storage.instance;

    readonly Redux: ARedux<any, any> = Redux.instance;

    readonly Request: ARequest = Request.instance;

    readonly Prompt: APrompt = Prompt.instance;

    readonly Navigation: ANavigation<any, any> = Navigation.instance;

    readonly ErrorHandler: AErrorHandler = ErrorHandler.instance;

    readonly AsyncOperation: AAsyncOperation = AsyncOperation.instance;

    readonly Device: ADevice = Device.instance;

    readonly User: AUser<any> = User.instance;
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

class _Factory extends _NativeFactory {
    readonly App: App;

    readonly Storage: Storage;

    readonly Redux: Redux;

    readonly Request: Request;

    readonly Prompt: Prompt;

    readonly Navigation: Navigation;

    readonly ErrorHandler: ErrorHandler;

    readonly AsyncOperation: AsyncOperation;

    readonly Device: Device;

    readonly User: User;
}

export const InfrastructureFactory = new _InfrastructureFactory();
export const NativeFactory = new _NativeFactory();
export const Factory = new _Factory();