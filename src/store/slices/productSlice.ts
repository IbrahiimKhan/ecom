import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProducts} from '../../api/product';
import {CartItem, Product, ProductState} from '../../types/product';

// Initial state
const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  cart: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },
);

// Load cart from AsyncStorage
export const loadCart = createAsyncThunk('products/loadCart', async () => {
  const cart = await AsyncStorage.getItem('cart');
  return cart ? (JSON.parse(cart) as CartItem[]) : [];
});

// Save cart to AsyncStorage
const saveCart = async (cart: CartItem[]) => {
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
      saveCart(state.cart); // Persist cart to AsyncStorage
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      saveCart(state.cart); // Persist cart to AsyncStorage
    },
    filterByPrice: (
      state,
      action: PayloadAction<{min: number; max: number}>,
    ) => {
      state.filteredProducts = state.products.filter(
        product =>
          product.price >= action.payload.min &&
          product.price <= action.payload.max,
      );
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.filteredProducts = state.products.filter(
        product => product.category === action.payload,
      );
    },
    clearCart: state => {
      state.cart = [];
      saveCart(state.cart);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  filterByPrice,
  filterByCategory,
  clearCart,
} = productSlice.actions;

export default productSlice.reducer;
