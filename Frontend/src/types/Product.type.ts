import { ExtraOption } from '@/components/product/Cart.type';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export interface ProductResponse {
  id: number;
  companyId: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  discountPercent: number;
  active: boolean;
  extras: Extra[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Extra {
  max: number;
  min: number;
  name: string;
  itens: Item[];
  obrigatory: boolean;
}

export interface Item {
  name: string;
  price: number;
}

export interface Product {
  id: number;
  companyId: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  discountPercent: number;
  active: boolean;
  extras: Extra[];
  createdAt: string;
  updatedAt: string;
  images: string[];
}
const optionsSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  price: z.number().min(0, 'Preço deve ser um valor positivo'),
});

const extraOptionSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  obrigatory: z.boolean(),
  min: z.number().min(0, 'Mínimo deve ser um valor positivo'),
  max: z.number().min(0, 'Máximo deve ser um valor positivo'),
  itens: z.array(optionsSchema),
});

const ProductCompleteValidation = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  describe: z.string().min(1, 'A descrição é obrigatória.'),
  image: z.any().optional(),
  price: z.number().int().positive('O preço deve ser positivo.'),
  discount: z
    .number()
    .int()
    .min(0, 'O desconto deve ser positivo.')
    .max(100, 'O desconto deve ser menor que 100.'),
  extras: z.array(extraOptionSchema),
});

const keyToPortugueseMapping: Record<string, string> = {
  category: 'Categoria',
  name: 'Nome',
  describe: 'Descrição',
  image: 'Imagem',
  price: 'Preço',
  discount: 'Desconto',
  extras: 'Extras',
};

function getPortugueseName(key: string): string {
  return keyToPortugueseMapping[key] || key;
}

export { ProductCompleteValidation, getPortugueseName };
