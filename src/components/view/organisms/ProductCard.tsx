import React, {type FC, type ReactElement} from 'react';

import {
  Box,
  Card,
  FastImage,
  HStack,
  Icon,
  IconButton,
  Text,
} from '../../../components';
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
      <HStack mt={5} justifyContent="space-between">
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
