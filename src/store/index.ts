import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/products';
import { productDetailsReducer } from './slices/productDetails';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
