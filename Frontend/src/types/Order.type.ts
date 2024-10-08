import { ItemOption } from './OrderResponse.type';
import { Option } from './Product.type';

// export interface OrderProps {
//   id: string;
//   clientId: number;
//   companyId?: number;
//   items: ProductProps[];
//   status: string;
//   total: number;
//   observation: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface OrderProps {
  id: string;
  clientId: number;
  companyId: number;
  items: ItemOption[];
  status: string;
  total: number;
  observation: string;
  createdAt: Date;
  updatedAt: Date;
}

type ProductProps = {
  name: string;
  companyId?: number;
  categoryId?: number;
  description: string;
  price: number;
  discountPercent: number;
  quantity?: number;
  active: boolean;
  extras: Extra;
};

type Extra = {
  [extraName: string]: {
    options: Option[];
    maxQuantity: number;
    minQuantity: number;
  };
};
