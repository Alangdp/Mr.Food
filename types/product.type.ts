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
export { Extra, ExtraOption };
