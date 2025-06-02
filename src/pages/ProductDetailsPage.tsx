import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addNewComment,
  clearProductDetails,
  fetchComments,
  fetchProductById,
  updateCurrentProduct,
} from '../store/slices/productDetails';
import { CommentForm } from '../components/blocks/CommentForm';
import type { Comment } from '../types/comment';
import { CommentList } from '../components/blocks/CommentsList';
import { Modal } from '../components/blocks/Modal';
import { ProductForm } from '../components/blocks/ProductForm';
import type { Product } from '../types/product';
import { loadProducts } from '../store/slices/products';
import styles from './productDetailsPage.module.scss';
import { Button } from '../components/elements/Button';
import { DescriptionField } from '../components/blocks/DescriptionField';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id as string;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { product, loading, error, comments, commentsLoading, commentsError } =
    useAppSelector(state => state.productDetails);

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(productId));
    dispatch(fetchComments(productId));

    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, productId]);

  const handleAddComment = (data: Pick<Comment, 'description'>) => {
    dispatch(
      addNewComment({
        productId,
        description: data.description,
        date: new Date().toISOString(),
      }),
    );
  };

  const handleEditProduct = async (data: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await dispatch(
        updateCurrentProduct({
          id: productId,
          ...data,
        }),
      ).unwrap();
      setIsEditing(false);
      dispatch(loadProducts());
    } catch (e) {
      setErrorMessage(
        (e as Error).message ||
          'Unknown error occured while updating the product',
      );
    } finally {
      setIsSubmitting(false);
    }
    setIsEditing(false);
  };

  if (loading) return <p>Loading product...</p>;

  if (error || !product) {
    return (
      <>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>

        {error && <p>Error loading product: {error}</p>}
        {!product && <p>Product not found</p>}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <div className={styles.productCard}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <img
          className={styles.productImage}
          src={product.imageUrl}
          alt={`${product.name} photo`}
        />
        <DescriptionField label="Quantity" value={product.count} />
        <DescriptionField label="Width" value={product.size.width} />
        <DescriptionField label="Height" value={product.size.height} />
        <DescriptionField label="Weight" value={product.weight} />

        <Button
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
        >
          edit product
        </Button>
      </div>

      <section className={styles.commentsSection}>
        <h2>Comments</h2>

        {commentsLoading && (
          <p className={styles.loadingText}>Loading comments...</p>
        )}
        {commentsError && (
          <p className={styles.errorText}>
            Error loading comments: {commentsError}
          </p>
        )}

        {!commentsLoading && !comments.length && (
          <p className={styles.loadingText}>No comments yet</p>
        )}

        <CommentList list={comments} />

        <CommentForm onSubmit={handleAddComment} onCancel={() => {}} />
      </section>

      <Modal isOpen={isEditing}>
        <ProductForm
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleEditProduct}
          initialData={product}
        />
      </Modal>
    </div>
  );
};
