/* eslint-disable react/no-unstable-nested-components */
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {
  Box,
  ContentSafeAreaView,
  Header,
  HStack,
  ProductCard,
  Screen,
  Text,
} from '../../../components';
import {useHeader} from '../../../hooks/useHeader';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../../store/slices/productSlice';
import {AppDispatch, RootState} from '../../../store/store';
import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator} from 'react-native';

interface ProductScreenProps {}

export const ProductScreen: FC<ProductScreenProps> = (): ReactElement => {
  const [loading, setLoading] = useState(true);

  const dispatch: AppDispatch = useDispatch();
  const {products, status, error} = useSelector(
    (state: RootState) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const renderProductCard = ({item}: {item: any}) => (
    <ProductCard product={item} />
  );

  return (
    <Screen preset="auto" safeAreaEdges={['bottom']} loading={loading}>
      <ContentSafeAreaView gap={6}>
        {status === 'loading' ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" />
          </Box>
        ) : status === 'failed' ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text variant="b2bold">Error: {error}</Text>
          </Box>
        ) : (
          <FlashList
            data={products}
            renderItem={renderProductCard}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            estimatedItemSize={200}
            contentContainerStyle={{paddingHorizontal: 16}}
            ListEmptyComponent={
              <Box flex={1} justifyContent="center" alignItems="center">
                <Text>No Products Available</Text>
              </Box>
            }
          />
        )}
      </ContentSafeAreaView>
    </Screen>
  );
};

export default ProductScreen;
