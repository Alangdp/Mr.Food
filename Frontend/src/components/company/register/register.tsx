import NavBar from '@/components/navigators/navbar'
import { Button } from '@/components/ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { UseFormReturn, set, useForm } from 'react-hook-form'
import { z } from 'zod'
import RegisterStep1 from './RegisterStep1'
import { Form } from '@/components/ui/form'
import { FormSchema, formSchema } from '@/types/RegisterProps'
import RegisterStep2 from './RegisterStep2'

const firstStep = ['name', 'cnpj', 'email', 'phone', 'password']
const secondStep = ['cep', 'street', 'number', 'neighborhood', 'city', 'state']
const thirdStep = ['minOrder', 'paymentMethods', 'address']

export default function CompanyRegister() {
  const [step, setStep] = useState(1)
  console.log(step)

  const form = useForm<FormSchema>({
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

      minOrder: 0,
      paymentMethods: [],
      address: '',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const validateStep = async (fields: string[], form: UseFormReturn<FormSchema>) => {
    let isValid = true;

    fields.map(async (field) => {
      const fieldValue = form.getValues(field as keyof FormSchema);

      if (fieldValue === '') {
        form.trigger(field as keyof FormSchema);
        isValid = false;
      }
      if (fieldValue !== '') {
        const result = await form.trigger(field as keyof FormSchema);
        console.log(result);
        if (!result) {
          isValid = false;
        }
      }
    })

    console.log(isValid);
    return isValid;
  }

  const nextStep = async () => {
    if(step === 1) {
      if(await validateStep(firstStep, form)) {
        setStep(2)
      }
    }
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <NavBar />
      <div className="bg-red-100 opacity-60 w-[1300px] h-[1300px] absolute rounded-full -top-48 -left-48 -z-10"></div>
      <div className="w-4/5 h-full mx-auto bg-blue-100 flex">
        <div className="flex-[0.5]"></div>
        <div className="flex-[0.5]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && <RegisterStep1 form={form} />}
              {step === 2 && <RegisterStep2 form={form} />}

              <div className="flex itesm-center justify-around gap-4">
                <Button onClick={nextStep}>Próximo</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
