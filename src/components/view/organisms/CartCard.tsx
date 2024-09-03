import React, {FC, ReactElement} from 'react';
import {CartItem} from '../../../types/product';
import Card from '../../ui/Card';
import HStack from '../../ui/layout/HStack';
import {FastImage} from '../../ui/icons/FastImage';
import VStack from '../../ui/layout/VStack';
import Icon from '../../ui/icons/Icon';
import IconButton from '../../ui/icons/IconButton';
import {Text} from '../../ui/Text';

type CartCardProps = {
  product: CartItem;
  onRemove: () => void;
};

export const CartCard: FC<CartCardProps> = ({
  product,
  onRemove,
}): ReactElement => {
  return (
    <Card>
      <HStack>
        <FastImage
          resizeMode="contain"
          height={90}
          width={90}
          source={{
            uri: product.images[0],
          }}
        />
        <VStack justifyContent="space-between" flex={1}>
          <HStack justifyContent="space-between" flex={1} mr={3}>
            <Text variant="b4semiBold">{product?.title ?? ''}</Text>
            <HStack gap={5}>
              <IconButton
                variant="vector"
                type="material"
                icon="delete"
                color="danger"
                iconStyle="contained"
                onPress={onRemove}
              />
              <IconButton
                variant="vector"
                type="ant"
                icon="eye"
                color="primary"
                iconStyle="contained"
              />
            </HStack>
          </HStack>
          <HStack justifyContent="space-between" mr={4}>
            <HStack>
              <Icon type="entypo" variant="vector" icon="cross" />
              <Text variant="heading3">{product.quantity}</Text>
            </HStack>
            <Text variant="heading1" fontWeight="bold">
              ${product.price}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};

export default CartCard;
