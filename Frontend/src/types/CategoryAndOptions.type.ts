export type Category = {
  name: string;
  min: number;
  max: number;
  obrigatory: boolean;
  extras: Category[];
};

export interface Option {
  name: string;
  price: number;
}
