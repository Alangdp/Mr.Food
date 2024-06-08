import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(4, {
      message: 'Nome deve ter no mínimo 4 caracteres',
    }),
  cnpj: z
    .string({
      required_error: 'CNPJ é obrigatório',
    })
    .refine(
      value => {
        const replaced = value.replace(/\D/g, '')
        return replaced.length >= 14
      },
      {
        message: 'CNPJeve conter 14 caracteres',
      },
    )
    .refine(
      value => {
        const replaced = value.replace(/\D/g, '')
        return !!Number(replaced)
      },
      {
        message: 'CNPJ Deve conter apenas números',
      },
    ),
  email: z
    .string({
      required_error: 'Email é obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  phone: z
    .string({
      required_error: 'Telefone é obrigatório',
    })
    .length(11)
    .regex(/^(\d{2})(\d{5})(\d{4})/, {
      message: 'Telefone inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),

  cep: z.string().length(8),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),

  minOrder: z.number().min(0),
  paymentMethods: z.array(z.string()),
  address: z.string(),
})

export type FormSchema = z.infer<typeof formSchema>

export interface RegisterStepProps {
  form: UseFormReturn<FormSchema>
}

export { formSchema }
