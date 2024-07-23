import { TabsContent } from '@/components/ui/tabs';
import { SuplementCategory } from '@/types/SuplementCategory.type';

type ListCategoryTabProps = {
  complementsCategories: SuplementCategory[];
};

export default function ListCategoryTab({
  complementsCategories,
}: ListCategoryTabProps) {
  return (
    <TabsContent value="oldcategories">
      <div className="flex flex-col gap-2">
        {complementsCategories
          .filter(item => item.type === 'PRODUCT')
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
  );
}
