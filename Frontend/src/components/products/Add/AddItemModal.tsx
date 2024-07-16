import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ItemDetails from './Steps/Details';
import { useEffect, useState } from 'react';
import { Product } from '@/types/Product.type';
import Price from './Steps/Price';

interface Status {
  status: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    step4: boolean;
    step5: boolean;
  };
}

export default function AddItemModal() {
  const [product, setProduct] = useState<Product & Status>({
    status: {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
    },
    name: '',
    category: '',
    describe: '',
    price: 0,
    discount: 0,
  });

  useEffect(() => {}, [product]);
  return (
    <Tabs
      defaultValue={(
        Object.values(product.status).filter(
          (val, i) => val === true || i === 0,
        ).length - 1
      ).toString()}
      className="w-full"
    >
      <TabsList className="gap-8">
        <TabsTrigger value="0">Detalhes</TabsTrigger>
        <TabsTrigger value="1">Preço e Estoque</TabsTrigger>
        <TabsTrigger value="2">Complementos</TabsTrigger>
        <TabsTrigger value="3">Classificação</TabsTrigger>
        <TabsTrigger value="4">Disponibilidade</TabsTrigger>
      </TabsList>

      <div className="mt-10">
        <TabsContent value="0">
          <ItemDetails
            product={product}
            productChange={product => {
              setProduct(prev => ({
                ...prev,
                ...product,
                status: { ...prev.status, step1: true },
              }));
            }}
          />
        </TabsContent>
        <TabsContent value="1">
          <Price
            product={product}
            productChange={product => {
              setProduct(prev => ({
                ...prev,
                ...product,
                status: { ...prev.status, step1: true },
              }));
            }}
          />
        </TabsContent>
        <TabsContent value="2">Complementos</TabsContent>
        <TabsContent value="3">Classificação</TabsContent>
        <TabsContent value="4">Disponibilidade</TabsContent>
      </div>
    </Tabs>
  );
}
