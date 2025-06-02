import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product';
import type { Comment } from '../../types/comment';
import {
  getProductById,
  getCommentsByProductId,
  addComment,
  deleteComment,
  updateProduct,
} from '../../features/products/productAPI';

type ProductDetailsState = {
  product: Product | null;
  comments: Comment[];
  loading: boolean;
  error: string | null;
  commentsLoading: boolean;
  commentsError: string | null;
};

const initialState: ProductDetailsState = {
  product: null,
  comments: [],
  loading: true,
  error: null,
  commentsLoading: true,
  commentsError: null,
};

export const fetchProductById = createAsyncThunk<Product, Product['id']>(
  'productDetails/fetchProductById',
  id => getProductById(id),
);

export const fetchComments = createAsyncThunk<Comment[], number>(
  'productDetails/fetchComments',
  productId => getCommentsByProductId(productId),
);

export const addNewComment = createAsyncThunk<
  Comment,
  { productId: number; description: string; date: string }
>('productDetails/addComment', async ({ productId, description, date }) =>
  addComment({ productId, description, date }),
);

export const removeComment = createAsyncThunk<number, number>(
  'productDetails/deleteComment',
  async commentId => {
    await deleteComment(commentId);
    return commentId;
  },
);

export const updateCurrentProduct = createAsyncThunk<Product, Product>(
  'productDetails/updateProduct',
  async product => updateProduct(product),
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    clearProductDetails(state) {
      state.product = null;
      state.comments = [];
      state.loading = false;
      state.error = null;
      state.commentsLoading = false;
      state.commentsError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProductById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.product = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchComments.pending, state => {
        state.commentsLoading = true;
        state.commentsError = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.commentsLoading = false;
          state.comments = action.payload;
        },
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsLoading = false;
        state.commentsError = action.payload as string;
      })

      .addCase(
        addNewComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )

      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(c => c.id !== action.payload);
        },
      )

      .addCase(
        updateCurrentProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
        },
      );
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;
export const productDetailsReducer = productDetailsSlice.reducer;
