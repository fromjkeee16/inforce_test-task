import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { loadProducts } from '../../store/slices/products';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <div className={styles.mainlayout}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
