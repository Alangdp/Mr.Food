import { Product } from '@/types/Product.type';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const MAX_IMAGES_COUNT = 5;

const productDetailSchema = z.object({
  category: z.string().min(1, 'A categoria é obrigatória.'),
  name: z.string().min(1, 'A categoria é obrigatória.'),
  describe: z.string().min(1, 'A categoria é obrigatória.'),
  image: z.array(
    z
      .any()
      .refine(file => file?.size <= MAX_FILE_SIZE, {
        message: 'O tamanho máximo da imagem é 5MB.',
      })
      .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.',
      })
      .optional(),
  ),
});

export type ProductSchema = z.infer<typeof productDetailSchema>;

export type ItemDetailsProps = {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
};

export { productDetailSchema, MAX_IMAGES_COUNT };
