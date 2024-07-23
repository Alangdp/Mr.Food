/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@radix-ui/react-tabs';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { RegisterProductSuplementsTabProps } from './RegisterSuplementProductTab.type';
import { toast } from '@/components/ui/use-toast';
import DetailInput from '@/components/utilities/DetailInput';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function RegisterProductTab({
  hasSuplements,
  fields,
  append,
  remove,
  productForm,
  complementsCategories,
  categoryForm,
  setSelectedFunction,
}: RegisterProductSuplementsTabProps) {
  return (
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
            <span key={`Field-Index-${index}`}>
              <div className="absolute right-2 top-5 w-6 h-6 text-red-600">
                <Cross1Icon
                  onClick={() => remove(index)}
                  className="cursor-pointer"
                />
              </div>
              <div key={field.id} className="flex flex-col gap-4 mt-4">
                <FormField
                  control={productForm.control}
                  name={`extras.${index}.categoryId`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DetailInput
                          {...field}
                          substitute={
                            <Select
                              onValueChange={val => {
                                console.log(val);
                                productForm.setValue(
                                  `extras.${index}.categoryId`,
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
                                    .filter(item => item.type === 'PRODUCT')
                                    .map(item => (
                                      <SelectItem value={item.id.toString()}>
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
                  control={productForm.control}
                  key={`extras.${index}.name`}
                  name={`extras.${index}.name`}
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
                  control={productForm.control}
                  key={`extras.${index}.price`}
                  name={`extras.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DetailInput
                          title="Preço"
                          type="number"
                          placeholder="Preço"
                          inputProps={{
                            ...field,
                            onChange: e => {
                              productForm.setValue(
                                `extras.${index}.price`,
                                Number(e.target.value),
                              );
                              productForm.trigger(`extras.${index}.price`);
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
                    control={productForm.control}
                    name={`extras.${index}.maxQuantity`}
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
                    control={productForm.control}
                    name={`extras.${index}.minQuantity`}
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
            </span>
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
                title: 'So pode haver um cadastro de complemento por vez',
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
  );
}
