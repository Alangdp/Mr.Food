import { Extra } from "../types/product.type.js";

type ProductProps = {
  name: string;
  companyId: number;
  categoryId?: number;
  description: string;
  price: number;
  discountPercent: number;
  active: boolean;
  extras: Extra;
}

export { ProductProps };
