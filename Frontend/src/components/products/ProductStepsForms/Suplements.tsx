import { Product } from '@/types/Product.type';
import { z } from 'zod';

const extraOptionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser um valor positivo'),
  maxQuantity: z
    .number()
    .min(1, 'Quantidade máxima deve ser pelo menos 1')
    .default(1),
  minQuantity: z
    .number()
    .min(0, 'Quantidade mínima deve ser pelo menos 0')
    .default(1),
  categoryId: z.string().nonempty('Categoria é obrigatória'),
});

const productSuplementSchema = z.object({
  extras: z.array(extraOptionSchema),
});

const categorySchema = z.object({
  name: z.string().min(4, {
    message: 'Nome deve ter no mínimo 4 caracteres',
  }),
});

export type ProductSuplementSchema = z.infer<typeof productSuplementSchema>;
export type CategoryType = z.infer<typeof categorySchema>;
export type ProductSuplementsProps = {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
  saveProduct: () => Promise<boolean>;
};

export { categorySchema, productSuplementSchema };
