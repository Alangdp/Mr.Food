import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import DetailInput from '@/components/utilities/DetailInput';
import { cn } from '@/lib/utils';
import { TabsContent } from '@/components/ui/tabs';
import { RegisterCategoryTabProps } from './RegisterCategoryTab.type';

export default function RegisterCategoryTab({
  categoryForm,
  fields,
}: RegisterCategoryTabProps) {
  return (
    <TabsContent value="categories" className="py-8 flex flex-col gap-2">
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
  );
}
