export interface Product {
  name: string;
  category: string;
  describe: string;
  image?: File;
  price: number;
  discount?: number;
}
