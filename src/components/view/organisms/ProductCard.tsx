import React, {type FC, type ReactElement} from 'react';

import {StyleSheet} from 'react-native';
import {
  Box,
  Card,
  FastImage,
  HStack,
  IconButton,
  Text,
} from '../../../components';
import theme from '../../../theme';
import {type Product} from '../../../types/product';

type ProductCardProps = {
  product: Product;
  handleAddToCart: (id: number) => void;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  handleAddToCart,
}): ReactElement => {
  return (
    <Card padding={5} flex={1} margin={3}>
      <Box alignItems="center">
        <FastImage
          resizeMode="contain"
          height={100}
          width={100}
          source={{
            uri: product.images[0],
          }}
        />
      </Box>
      <Text numberOfLines={2} variant="b3medium" letterSpacing={1} mt={5}>
        {product.title ?? ''}
      </Text>
      <Text style={styles.category}>{product.category}</Text>
      <HStack mt={1} justifyContent="space-between">
        <Text variant="heading1">${product.price ?? ''}</Text>
        <IconButton
          onPress={() => handleAddToCart(product.id)}
          icon="add-shopping-cart"
          color="primary"
          type="material"
          iconStyle="contained"
          variant="vector"
          size={9}
        />
      </HStack>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  category: {
    backgroundColor: theme.colors.warning,
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing[4],
    borderRadius: theme.spacing[5],
    marginTop: theme.spacing[2],
  },
});
