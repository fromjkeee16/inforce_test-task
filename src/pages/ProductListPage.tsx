import { useAppDispatch, useAppSelector } from '../store/hooks';
import { SortProducts } from '../helpers/SortProducts';
import { SortingOrder } from '../enums/sortingOrder';
import { ProductList } from '../components/blocks/ProductList';
import { useState } from 'react';
import { ProductForm } from '../components/blocks/ProductForm';
import type { Product } from '../types/product';
import { addProduct } from '../store/slices/products';
import { Modal } from '../components/blocks/Modal';
import { Button } from '../components/elements/Button';

export const ProductListPage: React.FC = () => {
  const { products, loading, error } = useAppSelector(state => state.products);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occured! {error}</p>;
  }

  const list = SortProducts({ list: products, order: SortingOrder.ASC });

  const handleFormSubmit = async (data: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      dispatch(addProduct(data)).unwrap();
      setIsFormOpen(false);
    } catch (e) {
      setErrorMessage(
        (e as Error).message ||
          'Unexpected error occured while adding a product!',
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Button onClick={() => setIsFormOpen(prev => !prev)}>
        Add a product
      </Button>
      <Modal isOpen={isFormOpen}>
        <ProductForm
          errorMessage={errorMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      <ProductList list={list} />
    </div>
  );
};
