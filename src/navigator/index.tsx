import React, {ReactElement} from 'react';
import {ProductStack} from './stack/ProductStack';
import {NavigationContainer} from '@react-navigation/native';

export const Navigator = (): ReactElement => {
  return (
    <NavigationContainer>
      <ProductStack />
    </NavigationContainer>
  );
};

export default Navigator;
