import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterStepProps } from '@/types/Company.type';
import { formatCEP } from '@/utils/Formater';
import { getCEP } from '@/utils/Getter';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function RegisterStep2({ form }: RegisterStepProps) {
  useEffect(() => {
    const fetchAddress = async (cep: string) => {
      const data = await getCEP(cep);

      form.setValue('street', data.logradouro);
      form.setValue('neighborhood', data.bairro);
      form.setValue('city', data.localidade);
      form.setValue('state', data.uf);
      form.setValue(
        'address',
        `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
      );
    };

    fetchAddress(form.getValues('cep'));
  }, [form.getValues('cep')]);

  return (
    <AnimatePresence>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ x: '100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">CEP</FormLabel>
                <FormControl>
                  <Input
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="00000-000"
                    {...field}
                    onChange={e => {
                      form.setValue('cep', formatCEP(e.target.value));
                    }}
                    maxLength={9}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('cep').error && (
                    <FormDescription className="pl-1">
                      CEP da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Rua</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="Rua das Flores"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('street').error && (
                    <FormDescription className="pl-1">
                      Rua da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Número</FormLabel>
                <FormControl>
                  <Input
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="123"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('number').error && (
                    <FormDescription className="pl-1">
                      Número da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Bairro</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="Centro"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('neighborhood').error && (
                    <FormDescription className="pl-1">
                      Bairro da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Cidade</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="São Paulo"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('city').error && (
                    <FormDescription className="pl-1">
                      Cidade da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Estado</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="SP"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('state').error && (
                    <FormDescription className="pl-1">
                      Estado da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />
        </div>
      </motion.span>
    </AnimatePresence>
  );
}
