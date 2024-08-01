import { ProductResponse } from '@/types/Product.type';

export type ExtraOptionsSelected = {
  [key: string]: {
    selectedOptions: string[];
    extraValue: number;
  };
};

export type CartProduct = {
  id: string;
  name: string;
  priceWithoutExtras: number;
  priceWithExtras: number;
  selectedProduct: ProductResponse;
  extras: ExtraOptionsSelected;
  quantity: number;
};

export type Cart = {
  products: CartProduct[];
  total: number;
};
