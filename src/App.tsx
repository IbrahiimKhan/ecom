import React from 'react';
import Navigator from './navigator';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  );
};

export default App;
