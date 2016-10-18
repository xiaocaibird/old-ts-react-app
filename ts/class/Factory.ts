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

import { AWebApp } from './web/App';
import { AWebStorage } from './web/Storage';
import { AWebRedux } from './web/Redux';
import { AWebRequest } from './web/Request';
import { AWebPrompt } from './web/Prompt';
import { AWebNavigation } from './web/Navigation';
import { AWebErrorHandler } from './web/Error';
import { AWebAsyncOperation } from './web/AsyncOperation';
import { AWebDevice } from './web/Device';
import { AWebUser } from './web/User';

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

class _WebFactory extends _InfrastructureFactory {
    readonly App: AWebApp<any, any>;

    readonly Storage: AWebStorage;

    readonly Redux: AWebRedux<any, any>;

    readonly Request: AWebRequest;

    readonly Prompt: AWebPrompt;

    readonly Navigation: AWebNavigation;

    readonly ErrorHandler: AWebErrorHandler;

    readonly AsyncOperation: AWebAsyncOperation;

    readonly Device: AWebDevice;

    readonly User: AWebUser<any>;
}

class _Factory extends _WebFactory {
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
export const WebFactory = new _WebFactory();
export const Factory = new _Factory();