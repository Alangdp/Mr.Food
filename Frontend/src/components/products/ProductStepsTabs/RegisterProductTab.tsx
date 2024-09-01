/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@radix-ui/react-tabs';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { RegisterProductSuplementsTabProps } from './RegisterSuplementProductTab.type';
import { toast } from '@/components/ui/use-toast';
import DetailInput from '@/components/utilities/DetailInput';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function RegisterProductTab({
  hasSuplements,
  fields,
  append,
  remove,
  productForm,
  categoryForm,
  setSelectedFunction,
}: RegisterProductSuplementsTabProps) {
  return (
    <TabsContent value="new" className="py-8  h-96">
      {hasSuplements && (
        <div
          className={cn(
            'border border-gray-200 p-2 rounded-lg relative',
            fields.length === 0 ? 'hidden' : '',
          )}
        >
          {fields.map((field, index) => (
            <div key={`COMPLEMENTE-INDEX-${index}`}>
              <span className="flex items-center flex-[0.9] gap-4">
                <FormField
                  control={productForm.control}
                  name={`extras.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DetailInput
                          title="Nome do Complemento"
                          isRequired
                          placeholder=""
                          inputProps={{ ...field }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={productForm.control}
                  name={`extras.${index}.obrigatory`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <span className="relative h-fit flex flex-col gap-2">
                          <h4 className="text-xl font-medium">
                            Complemento Obrigatório ?
                          </h4>
                          <Switch
                            className="data-[state=checked]:bg-red-500 "
                            onCheckedChange={status => {
                              if (status) {
                                productForm.setValue(`extras.${index}.min`, 1);
                                productForm.setValue(`extras.${index}.max`, 1);
                              }
                              productForm.setValue(
                                `extras.${index}.obrigatory`,
                                status,
                              );

                              return;
                            }}
                            checked={field.value}
                          />
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>

              <span className="flex itesm-center">
                <FormField
                  control={productForm.control}
                  name={`extras.${index}.min`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <span className="relative h-fit">
                          <h4 className="text-xl font-medium">
                            Quantidade Mínima
                          </h4>
                          <div className="flex items-center space-x w-full max-w-sm border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-l-md text-red-600 hover:text-red-500 hover:bg-transparent"
                              onClick={() => {
                                if (
                                  productForm.getValues(
                                    `extras.${index}.obrigatory`,
                                  ) === true &&
                                  field.value === 1
                                ) {
                                  toast({
                                    title: 'Complemento obrigatório',
                                    description:
                                      'Quantidade mínima não pode ser 0',
                                  });
                                  return;
                                }
                                if (field.value === 0) return;
                                productForm.setValue(
                                  `extras.${index}.min`,
                                  field.value - 1,
                                );
                              }}
                            >
                              <MinusIcon className="h-5 w-5" />
                            </Button>
                            <Input
                              type="number"
                              className="flex-1 rounded-none border-x border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              readOnly
                              {...field}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-r-md text-red-600 hover:text-red-500 hover:bg-transparent"
                              onClick={() => {
                                if (
                                  field.value >=
                                  productForm.getValues(`extras.${index}.max`)
                                )
                                  return;
                                productForm.setValue(
                                  `extras.${index}.min`,
                                  field.value + 1,
                                );
                              }}
                            >
                              <PlusIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={productForm.control}
                  name={`extras.${index}.max`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <span className="relative h-fit">
                          <h4 className="text-xl font-medium">
                            Quantidade Máxima
                          </h4>
                          <div className="flex items-center space-x w-full max-w-sm border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-l-md text-red-600 hover:text-red-500 hover:bg-transparent"
                              onClick={() => {
                                if (
                                  field.value <=
                                  productForm.getValues(`extras.${index}.min`)
                                ) {
                                  toast({
                                    title: 'Quantidade mínima',
                                    description:
                                      'Quantidade máxima não pode ser menor que a mínima',
                                  });
                                  return;
                                }
                                if (field.value === 0) return;
                                productForm.setValue(
                                  `extras.${index}.max`,
                                  field.value - 1,
                                );
                              }}
                            >
                              <MinusIcon className="h-5 w-5" />
                            </Button>
                            <Input
                              type="number"
                              className="flex-1 rounded-none border-x border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              readOnly
                              {...field}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 rounded-r-md text-red-600 hover:text-red-500 hover:bg-transparent"
                              onClick={() => {
                                productForm.setValue(
                                  `extras.${index}.max`,
                                  field.value + 1,
                                );
                              }}
                            >
                              <PlusIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </span>

              <div className="w-full  h-52 border border-gray-200 shadow-df mt-4 rounded mx-auto flex flex-col gap-2 p-2 overflow-y-scroll">
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-medium">Opções</h4>
                  <Button
                    size="icon"
                    className="h-10 w-fit px-4 rounded-l-md bg-white shadow-df border-gray-200 text-red-600 hover:text-red-500 hover:bg-gray-100 gap-4"
                    type="button"
                    onClick={() => {
                      const itensToIndex = productForm.getValues(
                        `extras.${index}.itens`,
                      );

                      if (
                        itensToIndex.length > 0 &&
                        itensToIndex[itensToIndex.length - 1].name === ''
                      ) {
                        toast({
                          title: 'Preencha o campo anterior',
                        });
                        return;
                      }

                      productForm.setValue(`extras.${index}.itens`, [
                        ...itensToIndex,
                        {
                          name: '',
                          price: 0,
                        },
                      ]);
                    }}
                  >
                    Nova Opção
                    <PlusIcon className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center">
                  <span className="flex flex-col w-full flex-1">
                    {productForm
                      .getValues(`extras.${index}.itens`)
                      .map((item, itemIndex) => {
                        return (
                          <div
                            key={`ITEM-INDEX-${itemIndex}`}
                            className="flex items-center"
                          >
                            <span className="flex items-center gap-4 w-full">
                              <FormField
                                control={productForm.control}
                                name={`extras.${index}.itens.${itemIndex}.name`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <DetailInput
                                        title="Nome do Item"
                                        isRequired
                                        placeholder=""
                                        inputProps={field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={productForm.control}
                                name={`extras.${index}.itens.${itemIndex}.price`}
                                render={({ field }) => (
                                  <FormItem className="flex-1">
                                    <FormControl>
                                      <DetailInput
                                        title="Preço"
                                        isRequired
                                        type="number"
                                        placeholder=""
                                        inputProps={{
                                          ...field,
                                          onChange: e => {
                                            const value = Number(
                                              e.target.value,
                                            );
                                            productForm.setValue(
                                              `extras.${index}.itens.${itemIndex}.price`,
                                              value,
                                            );
                                          },
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </span>
                            <Button
                              size="icon"
                              className="h-10 w-fit px-4 rounded-l-md bg-white shadow-df border-gray-200 text-red-600 hover:text-red-500 hover:bg-gray-100 gap-4"
                              onClick={() => {
                                field.itens.splice(itemIndex, 1);
                                productForm.setValue(
                                  `extras.${index}.itens`,
                                  field.itens,
                                );
                              }}
                            >
                              <MinusIcon className="h-5 w-5" />
                            </Button>
                          </div>
                        );
                      })}
                  </span>
                </div>
              </div>
            </div>
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
          size="lg"
          className="gap-2 border border-gray-200 text-red-600 bg-white hover:bg-gray-100"
          onClick={() => {
            categoryForm.reset();
            if (fields.length > 0) {
              toast({
                title: 'Só pode haver um cadastro de complemento por vez',
              });
              return;
            }
            append({
              name: '',
              itens: [],
              obrigatory: false,
              max: 0,
              min: 0,
            });
          }}
        >
          <PlusIcon className="font-bold w-6 h-auto" />
          Novo Complemento
        </Button>
        <Button
          size="lg"
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
