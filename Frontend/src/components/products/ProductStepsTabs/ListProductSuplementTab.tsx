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
    <TabsContent value="olds" className="py-8 gap-2 w-full flex flex-col">
      {product.extras.map((category, index) => {
        return (
          <div
            className="w-full shadow-df rounded borer border-gray-200 p-2"
            key={`OPTION-CATEGORY-${index}`}
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <button
                onClick={() => {
                  productChange({
                    extras: product.extras.filter(
                      item => item.name !== category.name,
                    ),
                  });
                }}
                className="text-red-500"
              >
                <Cross1Icon />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {category.itens.map((item, index) => (
                <div
                  key={`OPTION-ITEM-${index}`}
                  className="flex items-center border border-gray-200 shadow-df rounded p-1 gap-4"
                >
                  <p>
                    Opção: <span>{item.name}</span>
                  </p>
                  <p>
                    Valor Extra: <span>{item.price}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </TabsContent>
  );
}
