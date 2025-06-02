import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/product';
import { DescriptionField } from '../DescriptionField';
import styles from './index.module.scss';
import { Button } from '../../elements/Button';

type Props = {
  product: Product;
  onDeleteClick: () => void;
};

export const ProductCard: React.FC<Props> = ({ product, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img
        src={product.imageUrl}
        alt={`${product.name} image`}
        className={styles.card__image}
      />
      <p className={styles.card__title}>{product.name}</p>
      <DescriptionField label="Quantity" value={product.count} />
      <div className={styles.card__characteristics}>
        <DescriptionField label="Width" value={product.size.width} />
        <DescriptionField label="Height" value={product.size.height} />
        <DescriptionField label="Weight" value={product.weight} />
      </div>
      <div className={styles.card__controls}>
        <Button
          onClick={() => navigate(`/product/${product.id}`)}
          className={styles.card__link}
        >
          Go to product
        </Button>
        <Button className={styles.card__button} onClick={onDeleteClick}>
          delete
        </Button>
      </div>
    </div>
  );
};
