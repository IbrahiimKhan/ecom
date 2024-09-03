/* eslint-disable react/no-unstable-nested-components */
import {FlashList} from '@shopify/flash-list';
import React, {FC, ReactElement, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  ContentSafeAreaView,
  Header,
  ProductCard,
  Screen,
  Text,
} from '../../../components';
import {useHeader} from '../../../hooks/useHeader';
import {addToCart, fetchProducts} from '../../../store/slices/productSlice';
import {AppDispatch, RootState} from '../../../store/store';
import {useNavigation} from '@react-navigation/native';
import ProductFilter from '../../../components/view/molecules/ProductFilter';

interface ProductScreenProps {}

export const ProductScreen: FC<ProductScreenProps> = (): ReactElement => {
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const {products, status, error} = useSelector(
    (state: RootState) => state.product,
  );

  const {filteredProducts} = useSelector((state: RootState) => state.product);

  const cartLength = useSelector(
    (state: RootState) => state.product.cart.length,
  );

  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category)),
  );

  const handleAddToCart = (productId: number) => {
    const product = products.find(prod => prod.id === productId);
    if (product) {
      dispatch(addToCart(product));
    }
  };

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
        <Box />
        <Header.Content title="All Products" />
        <Box>
          <Header.Action
            icon="cart"
            variant="vector"
            color="primary"
            type="materialCommunity"
            onPress={() => navigation.navigate('Cart')}
            size={7}
          />
          <Text fontWeight="bold" style={styles.badgeText}>
            {cartLength}
          </Text>
        </Box>
      </Header>
    );
  };

  useHeader(ProductScreenHeader);

  const renderProductCard = ({item}: {item: any}) => (
    <ProductCard product={item} handleAddToCart={id => handleAddToCart(id)} />
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
            <Text variant="b2bold" color="danger">
              Error: {error}
            </Text>
          </Box>
        ) : (
          <>
            <ProductFilter categories={uniqueCategories} />
            <FlashList
              data={filteredProducts.length > 0 ? filteredProducts : products}
              renderItem={renderProductCard}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={200}
              ListEmptyComponent={
                <Box flex={1} justifyContent="center" alignItems="center">
                  <Text>No Products Available</Text>
                </Box>
              }
            />
          </>
        )}
      </ContentSafeAreaView>
    </Screen>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  badgeText: {position: 'absolute', right: -10, top: -5},
});
