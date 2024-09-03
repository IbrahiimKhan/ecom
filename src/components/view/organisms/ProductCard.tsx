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
  const {title, image, actualPrice, discountPrice} = product;
  const discountPercentage = Math.floor(
    ((actualPrice - discountPrice) / actualPrice) * 100,
  );

  return (
    <Card padding={5} flex={1}>
      <Box alignItems="center">
        <FastImage
          resizeMode="contain"
          height={100}
          width={100}
          source={{
            uri: image,
          }}
        />
      </Box>
      <Text numberOfLines={2} variant="b4medium" letterSpacing={1} mt={5}>
        {title}
      </Text>
      <VStack mt={5}>
        <HStack gap={4}>
          <Text variant="b3bold">{discountPrice}</Text>
          <Text variant="b5regular" textDecorationLine="line-through">
            {actualPrice}
          </Text>
          <Text color="primary" variant="b5bold">
            {discountPercentage}% off
          </Text>
        </HStack>
        <HStack alignItems="center" my={3} gap={3}>
          <Icon variant="vector" type="fa5" icon="tag" size={5} />
          <Text variant="b5regular">Exchange Offer & more </Text>
        </HStack>
      </VStack>
    </Card>
  );
};

export default ProductCard;
