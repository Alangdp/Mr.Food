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
import { Product } from '@/types/Product.type';

const formSchema = z.object({
  price: z.number().positive('O preço deve ser positivo.'),
  discount: z
    .number()
    .min(0, 'O desconto deve ser positivo.')
    .max(100, 'O desconto deve ser menor que 100.'),
});

type ProductSchema = z.infer<typeof formSchema>;

interface ItemDetailsProps {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
}

export default function Price({
  product,
  productChange,
  step,
}: ItemDetailsProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: product.price,
      discount: product.discount,
    },
  });

  const onSubmit = (data: ProductSchema) => {
    productChange(data);
    step(2);
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
                        type="number"
                        inputProps={{
                          ...field,
                          onChange: e => {
                            form.setValue('price', Number(e.target.value));
                            form.trigger('price');
                          },
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="items-center w-full">
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
                            step: '0.01',
                            value: Number(form.getValues('discount')),
                            onChange: e => {
                              form.setValue('discount', Number(e.target.value));
                              form.trigger('discount');
                            },
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DetailInput
                  title="Novo Preço"
                  placeholder="0.00 R$"
                  type="number"
                  isDisabled
                  inputProps={{
                    value:
                      form.getValues('price') -
                      (form.getValues('price') * form.getValues('discount')) /
                        100,
                  }}
                />
              </div>
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
