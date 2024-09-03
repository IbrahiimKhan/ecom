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
  totalItems: 0,
  totalAmount: 0,
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

export const loadCart = createAsyncThunk('products/loadCart', async () => {
  const cart = await AsyncStorage.getItem('cart');
  return cart ? (JSON.parse(cart) as CartItem[]) : [];
});

const saveCart = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
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
      saveCart(state.cart);
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      saveCart(state.cart);
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
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
      state.totalItems = 0;
      state.totalAmount = 0;
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
        state.totalItems = state.cart.reduce(
          (total, item) => total + item.quantity,
          0,
        );
        state.totalAmount = state.cart.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );
      });
  },
});

export const {addToCart, removeFromCart, filterByCategory, clearCart} =
  productSlice.actions;

export default productSlice.reducer;
