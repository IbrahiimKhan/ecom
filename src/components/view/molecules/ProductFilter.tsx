import React, {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {filterByCategory} from '../../../store/slices/productSlice';
import theme from '../../../theme';
import {Text} from '../../ui/Text';
import Clickable from '../../ui/forms/Clickable';

interface ProductFilterProps {
  categories: string[];
}

const ProductFilter: FC<ProductFilterProps> = ({categories}) => {
  const dispatch = useDispatch();

  const handleFilterByCategory = (category: string) => {
    dispatch(filterByCategory(category));
  };

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {categories.map(category => (
          <Clickable
            style={styles.clickable}
            key={category}
            onPress={() => handleFilterByCategory(category)}>
            <Text color="white" variant="b2semiBold">
              {category}
            </Text>
          </Clickable>
        ))}
      </ScrollView>
    </>
  );
};

export default ProductFilter;

const styles = StyleSheet.create({
  clickable: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing[5],
    paddingVertical: theme.spacing[4],
    marginRight: theme.spacing[5],
    borderRadius: theme.spacing[3],
  },
});
