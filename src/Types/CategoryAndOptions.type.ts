export type Category = {
  name: string;
  min: number;
  max: number;
  obrigatory: boolean;
  extras: Category[];
};

export type Option = {
  name: string;
  price: number;
};
