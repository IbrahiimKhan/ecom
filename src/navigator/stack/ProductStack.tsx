/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreen from '../../screen/authenticated/Product/ProductScreen';

const Stack = createNativeStackNavigator();

export const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};
