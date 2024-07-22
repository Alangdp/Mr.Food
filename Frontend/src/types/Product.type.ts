import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export interface Product {
  name: string;
  category: string;
  describe: string;
  image?: File;
  price: number;
  discount?: number;
  extras: Option[];
}

type ExtraOption = {
  name: string;
  price: number;
  maxQuantity: number;
  minQuantity: number;
  categoryId: string;
};

const extraOptionSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
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

const ProductCompleteValidation = z.object({
  category: z.string().nonempty('A categoria é obrigatória.'),
  name: z.string().nonempty('O nome é obrigatório.'),
  describe: z.string().nonempty('A descrição é obrigatória.'),
  image: z
    .any()
    .refine(file => file?.size <= MAX_FILE_SIZE, {
      message: 'O tamanho máximo da imagem é 5MB.',
    })
    .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: 'Apenas os formatos .jpg, .jpeg, .png e .webp são suportados.',
    })
    .optional(),
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

export interface ProductResponse {
  createdAt: string;
  updatedAt: string;
  active: boolean;
  id: number;
  companyId: number;
  categoryId: number;
  name: string;
  price: string;
  extras: Extras;
  description: string;
  discountPercent: number;
}

export interface Extras {
  options: Option[];
}

export interface Option {
  name: string;
  price: number;
  categoryId: string;
  maxQuantity: number;
  minQuantity: number;
}
