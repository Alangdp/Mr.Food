import { SuplementCategory } from '@/types/SuplementCategory.type';
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormReturn,
  UseFieldArrayRemove,
} from 'react-hook-form';

export type RegisterProductSuplementsTabProps = {
  hasSuplements: boolean;
  fields: FieldArrayWithId<
    {
      extras: {
        name: string;
        price: number;
        maxQuantity: number;
        minQuantity: number;
        categoryId: string;
      }[];
    },
    'extras',
    'id'
  >[];
  append: UseFieldArrayAppend<
    {
      extras: {
        name: string;
        price: number;
        maxQuantity: number;
        minQuantity: number;
        categoryId: string;
      }[];
    },
    'extras'
  >;
  productForm: UseFormReturn<
    {
      extras: {
        name: string;
        price: number;
        maxQuantity: number;
        minQuantity: number;
        categoryId: string;
      }[];
    },
    any,
    undefined
  >;
  remove: UseFieldArrayRemove;
  complementsCategories: SuplementCategory[];
  categoryForm: UseFormReturn<
    {
      name: string;
    },
    any,
    undefined
  >;
  setSelectedFunction: (value: string) => void;
};
