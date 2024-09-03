import React, {type FC, type ReactElement} from 'react';

import {
  Box,
  Card,
  FastImage,
  HStack,
  Icon,
  Text,
  VStack,
} from '../../../components';
import {type Product} from '../../../types/product';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: FC<ProductCardProps> = ({product}): ReactElement => {
  console.log(product.images[0]);
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
      <Text numberOfLines={2} variant="b4medium" letterSpacing={1} mt={5}>
        {product.title ?? ''}
      </Text>
      <HStack mt={5} justifyContent="space-between">
        <Text variant="b3regular">${product.price ?? ''}</Text>
        <Icon
          icon="add-shopping-cart"
          color="primary"
          type="material"
          variant="vector"
        />
      </HStack>
    </Card>
  );
};

export default ProductCard;
