import { SortingOrder } from '../enums/sortingOrder';
import type { Product } from '../types/product';

type Props = {
  list: Product[];
  order?: SortingOrder;
};

export const SortProducts = ({ list, order = SortingOrder.ASC }: Props) => {
  const products = [...list].sort((product1, product2) => {
    const firstName = product1.name;
    const secondName = product2.name;

    return firstName.localeCompare(secondName);
  });

  if (order === SortingOrder.DESC) {
    products.reverse();
  }

  return products;
};
