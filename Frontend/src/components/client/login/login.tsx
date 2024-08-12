import { zodResolver } from '@hookform/resolvers/zod';
import { formSchemaLogin, ClientProps } from '@/types/Client.type';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { makePost } from '@/utils/Getter';
import { useDefaultImports } from '@/components/utilities/DefaultImports';
import { formatPhone } from '@/utils/Formater';

export default function ClientLogin() {
  const { auth, navigate, toast } = useDefaultImports();

  const form = useForm<ClientProps>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  const onsubmit = async (data: { phoneNumber: string; password: string }) => {
    const token = await makePost<
      { phoneNumber: string; password: string },
      string
    >('clients/login', data, {
      toast,
      autoToast: true,
    });

    if (!token) return;
    auth.updateClientToken(token);
    toast({
      title: 'Logado com sucesso',
    });
    navigate('/');
  };

  return (
    <div className="h-[94vh] w-screen relative overflow-hidden">
      <div className="bg-red-100 opacity-60 w-[1000px] h-[1000px] absolute rounded-full -top-48 -left-48 -z-10"></div>
      <div className="w-4/5 h-full mx-auto flex">
        <div className="flex-[0.5]"></div>
        <div className="flex-[0.5] p-4 bg-white w-fit h-fit rounded-lg mt-14 shadow-lg drop-shadow">
          <div className="mx-auto mt-4 w-2/3 text-secondary ">
            <h3 className="text-3xl font-medium text-center">
              Bem-Vindo Novamente!
            </h3>
          </div>

          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onsubmit)}
              className="mt-4 space-y-8 flex flex-col items-center"
            >
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow drop-shadow-lg text-secondary w-[350px]"
                        placeholder="51 9 9999-9999"
                        {...field}
                        value={formatPhone(field.value)}
                      />
                    </FormControl>
                    <div className="flex items-center gap-2">
                      {!form.getFieldState('phoneNumber').error && (
                        <FormDescription className="pl-1">
                          Telefone da conta
                        </FormDescription>
                      )}
                      <FormMessage className="pl-1" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow drop-shadow-lg text-secondary w-[350px]"
                        placeholder="*********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <div className="flex items-center gap-2">
                      {!form.getFieldState('password').error && (
                        <FormDescription className="pl-1">
                          Senha da conta
                        </FormDescription>
                      )}
                      <FormMessage className="pl-1" />
                    </div>
                  </FormItem>
                )}
              />

              <p className="text-secondary">
                Não tem conta?{' '}
                <a
                  href="/client/register"
                  className="font-medium underline text-black"
                >
                  Clique aqui
                </a>
              </p>

              <Button type="submit">Entrar</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
