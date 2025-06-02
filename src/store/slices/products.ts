import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import {
  getProducts,
  addProduct as addProductFunc,
  deleteProduct as deleteProductFunc,
} from '../../features/products/productAPI';

type InitialState = {
  products: Product[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  products: [],
  loading: true,
  error: '',
};

export const loadProducts = createAsyncThunk<Product[]>('products/fetch', () =>
  getProducts(),
);

export const addProduct = createAsyncThunk<Product, Omit<Product, 'id'>>(
  'products/add',
  newProduct => addProductFunc(newProduct),
);

export const deleteProduct = createAsyncThunk<number, number>(
  'products/delete',
  async productId => {
    await deleteProductFunc(productId);
    return productId;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addProduct.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteProduct.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const productsReducer = productsSlice.reducer;
