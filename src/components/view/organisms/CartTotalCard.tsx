import React from 'react';
import Card from '../../ui/Card';
import {Box} from '../../ui/layout/Box';
import HStack from '../../ui/layout/HStack';
import {Text} from '../../ui/Text';

interface CartTotalCardProps {
  totalItems: number;
  totalAmount: number;
}

export const CartTotalCard: React.FC<CartTotalCardProps> = ({
  totalItems,
  totalAmount,
}) => {
  return (
    <Box>
      <Card paddingHorizontal={5}>
        <Text variant="heading1" textAlign="center">
          Cart Summary
        </Text>
        <HStack my={5} flex={1} justifyContent="space-between">
          <Text variant="heading3">Total Items:</Text>
          <Text variant="heading3" color="primary" fontWeight="bold">
            {totalItems}
          </Text>
        </HStack>
        <HStack my={5} flex={1} justifyContent="space-between">
          <Text variant="heading3" color="black" fontWeight="bold">
            Total Amount:
          </Text>
          <Text variant="heading3" color="primary" fontWeight="bold">
            {totalAmount.toFixed(2)}
          </Text>
        </HStack>
      </Card>
    </Box>
  );
};

export default CartTotalCard;
