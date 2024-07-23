import { BasicModalProps } from '@/types/BasicModal.type';
import ModalBody from '../../utilities/ModalBody';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DetailInput from '../../utilities/DetailInput';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { makePost } from '@/utils/Getter';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { SuplementCategory } from '@/types/SuplementCategory.type';

const formSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  description: z.string().nonempty('Descrição é obrigatória'),
  type: z.string().nonempty('Tipo é obrigatório').default('category'),
});

type FormType = z.infer<typeof formSchema>;

export default function CategoryAdminModal({ toggleModal }: BasicModalProps) {
  const { companyToken } = useAuth();
  const { toast } = useToast();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'CATEGORY',
    },
  });

  useEffect(() => {
    form.setValue('type', 'CATEGORY');
  });

  const onSubmit = async (data: FormType) => {
    const newCategory = await makePost<FormType, SuplementCategory>(
      'categories',
      data,
      {
        authToken: companyToken,
        autoToast: true,
        toast,
      },
    );

    if (newCategory) {
      toast({
        title: 'Categoria registrada com sucesso',
      });
      toggleModal();
      form.reset();
    }
  };
  return (
    <>
      <ModalBody toggleModal={toggleModal} title="Registar Categoria de Lanche">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            {/* HIDDEN TYPE */}
            <FormField
              control={form.control}
              name="type"
              defaultValue="CATEGORY"
              render={({ field }) => (
                <FormItem className="hidden">
                  <DetailInput inputProps={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <DetailInput
                    title="Nome da Categoria"
                    placeholder="Ex: Promoção do Dia"
                    inputProps={field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <DetailInput
                    title="Descrição da Categoria"
                    placeholder="Ex: Promoção do Dia"
                    inputProps={field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-red-600 hover:bg-red-500">
              <PlusIcon className="font-bold w-6 h-auto" />
              Registrar Categoria
            </Button>
          </form>
        </Form>
      </ModalBody>
    </>
  );
}
