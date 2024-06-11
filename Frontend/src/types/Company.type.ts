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
    .length(11, {
      message: 'Telefone deve ter 11 dígitos',
    })
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

  cep: z.string().length(9, {
    message: 'CEP deve ter 9 caracteres',
  }),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  address: z.string(),

  orderMinimum: z.number().min(0),
  paymentMethods: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'Você deve selecionar ao menos uma forma de pagamento',
    })
    .default([]),
  deliveryOptions: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'Você deve selecionar ao menos uma forma de pagamento',
    })
    .default([]),
})

const formSchemaLogin = z.object({
  email: z
    .string({
      required_error: 'Email é obrigatório',
    })
    .email({
      message: 'Email inválido',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),
})

export type CompanyProps = z.infer<typeof formSchema>
export type FormSchemaLogin = z.infer<typeof formSchemaLogin>

export interface RegisterStepProps {
  form: UseFormReturn<CompanyProps>
}

export { formSchema, formSchemaLogin }
