import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DetailInput from '../../ItemInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState, ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types/Product.type';

const MAX_FILE_SIZE = 5 * 1000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const formSchema = z.object({
  price: z.number().int().positive('O preço deve ser positivo.'),
  discount: z.number().positive('O desconto deve ser positivo.').optional(),
});

type ProductSchema = z.infer<typeof formSchema>;

interface ItemDetailsProps {
  product: Product;
  productChange: (props: Partial<Product>) => void;
}

export default function Price({ product, productChange }: ItemDetailsProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: product.price,
      discount: product.discount,
    },
  });

  const onSubmit = (data: ProductSchema) => {
    productChange(data);
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full h-full grid grid-cols-5">
            <div className="col-span-3 h-full flex flex-col gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DetailInput
                        title="Preço"
                        isRequired
                        placeholder="0.00 R$"
                        inputProps={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DetailInput
                        title="Desconto"
                        placeholder="Descrição"
                        type="number"
                        inputProps={{
                          ...field,
                          onChange: e => {
                            const value = e.target.value.replace(
                              /[^0-9,.]/g,
                              '',
                            );
                            form.setValue(
                              'discount',
                              Number(
                                value.replace(',', '.').replace(/^0+/, ''),
                              ),
                            );
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button type="submit" className="mt-4 bg-red-600 hover:bg-red-500">
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
