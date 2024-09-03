/* eslint-disable react/no-unstable-nested-components */
import {FlashList} from '@shopify/flash-list';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Card,
  CartCard,
  ContentSafeAreaView,
  Header,
  Screen,
  Text,
} from '../../../components';
import {useHeader} from '../../../hooks/useHeader';
import {addToCart, fetchProducts} from '../../../store/slices/productSlice';
import {AppDispatch, RootState} from '../../../store/store';
import {CartItem} from '../../../types/product';

interface CartScreenProps {}

export const CartScreen: FC<CartScreenProps> = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.product.cart);
  const {products, status, error} = useSelector(
    (state: RootState) => state.product,
  );
  const cartLength = useSelector(
    (state: RootState) => state.product.cart.length,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const CartScreenHeader = (): ReactElement => {
    if (loading) {
      return <Box />;
    }
    return (
      <Header>
        <Box />
        <Header.Content title="Cart Items" />
        <Box>
          <Header.Action
            icon="cart"
            variant="vector"
            color="primary"
            type="materialCommunity"
            onPress={() => {}}
            size={7}
          />
          <Text fontWeight="bold" style={styles.badgeText}>
            {cartLength}
          </Text>
        </Box>
      </Header>
    );
  };

  useHeader(CartScreenHeader);

  const renderProductCard = ({item}: {item: CartItem}) => (
    <CartCard product={item} />
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
            data={cartItems}
            renderItem={renderProductCard}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Box height={5} />}
            estimatedItemSize={200}
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

export default CartScreen;

const styles = StyleSheet.create({
  badgeText: {position: 'absolute', right: -10, top: -5},
});
