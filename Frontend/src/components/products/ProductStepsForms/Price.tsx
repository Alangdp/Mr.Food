import { Product } from '@/types/Product.type';
import { z } from 'zod';

const productPriceForm = z.object({
  price: z.number().positive('O preço deve ser positivo.'),
  discount: z
    .number()
    .min(0, 'O desconto deve ser positivo.')
    .max(100, 'O desconto deve ser menor que 100.'),
});

export type ProductPriceSchema = z.infer<typeof productPriceForm>;

export type ProductPriceProps = {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
};

export { productPriceForm };
