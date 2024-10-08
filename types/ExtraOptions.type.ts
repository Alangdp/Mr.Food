export type ItemOption = {
  productName?: string;
  productTotalPrice?: number;
  productId: number;
  quantity: number;
  extras: Extra;
};

export type Extra = {
  [key: string]: OptionValue[];
};

export type OptionValue = {
  extraName: string;
  quantity: number;
  price: number;
};
