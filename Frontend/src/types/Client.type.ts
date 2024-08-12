import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const ClientFormSchema = z.object({
  name: z
    .string({
      required_error: 'Nome é obrigatório',
    })
    .min(4, {
      message: 'Nome deve ter no mínimo 4 caracteres',
    }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),
  phoneNumber: z
    .string()
    .min(11, { message: 'Deve ser um número de telefone válido' })
    .max(11, { message: 'Deve ser um número de telefone válido' }),
});

const formSchemaLogin = z.object({
  phoneNumber: z
    .string()
    .min(11, { message: 'Deve ser um número de telefone válido' })
    .max(11, { message: 'Deve ter 11 caracteres' }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(8, {
      message: 'Senha deve ter no mínimo 8 caracteres',
    }),
});

export type ClientProps = z.infer<typeof ClientFormSchema>;
export type FormSchemaLogin = z.infer<typeof formSchemaLogin>;

export interface RegisterStepProps {
  form: UseFormReturn<ClientProps>;
}

export { ClientFormSchema, formSchemaLogin };
