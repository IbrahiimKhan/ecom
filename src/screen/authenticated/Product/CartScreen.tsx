/* eslint-disable react/no-unstable-nested-components */
import {FlashList} from '@shopify/flash-list';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  CartCard,
  ContentSafeAreaView,
  Header,
  Screen,
  Text,
} from '../../../components';
import {useHeader} from '../../../hooks/useHeader';
import {removeFromCart} from '../../../store/slices/productSlice';
import {AppDispatch, RootState} from '../../../store/store';
import {CartItem} from '../../../types/product';

interface CartScreenProps {}

export const CartScreen: FC<CartScreenProps> = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.product.cart);

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
        <Header.BackAction />
        <Header.Content title="Cart Items" />
        <Box />
      </Header>
    );
  };

  useHeader(CartScreenHeader);

  const renderProductCard = ({item}: {item: CartItem}) => (
    <CartCard
      product={item}
      onRemove={() => dispatch(removeFromCart(item.id))}
    />
  );

  return (
    <Screen preset="auto" safeAreaEdges={['bottom']} loading={loading}>
      <ContentSafeAreaView gap={6}>
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
      </ContentSafeAreaView>
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  badgeText: {position: 'absolute', right: -10, top: -5},
});
