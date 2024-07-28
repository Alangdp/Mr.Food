import { Button } from '@/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import RegisterStep1 from './RegisterStep1';
import { Form } from '@/components/ui/form';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import { registerCompanyPost } from '@/utils/Getter';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CompanyProps, formSchema } from '@/types/Company.type';

const firstStep = ['name', 'cnpj', 'email', 'phone', 'password'];
const secondStep = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
const thirdStep = ['minOrder', 'paymentMethods', 'address'];

export default function CompanyRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCompanyToken, companyToken } = useAuth();
  const [step, setStep] = useState(1);
  const form = useForm<CompanyProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      password: '',

      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',

      orderMinimum: 20,
      paymentMethods: [],
      address: '',
    },
  });

  const onSubmit = async (data: CompanyProps) => {
    const token = await registerCompanyPost(data);

    if (token) {
      setCompanyToken(token);
      toast({
        title: 'Cadastro realizado com sucesso',
      });
      navigate('/');
    }
  };

  const validateStep = async (
    fields: string[],
    form: UseFormReturn<CompanyProps>,
  ) => {
    let isValid = true;

    fields.map(async field => {
      const fieldValue = form.getValues(field as keyof CompanyProps);

      if (fieldValue === '') {
        form.trigger(field as keyof CompanyProps);
        isValid = false;
      }
      if (fieldValue !== '') {
        const result = await form.trigger(field as keyof CompanyProps);
        if (!result) {
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const nextStep = async () => {
    if (step === 1 && (await validateStep(firstStep, form))) {
      setStep(2);
    }

    if (step === 2 && (await validateStep(secondStep, form))) {
      setStep(3);
    }

    if (step === 3 && (await validateStep(thirdStep, form))) {
      console.log(await onSubmit(form.getValues()));
    }
  };
  return (
    <div className="h-screen w-relative overflow-hidden pr-12">
      <div className="bg-red-100 opacity-60 w-[1300px] h-[1300px] absolute rounded-full -top-48 -left-48 -z-10"></div>
      <div className="h-full mx-auto flex">
        <div className="flex-[0.5] hidden sm:block"></div>
        <div className="flex-[0.5] bg-white h-fit rounded-lg mt-14 shadow-lg drop-shadow">
          <div className="mx-auto mt-4 w-2/3 text-secondary">
            <h3 className="text-3xl font-medium text-center">
              Falta pouco para você vender conosco!
            </h3>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 flex flex-col items-center"
            >
              {step === 1 && <RegisterStep1 form={form} />}
              {step === 2 && <RegisterStep2 form={form} />}
              {step === 3 && <RegisterStep3 form={form} />}

              <div className="flex items-center justify-around gap-4 p-4">
                {step !== 1 && (
                  <Button onClick={() => setStep(step - 1)}>Anterior</Button>
                )}
                <Button onClick={nextStep}>Próximo</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
