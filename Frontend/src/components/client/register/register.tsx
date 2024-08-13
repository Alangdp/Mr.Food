import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDefaultImports } from '@/components/utilities/DefaultImports';
import { ClientProps, ClientFormSchema } from '@/types/Client.type';
import { formatCNPJ, formatPhone } from '@/utils/Formater';
import { makePost } from '@/utils/Getter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

export default function ClientRegister() {
  const { auth, navigate, toast } = useDefaultImports();

  const form = useForm<ClientProps>({
    resolver: zodResolver(ClientFormSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: ClientProps) => {
    const token = await makePost<ClientProps, string>('clients', data, {
      autoToast: true,
      toast,
    });

    if (token) {
      auth.updateClientToken(token);
      toast({
        title: 'Cadastro realizado com sucesso',
      });
      navigate('/');
    }
  };

  return (
    <div className="h-[94vh] w-screen relative overflow-hidden">
      <div className="bg-red-100 opacity-60 w-[1000px] h-[1000px] absolute rounded-full -top-48 -left-48 z-10"></div>
      <div className="h-full mx-auto flex">
        <div className="flex-[0.5] hidden sm:block"></div>
        <div className="flex-[0.5] bg-white h-fit rounded-lg mt-14 shadow-lg drop-shadow">
          <div className="mx-auto mt-4 w-2/3 text-secondary">
            <h3 className="text-3xl font-medium text-center">
              Falta pouco para você vender conosco!
            </h3>
          </div>
          <Form {...form}>
            <form action="" onSubmit={form.handleSubmit(onSubmit)}>
              <span className="flex flex-col items-center">
                <div className="flex gap-4 items-center w-3/4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mt-4 w-fit">
                          <FormLabel className="pl-1">Nome</FormLabel>
                          <FormControl>
                            <Input
                              className="shadow drop-shadow-lg text-secondary w-[350px]"
                              placeholder="José"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex items-center gap-2">
                            {!form.getFieldState('name').error && (
                              <FormDescription className="pl-1">
                                Nome do cliente
                              </FormDescription>
                            )}
                            <FormMessage className="pl-1" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className="mt-4 w-fit">
                          <FormLabel className="pl-1">Telefone</FormLabel>
                          <FormControl>
                            <Input
                              className="shadow drop-shadow-lg text-secondary w-[350px]"
                              placeholder="11999999999"
                              {...field}
                              maxLength={11}
                            />
                          </FormControl>
                          <div className="flex items-center gap-2">
                            {!form.getFieldState('phoneNumber').error && (
                              <FormDescription className="pl-1">
                                Telefone do cliente
                              </FormDescription>
                            )}
                            <FormMessage className="pl-1" />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-start w-3/4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mt-4 w-fit">
                        <FormLabel className="pl-1">Senha</FormLabel>
                        <FormControl>
                          <Input
                            className="shadow drop-shadow-lg text-secondary w-[350px]"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex items-center gap-2">
                          {!form.getFieldState('password').error && (
                            <FormDescription className="pl-1">
                              Senha do cliente
                            </FormDescription>
                          )}
                          <FormMessage className="pl-1" />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-around gap-4 p-4 ">
                  <Button type="submit" className="bg-red-600 hover:bg-red-500">
                    Cadastrar
                  </Button>
                </div>
              </span>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
