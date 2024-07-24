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
  image: z.array(z.any().optional()),
});

export type ProductSchema = z.infer<typeof productDetailSchema>;

export type ItemDetailsProps = {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
};

export { productDetailSchema, MAX_IMAGES_COUNT };
