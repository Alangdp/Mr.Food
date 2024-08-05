import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import DetailInput from '../../utilities/DetailInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useState, ChangeEvent, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SuplementCategory } from '@/types/SuplementCategory.type';
import { makeGet } from '@/utils/Getter';
import {
  ItemDetailsProps,
  productDetailSchema,
  ProductSchema,
} from '../ProductStepsForms/Details';
import { useDefaultImports } from '@/components/utilities/DefaultImports';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function ItemDetails({
  product,
  productChange,
  step,
}: ItemDetailsProps) {
  const { auth, toast } = useDefaultImports();
  const [categories, setCategories] = useState<SuplementCategory[]>([]);

  const fetchCategories = async () => {
    const categories = await makeGet<SuplementCategory[]>('categories', {
      authToken: auth.companyToken,
      toast,
      autoToast: true,
    });

    if (categories) setCategories(categories);
  };

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  useEffect(() => {
    if (product.image && product.image.length > 0) {
      const previews: string[] = [];
      const files = product.image;

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews[index] = reader.result as string;
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setImagePreviews([]);
    }
  }, [product.image]);

  const [imagePreview, setImagePreviews] = useState<string[]>([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productDetailSchema),
    defaultValues: {
      category: product.category,
      describe: product.describe,
      image: product.image || [],
      name: product.name,
    },
  });

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % imagePreview.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + imagePreview.length) % imagePreview.length,
    );
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const previews: string[] = [];
      const newImages: File[] = [];

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
        newImages.push(file);
      });

      form.setValue('image', newImages, { shouldValidate: true });
    }
  };

  const onSubmit = (data: ProductSchema) => {
    productChange(data);
    step(1);
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
                      <DropdownMenu>
                        <DropdownMenuTrigger className="w-full">
                          <DetailInput
                            title="Categoria"
                            isRequired
                            placeholder="Categoria"
                            inputProps={{
                              ...field,
                              className: 'cursor-pointer',
                              value: categories.find(
                                (item: SuplementCategory) =>
                                  item.id.toString() === field.value,
                              )?.name,
                            }}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>
                            Categoria do Produto
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={'TESTE'}
                            onValueChange={(value: string) => {
                              form.setValue('category', value);
                            }}
                          >
                            {categories
                              .filter(item => item.type === 'CATEGORY')
                              .map(category => (
                                <DropdownMenuRadioItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </DropdownMenuRadioItem>
                              ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
              <div className="w-full h-60 border-dashed border rounded-lg border-secondary flex items-center justify-center text-secondary opacity-80">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-full min-h-max relative bg-auto bg-center h-60 bg-no-repeat"
                    onClick={() => {
                      document.getElementById('fileInput')?.click();
                    }}
                  >
                    {imagePreview.length > 0 ? (
                      <>
                        <img
                          src={imagePreview[currentImageIndex]}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          style={{
                            borderRadius: '6px',
                          }}
                        />

                        <span className="absolute top-0 left-0 bg-black text-white p-1 text-sm rounded-bl-lg">
                          {currentImageIndex + 1}/{imagePreview.length}
                        </span>

                        <span className="absolute top-0 right-0 bg-black text-white p-1 text-sm rounded-br-lg">
                          {imagePreview[currentImageIndex].length / 1000}KB
                        </span>

                        <span
                          className="absolute top-8 right-2 bg-white border border-gray-400 text-red-600 p-1 text-sm rounded-full cursor-pointer"
                          onClick={() => {
                            const newPreviews = imagePreview.filter(
                              (_, index) => index !== currentImageIndex,
                            );
                            form.setValue('image', newPreviews, {
                              shouldValidate: true,
                            });
                            setImagePreviews(newPreviews);
                            setCurrentImageIndex(0);
                          }}
                        >
                          <Cross1Icon className="w-4 h-4" />
                        </span>

                        <button
                          type="button"
                          onClick={handlePrevImage}
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 text-white p-2 z-50 bg-white border border-gray-400 rounded-full"
                        >
                          <GiPreviousButton className="text-red-600" />
                        </button>

                        <button
                          type="button"
                          onClick={handleNextImage}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white p-2 z-50 bg-white border border-gray-400 rounded-full"
                        >
                          <GiNextButton className="text-red-600" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">
                          Clique para selecionar uma imagem
                        </span>
                      </div>
                    )}
                  </div>
                  {imagePreview.length === 0 && (
                    <input
                      id="fileInput"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      multiple
                      accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                    />
                  )}
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
