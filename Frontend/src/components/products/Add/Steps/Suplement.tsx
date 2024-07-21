/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
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
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { makeGet, makePost } from '@/utils/Getter';
import { SuplementCategory } from '@/types/SuplementCategory.type';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

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

const extraSchema = z.object({
  options: z.array(extraOptionSchema),
});

const formSchema = z.object({
  extras: extraSchema.default({ options: [] }),
});

const categorySchema = z.object({
  name: z.string().min(4, {
    message: 'Nome deve ter no mínimo 4 caracteres',
  }),
});

type ProductSchema = z.infer<typeof formSchema>;
type CategorySchema = z.infer<typeof categorySchema>;

interface ItemDetailsProps {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  step: React.Dispatch<React.SetStateAction<number>>;
  saveProduct: () => Promise<boolean>;
}

export default function Suplements({
  product,
  productChange,
  step,
  saveProduct,
}: ItemDetailsProps) {
  const [complementsCategories, setComplementsCategories] = useState<
    SuplementCategory[]
  >([]);

  const fetchCategories = async () => {
    const categories = await makeGet<SuplementCategory[]>('categories/', {
      autoToast: true,
      toast,
      authToken: companyToken,
    });

    setComplementsCategories(categories || []);
  };

  useEffect(() => {
    if (complementsCategories.length === 0) {
      fetchCategories();
    }
  }, []);

  const { companyToken } = useAuth();
  const [selectedFunction, setSelectedFunction] = useState<
    string | undefined
  >();
  const { toast } = useToast();
  const [hasSuplements, setHasSuplements] = useState(false);

  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      extras: product.extras || { options: [] },
    },
  });

  const categoryForm = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'extras.options',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        name: '',
        price: 0,
        maxQuantity: 1,
        minQuantity: 0,
        categoryId: '',
      });
    }
  }, []);

  const onSubmit = (data: ProductSchema) => {
    const allExtras = [...data.extras.options, ...product.extras.options];
    productChange({
      ...product,
      extras: {
        options: allExtras,
      },
    });
    form.reset();
    append({
      name: '',
      price: 0,
      maxQuantity: 1,
      minQuantity: 0,
      categoryId: '',
    });
  };

  const categoryOnSubmit = async (data: CategorySchema) => {
    const dataResponse = await makePost<CategorySchema, SuplementCategory>(
      'categories/',
      { ...data },
      { toast, autoToast: true, authToken: companyToken },
    );
    if (dataResponse) {
      toast({
        title: 'Categoria cadastrada com sucesso',
      });
      categoryForm.reset();
      setSelectedFunction('new');
      setComplementsCategories(prevState => [...prevState, dataResponse]);
    }
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-full grid grid-cols-5">
        <div className="col-span-5 h-full flex flex-col gap-2 p-4">
          <h4 className="text-xl font-medium">Complementos</h4>
          <p className="text-secondary font-sm opacity-70">
            Seu item tem Complementos pra ficar ainda mais gostoso? Indique
            aqui.
          </p>

          <div className="mx-auto w-full bg-slate-200 h-36 rounded-lg relative overflow-hidden flex flex-col justify-center items-start pl-12">
            <div className="flex items-center gap-2">
              <Switch
                className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-white mr-4"
                onCheckedChange={status => setHasSuplements(status)}
                classNameThumb="bg-zinc-400 data-[state=checked]:bg-white"
              />
              Possui Complementos?
            </div>
            <div className="absolute -bottom-8 -right-10 w-32 h-32 bg-red-400 opacity-60 rounded-full"></div>
          </div>

          <Tabs
            defaultValue="new"
            className={hasSuplements ? 'block' : 'hidden'}
            onValueChange={value => setSelectedFunction(value)}
            value={selectedFunction}
          >
            <TabsList className="gap-4 w-fit">
              <TabsTrigger className="w-20" value="new">
                Novo
              </TabsTrigger>
              <TabsTrigger className="w-20" value="olds">
                Existentes
              </TabsTrigger>
              <TabsTrigger className="w-20" value="categories">
                Categorias
              </TabsTrigger>
              <TabsTrigger className="" value="oldcategories">
                Categorias Cadastradas
              </TabsTrigger>
            </TabsList>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent
                  value="new"
                  className="py-8 overflow-y-scroll h-96 no-scrollbar"
                >
                  {hasSuplements && (
                    <div
                      className={cn(
                        'border border-gray-200 p-2 rounded-lg relative',
                        fields.length === 0 ? 'hidden' : '',
                      )}
                    >
                      {fields.map((field, index) => (
                        <>
                          <div className="absolute right-2 top-5 w-6 h-6 text-red-600">
                            <Cross1Icon
                              onClick={() => remove(index)}
                              className="cursor-pointer"
                            />
                          </div>
                          <div
                            key={field.id}
                            className="flex flex-col gap-4 mt-4"
                          >
                            <FormField
                              control={form.control}
                              name={`extras.options.${index}.categoryId`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <DetailInput
                                      {...field}
                                      substitute={
                                        <Select
                                          onValueChange={val => {
                                            console.log(val);
                                            form.setValue(
                                              `extras.options.${index}.categoryId`,
                                              val,
                                            );
                                          }}
                                        >
                                          <div className="flex flex-col gap-2">
                                            <h4 className="text-xl font-medium">
                                              Categoria
                                            </h4>
                                            <SelectTrigger className="w-[180px]">
                                              <SelectValue placeholder="Categoria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {complementsCategories
                                                .filter(
                                                  item =>
                                                    item.type === 'PRODUCT',
                                                )
                                                .map(item => (
                                                  <SelectItem
                                                    value={item.id.toString()}
                                                  >
                                                    {item.name}
                                                  </SelectItem>
                                                ))}
                                            </SelectContent>
                                          </div>
                                        </Select>
                                      }
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              key={`extras.options.${index}.name`}
                              name={`extras.options.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <DetailInput
                                      title="Nome do Complemento"
                                      type="text"
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
                              key={`extras.options.${index}.price`}
                              name={`extras.options.${index}.price`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <DetailInput
                                      title="Preço"
                                      type="text"
                                      placeholder="Preço"
                                      inputProps={{
                                        ...field,
                                        onChange: e => {
                                          const value = e.target.value.replace(
                                            /[^0-9,.]/g,
                                            '',
                                          );
                                          console.log(value);
                                          const numberValue = Number(
                                            value
                                              .replace(',', '.')
                                              .replace(/^0+/, ''),
                                          );
                                          form.setValue(
                                            `extras.options.${index}.price`,
                                            numberValue,
                                          );
                                        },
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="flex items-center w-min-[100%]">
                              <FormField
                                control={form.control}
                                name={`extras.options.${index}.maxQuantity`}
                                render={({ field }) => (
                                  <FormItem className="w-1/2">
                                    <FormControl>
                                      <DetailInput
                                        title="Quantidade Máxima"
                                        type="number"
                                        placeholder="Quantidade Máxima"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`extras.options.${index}.minQuantity`}
                                render={({ field }) => (
                                  <FormItem className="w-1/2">
                                    <FormControl>
                                      <DetailInput
                                        title="Quantidade Mínima"
                                        type="number"
                                        placeholder="Quantidade Mínima"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-8">
                    <Button
                      type="submit"
                      size="lg"
                      className="gap-2 border border-gray-200 text-white bg-red-600 hover:bg-red-500"
                    >
                      Salvar
                    </Button>
                    <Button
                      size={'lg'}
                      className="gap-2 border border-gray-200 text-red-600 bg-white hover:bg-gray-100"
                      onClick={() => {
                        categoryForm.reset();
                        if (fields.length > 0) {
                          toast({
                            title:
                              'So pode haver um cadastro de complemento por vez',
                          });
                          return;
                        } else {
                          append({
                            name: '',
                            price: 0,
                            maxQuantity: 1,
                            minQuantity: 0,
                            categoryId: '',
                          });
                        }
                      }}
                    >
                      <PlusIcon className="font-bold w-6 h-auto" />
                      Novo Complemento
                    </Button>
                    <Button
                      size={'lg'}
                      className="gap-2 border border-gray-200 text-white bg-red-600 hover:bg-red-500"
                      onClick={() => {
                        remove(fields.map((_, index) => index));
                        setSelectedFunction('categories');
                      }}
                    >
                      <PlusIcon className="font-bold w-6 h-auto" />
                      Nova Categoria
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Form>

            <TabsContent
              value="olds"
              className="py-8 gap-2 w-full items-center grid grid-cols-4"
            >
              {product.extras.options.map((item, index) => (
                <div className="card flex-[0.3] h-60 bg-white rounded-lg shadow-lg p-6 border shadow-df">
                  <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h4 className="text-xl font-semibold text-gray-800">
                      {
                        complementsCategories.find(
                          val => val.id === Number(item.categoryId),
                        )?.name
                      }
                    </h4>
                    <Cross1Icon
                      className="w-6 h-6 cursor-pointer text-red-600 hover:text-red-800 transition-colors z-20"
                      onClick={() => {
                        productChange({
                          ...product,
                          extras: {
                            options: product.extras.options.filter(
                              (_val, i) => i !== index,
                            ),
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-secondary font-medium">
                      Valor: <span className="text-gray-500">{item.name}</span>
                    </span>
                    <span className="text-secondary font-medium">
                      Preço:{' '}
                      <span className="text-gray-500">R$ {item.price}</span>
                    </span>
                    <span className="text-secondary font-medium">
                      Quantidade Máxima:
                      <span className="text-gray-500">{item.maxQuantity}</span>
                    </span>
                    <span className="text-secondary font-medium">
                      Quantidade Mínima:{' '}
                      <span className="text-gray-500">{item.minQuantity}</span>
                    </span>
                  </div>
                  {/* Opções */}
                </div>
              ))}
            </TabsContent>

            <Form {...categoryForm}>
              <form onSubmit={categoryForm.handleSubmit(categoryOnSubmit)}>
                <TabsContent
                  value="categories"
                  className="py-8 flex flex-col gap-2"
                >
                  <div
                    className={cn(
                      'border border-gray-200 p-2 rounded-lg relative',
                      fields.length === 0 ? 'hidden' : '',
                    )}
                  >
                    <FormField
                      control={categoryForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <DetailInput
                            title="Nome da Categoria"
                            placeholder="Ex: Adicionais"
                            inputProps={field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2 border border-gray-200 text-white bg-red-600 hover:bg-red-500"
                  >
                    Registrar Categoria
                  </Button>
                </TabsContent>
              </form>
            </Form>

            <TabsContent value="oldcategories">
              <div className="flex flex-col gap-2">
                {complementsCategories
                  .filter(item => item.type === 'CATEGORY')
                  .map(item => (
                    <div className="card flex-[0.3] h-60 bg-white rounded-lg shadow-lg p-6 border shadow-df">
                      <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h4 className="text-xl font-semibold text-gray-800">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          className="mt-4 bg-red-600 hover:bg-red-500"
          onClick={async () => {
            const valid = await saveProduct();
            if (valid) {
              step(0);
              form.reset();
              append({
                name: '',
                price: 0,
                maxQuantity: 1,
                minQuantity: 0,
                categoryId: '',
              });
            }
          }}
        >
          Registrar Item
        </Button>
      </div>
    </motion.div>
  );
}
