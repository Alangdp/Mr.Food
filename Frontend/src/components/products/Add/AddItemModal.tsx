import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ItemDetails from './Steps/Details';
import { useEffect, useState } from 'react';
import {
  getPortugueseName,
  Product,
  ProductCompleteValidation,
} from '@/types/Product.type';
import Price from './Steps/Price';
import Suplements from './Steps/Suplement';
import { makePost } from '@/utils/Getter';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface Status {
  status: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
    // step4: boolean;
    // step5: boolean;
  };
}

interface AddItemModalProps {
  toggleModal: () => void;
}

export default function AddItemModal({ toggleModal }: AddItemModalProps) {
  const { toast } = useToast();
  const { companyToken } = useAuth();
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState<Product & Status>({
    status: {
      step1: false,
      step2: false,
      step3: false,
    },
    name: '',
    category: '',
    describe: '',
    price: 0,
    discount: 0,
    extras: {
      options: [],
    },
  });

  useEffect(() => {}, [product]);

  const saveProduct = async () => {
    const parsed = ProductCompleteValidation.safeParse(product);

    if (parsed.error && parsed.error.errors) {
      parsed.error.errors.forEach(error => {
        toast({
          title: getPortugueseName(error.path.join(' ')),
          description: error.message,
          variant: 'destructive',
        });
      });

      return false;
    }

    if (parsed.success && !parsed.error) {
      const newProduct = await makePost<
        Product & { description: string },
        Product
      >(
        'products',
        {
          ...product,
          description: product.describe,
        },
        {
          authToken: companyToken,
          autoToast: true,
          toast: toast,
        },
      );

      console.log(newProduct);

      if (newProduct) {
        setProduct({
          status: {
            step1: false,
            step2: false,
            step3: false,
          },
          name: '',
          category: '',
          describe: '',
          price: 0,
          discount: 0,
          extras: {
            options: [],
          },
        });
        toast({
          title: 'Produto salvo com sucesso',
        });

        return true;
      }

      return false;
    }

    return false;
  };

  return (
    <Tabs
      defaultValue={(
        Object.values(product.status).filter(
          (val, i) => val === true || i === 0,
        ).length - 1
      ).toString()}
      className="w-full"
      value={step.toString()}
    >
      <TabsList className="gap-8">
        <TabsTrigger onClick={() => setStep(0)} value="0">
          Detalhes
        </TabsTrigger>
        <TabsTrigger onClick={() => setStep(1)} value="1">
          Preço e Estoque
        </TabsTrigger>
        <TabsTrigger onClick={() => setStep(2)} value="2">
          Complementos
        </TabsTrigger>
      </TabsList>

      <div className="mt-10">
        <TabsContent value="0">
          <ItemDetails
            step={setStep}
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
            step={setStep}
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
        <TabsContent
          value="2"
          className="overflow-y-scroll h-[700px] no-scrollbar"
        >
          <Suplements
            saveProduct={saveProduct}
            step={setStep}
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
      </div>
    </Tabs>
  );
}
