type ExtraOption = {
  name: string;
  price: number;
};

type Extra = {
  maxQuantity: number;
  minQuantity: number;
  name: string;
  itens: ExtraOption[];
  obrigatory: boolean;
};

export type OrderItemExtra = {
  [categoryName: string]: {
    extraName: string;
    quantity: number;
    price: number;
  }[];
};

export type ItemOrder = {
  productId: number;
  quantity: number;
  extras: OrderItemExtra[];
};

export { Extra, ExtraOption };
