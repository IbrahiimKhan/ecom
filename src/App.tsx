import React from 'react';
import Navigator from './navigator';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';
import {Provider} from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
