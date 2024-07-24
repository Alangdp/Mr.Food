/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { makeGet } from '@/utils/Getter';
import { SuplementCategory } from '@/types/SuplementCategory.type';
import {
  CategoryType,
  categorySchema,
  ProductSuplementSchema,
  ProductSuplementsProps,
  productSuplementSchema,
} from '../ProductStepsForms/Suplements';
import { useDefaultImports } from '@/components/utilities/DefaultImports';
import RegisterProductTab from '../ProductStepsTabs/RegisterProductTab';
import ListProductSuplementTab from '../ProductStepsTabs/ListProductSuplementTab';
export default function Suplements({
  product,
  productChange,
  step,
  saveProduct,
}: ProductSuplementsProps) {
  const { auth, toast } = useDefaultImports();

  const [complementsCategories, setComplementsCategories] = useState<
    SuplementCategory[]
  >([]);

  const [selectedFunction, setSelectedFunction] = useState<
    string | undefined
  >();

  const [hasSuplements, setHasSuplements] = useState(
    product.extras.length > 0 ? true : false,
  );

  const fetchCategories = async () => {
    const categories = await makeGet<SuplementCategory[]>('categories/', {
      autoToast: true,
      toast,
      authToken: auth.companyToken,
    });

    setComplementsCategories(categories || []);
  };

  useEffect(() => {
    if (complementsCategories.length === 0) {
      fetchCategories();
    }
  }, []);

  const productForm = useForm<ProductSuplementSchema>({
    resolver: zodResolver(productSuplementSchema),
    defaultValues: {
      extras: [],
    },
  });

  const categoryForm = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: productForm.control,
    name: 'extras',
  });

  useEffect(() => {
    if (fields.length === 0 && product.extras.length === 0) {
      append({
        name: '',
        itens: [],
        obrigatory: false,
        max: 0,
        min: 0,
      });
    }
  }, []);

  const onSubmit = (data: ProductSuplementSchema) => {
    const allExtras = [...data.extras, ...product.extras];
    productChange({
      ...product,
      extras: allExtras,
    });

    productForm.reset();
    append({
      name: '',
      itens: [],
      obrigatory: false,
      max: 0,
      min: 0,
    });
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
                checked={hasSuplements}
              />
              Possui Complementos?
            </div>
            <div className="absolute -bottom-8 -right-10 w-32 h-32 bg-red-400 opacity-60 rounded-full"></div>
          </div>

          <Tabs
            defaultValue={product.extras.length > 1 ? 'olds' : 'new'}
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
            </TabsList>

            <Form {...productForm}>
              <form onSubmit={productForm.handleSubmit(onSubmit)}>
                <RegisterProductTab
                  hasSuplements={hasSuplements}
                  fields={fields}
                  append={append}
                  productForm={productForm}
                  remove={remove}
                  complementsCategories={complementsCategories}
                  categoryForm={categoryForm}
                  setSelectedFunction={setSelectedFunction}
                />
              </form>
            </Form>

            <ListProductSuplementTab
              product={product}
              productChange={productChange}
              complementsCategories={complementsCategories}
            />
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
              productForm.reset();
              append({
                name: '',
                itens: [],
                obrigatory: false,
                max: 0,
                min: 0,
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
