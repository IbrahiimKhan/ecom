/* eslint-disable react/no-unstable-nested-components */
import {FlashList} from '@shopify/flash-list';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Card,
  CartCard,
  CartTotalCard,
  ContentSafeAreaView,
  Header,
  HStack,
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
  const totalItems = useSelector(
    (state: RootState) => state.product.totalItems,
  );
  const totalAmount = useSelector(
    (state: RootState) => state.product.totalAmount,
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
    <Screen
      preset="auto"
      safeAreaEdges={['bottom']}
      loading={loading}
      contentContainerStyle={{flex: 1}}>
      <ContentSafeAreaView gap={6} flex={1}>
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
              <Text variant="heading2" color="warning">
                No Products Available
              </Text>
            </Box>
          }
        />

        <CartTotalCard totalItems={totalItems} totalAmount={totalAmount} />
      </ContentSafeAreaView>
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  badgeText: {position: 'absolute', right: -10, top: -5},
});
