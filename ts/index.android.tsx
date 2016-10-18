import * as React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';
import { baseNativeComponent} from './Component/base';
import { Factory as f } from './class/Factory';
import Root from './Component/Root';

try {
  type props = tCommon.reactProps;
  type state = tCommon.reactState;

  class App extends baseNativeComponent<props, state> {
    render() {
      return (
        <Provider store={f.Redux.Store}>
          <Root />
        </Provider>
      )
    }
  }

  AppRegistry.registerComponent('ycyios', () => App);
}
catch (e) {
  f.ErrorHandler.log(e);
  
  try {
    f.App.reset();
  }
  catch (e) {
    f.ErrorHandler.log(e);
  }
}
