import type { Product } from '../../types/product';
import type { Comment } from '../../types/comment';
import { api } from '../../api/axios';

// #region products

// products API

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get(`/products`);
  return res.data;
};

export const getProductById = async (id: number | string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const addProduct = async (
  product: Omit<Product, 'id'>,
): Promise<Product> => {
  const res = await api.post(`/products`, product);
  return res.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const res = await api.put(`/products/${product.id}`, product);
  return res.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};

// #endregion
// #region comments

export const getCommentsByProductId = async (
  productId: number,
): Promise<Comment[]> => {
  const res = await api.get(`/comments?productId=${productId}`);
  return res.data;
};

export const addComment = async (
  comment: Omit<Comment, 'id'>,
): Promise<Comment> => {
  const res = await api.post(`/comments`, comment);
  return res.data;
};

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comments/${id}`);
};

// #endregion
