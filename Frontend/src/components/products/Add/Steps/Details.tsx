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
});

type ProductSchema = z.infer<typeof formSchema>;

interface ItemDetailsProps {
  product: Product;
  productChange: (props: Partial<Product>) => void;
}

export default function ItemDetails({
  product,
  productChange,
}: ItemDetailsProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: product.category,
      describe: product.describe,
      image: product.image,
      name: product.name,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('image', file, { shouldValidate: true });
    }
  };

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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DetailInput
                        title="Categoria"
                        isRequired
                        placeholder="Categoria"
                        inputProps={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DetailInput
                        title="Nome"
                        isRequired
                        placeholder="Nome"
                        inputProps={field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="describe"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DetailInput
                        title="Descrição"
                        isRequired
                        placeholder="Descrição"
                        inputProps={field}
                        substitute={<Textarea {...field} className="h-32" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2 h-full flex flex-col gap-2">
              <h4 className="text-xl font-medium">Imagem</h4>
              <div className="w-full h-60 border-dashed border rounded-lg border-secondary flex items-center justify-center text-secondary opacity-80 cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-full min-h-max relative bg-auto bg-center h-60"
                    onClick={() => {
                      document.getElementById('fileInput')?.click();
                    }}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        style={{
                          borderRadius: '6px',
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">
                          Clique para selecionar uma imagem
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-secondary opacity-70 flex items-center">
                  Tamanho máximo:{' '}
                  <p className="text-sm font-medium text-black">5MB</p>
                </span>
                <span className="text-secondary opacity-70 flex items-center flex-wrap gap-1">
                  Formatos suportados:{' '}
                  <p className="text-sm font-medium text-black">
                    .JPG, .JPGE, .PNG, .WEBP
                  </p>
                </span>
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
