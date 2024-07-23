import { TabsContent } from '@/components/ui/tabs';
import { Product } from '@/types/Product.type';
import { SuplementCategory } from '@/types/SuplementCategory.type';
import { Cross1Icon } from '@radix-ui/react-icons';

type ListProductSuplementTab = {
  product: Product;
  productChange: (props: Partial<Product>) => void;
  complementsCategories: SuplementCategory[];
};

export default function ListProductSuplementTab({
  complementsCategories,
  product,
  productChange,
}: ListProductSuplementTab) {
  return (
    <TabsContent
      value="olds"
      className="py-8 gap-2 w-full items-center grid grid-cols-4"
    >
      {product.extras.map((item, index) => (
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
                  extras: product.extras.filter((_val, i) => i !== index),
                });
              }}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-secondary font-medium">
              Valor: <span className="text-gray-500">{item.name}</span>
            </span>
            <span className="text-secondary font-medium">
              Preço: <span className="text-gray-500">R$ {item.price}</span>
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
  );
}
