/* eslint-disable react/no-unstable-nested-components */
import React, {type FC, type ReactElement, useEffect, useState} from 'react';

import {
  Box,
  ContentSafeAreaView,
  Header,
  HStack,
  ProductCard,
  Screen,
} from '../../../components';
import {useHeader} from '../../../hooks/useHeader';

interface ProductScreenProps {}

export const ProductScreen: FC<ProductScreenProps> = (): ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const ProductScreenHeader = (): ReactElement => {
    if (loading) {
      return <Box />;
    }
    return (
      <Header>
        <Header.BackAction />
        <Header.Content title="Products" />
        <Header.Action
          icon="home"
          variant="vector"
          type="ant"
          onPress={() => {}}
          size={7}
        />
      </Header>
    );
  };

  useHeader(ProductScreenHeader);

  return (
    <Screen preset="auto" safeAreaEdges={['bottom']} loading={loading}>
      <ContentSafeAreaView gap={6}>
        <HStack />
      </ContentSafeAreaView>
    </Screen>
  );
};

export default ProductScreen;
