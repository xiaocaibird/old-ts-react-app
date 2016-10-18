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


export const InfrastructureFactory = new _InfrastructureFactory();
export const WebFactory = new _WebFactory();
