import NavBar from '@/components/navigators/navbar'
import { zodResolver } from '@hookform/resolvers/zod'
import { CompanyProps, formSchemaLogin } from '@/types/Company.type'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { loginCompanyPost } from '@/utils/Getter'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CompanyLogin() {
  const { toast } = useToast();
  const { updateCompanyToken, companyToken } = useAuth();
  const navigate = useNavigate();

  console.log(companyToken);

  const form = useForm<CompanyProps>({
    resolver: zodResolver(formSchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onsubmit = async (data: { email: string; password: string }) => {
    const token = await loginCompanyPost(data);

    if(Array.isArray(token)) {
      token.forEach( error => {
        toast({
          title: error,
          variant: "destructive",
        })
      })
      return;
    }

    updateCompanyToken(token);
    toast({
      title: "Logado com sucesso",
    });
    navigate('/company/register')
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div className="bg-red-100 opacity-60 w-[1300px] h-[1300px] absolute rounded-full -top-48 -left-48 -z-10"></div>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow drop-shadow-lg text-secondary w-[350px]"
                        placeholder="email@email.com"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center gap-2">
                      {!form.getFieldState('email').error && (
                        <FormDescription className="pl-1">
                          Nome da empresa
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

              <Button type='submit'>Entrar</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
