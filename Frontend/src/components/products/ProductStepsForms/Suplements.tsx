import { Product } from '@/types/Product.type';
import { z } from 'zod';

const optionsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser um valor positivo'),
});

const extraOptionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  obrigatory: z.boolean(),
  min: z.number().min(0, 'Mínimo deve ser um valor positivo'),
  max: z.number().min(0, 'Máximo deve ser um valor positivo'),
  itens: z
    .array(optionsSchema)
    .min(1, 'Cada Categoria deve ter pelo menos um item'),
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
