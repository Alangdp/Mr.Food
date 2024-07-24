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
        obrigatory: boolean;
        min: number;
        max: number;
        itens: {
          name: string;
          price: number;
        }[];
      }[];
    },
    'extras',
    'id'
  >[];
  append: UseFieldArrayAppend<
    {
      extras: {
        name: string;
        obrigatory: boolean;
        min: number;
        max: number;
        itens: {
          name: string;
          price: number;
        }[];
      }[];
    },
    'extras'
  >;
  productForm: UseFormReturn<
    {
      extras: {
        name: string;
        obrigatory: boolean;
        min: number;
        max: number;
        itens: {
          name: string;
          price: number;
        }[];
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
