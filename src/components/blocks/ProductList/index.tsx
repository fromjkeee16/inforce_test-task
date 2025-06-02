import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import type { Product } from '../../../types/product';
import { Modal } from '../Modal';
import { ProductCard } from '../ProductCard';
import styles from './index.module.scss';
import { Button } from '../../elements/Button';
import { deleteProduct } from '../../../store/slices/products';

type Props = {
  list: Product[];
};

export const ProductList: React.FC<Props> = ({ list }) => {
  const dispatch = useAppDispatch();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDelete = () => {
    dispatch(deleteProduct(selectedId!));
  };

  return (
    <div className={styles.list}>
      {list.map(product => (
        <div key={product.id} className={styles.list__item}>
          <ProductCard
            product={product}
            onDeleteClick={() => setSelectedId(product.id)}
          />
        </div>
      ))}
      <Modal isOpen={selectedId !== null}>
        <p>Are you sure you want to delete this product?</p>
        <div className={styles.modal_controls}>
          <Button
            onClick={handleDelete}
            className={styles.modal_controls__confirm}
          >
            Yes
          </Button>
          <Button onClick={() => setSelectedId(null)}>No</Button>
        </div>
      </Modal>
    </div>
  );
};
