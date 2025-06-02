import { HashRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components/layouts/MainLayout';
import { ProductListPage } from '../pages/ProductListPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

export const Router: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ProductListPage />} index />
        <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
      </Route>
    </Routes>
  </HashRouter>
);
