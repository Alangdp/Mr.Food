import { FieldArrayWithId, UseFormReturn } from 'react-hook-form';

export type RegisterCategoryTabProps = {
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
  categoryForm: UseFormReturn<
    {
      name: string;
    },
    any,
    undefined
  >;
};
