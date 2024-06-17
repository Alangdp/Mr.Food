export interface OrderProps {
  id: string;
  clientId: number;
  companyId?: number;
  items: ProductProps[];
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
}

type ExtraOption = {
  name: string;
  price: number;
}

type Extra = {
  [extraName: string]: {
    options: ExtraOption[];
    maxQuantity: number;
    minQuantity: number;
  };
}
