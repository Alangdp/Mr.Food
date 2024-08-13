import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';
import {
  Category,
  getPortugueseName,
  Product,
  ProductCompleteValidation,
  ProductResponse,
} from '@/types/Product.type';
import { makeRequestWithFormData } from '@/utils/Getter';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import ItemDetails from '../ProductSteps/Details';
import Price from '../ProductSteps/Price';
import Suplements from '../ProductSteps/Suplement';

interface Status {
  status: {
    step1: boolean;
    step2: boolean;
    step3: boolean;
  };
}

interface AddItemModalProps {
  toggleModal: (() => void) | ((...args: any[]) => any);
  product?: ProductResponse;
  type?: string;
}

export default function AddItemModal({
  product: startProduct,
  type,
}: AddItemModalProps) {
  const { toast } = useToast();
  const { companyToken } = useAuth();
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState<Product & Status>({
    status: {
      step1: false,
      step2: false,
      step3: false,
    },
    name: startProduct?.name || '',
    category: startProduct?.categoryId.toString() || '',
    describe: startProduct?.description || '',
    price: Number(startProduct?.price) || 0,
    discount: startProduct?.discountPercent || 0,
    extras: startProduct?.extras || ([] as Category[]),
    image: [],
  });

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
      console.log(type);
      if (type === 'edit') {
        const { id } = startProduct || { id: 0 };

        const EditProduct = await makeRequestWithFormData<
          Product & { description: string; productId: number },
          Product
        >(
          'products/',
          {
            ...product,
            productId: id,
            description: product.describe,
          },
          {
            type: 'put',
            authToken: companyToken,
            autoToast: true,
            toast: toast,
          },
        );

        toast({
          title: 'Produto salvo com sucesso',
        });

        if (EditProduct) return true;
        return false;
      }
      const newProduct = await makeRequestWithFormData<
        Product & { description: string },
        Product
      >(
        'products',
        {
          ...product,
          description: product.describe,
        },
        {
          type: 'post',
          authToken: companyToken,
          autoToast: true,
          toast: toast,
        },
      );

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
          extras: [],
          image: [],
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
      className="w-full h-screen"
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

      <div className="mt-10 h-full">
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
        <TabsContent value="2" className="overflow-y-scroll  h-[80vh]">
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
