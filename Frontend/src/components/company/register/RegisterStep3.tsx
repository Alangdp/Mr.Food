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
import { AnimatePresence, motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';

const opcoesDeEntrega = [
  {
    id: 'dine_in',
    label: 'Comer no Local',
  },
  {
    id: 'takeaway',
    label: 'Para Levar',
  },
  {
    id: 'delivery',
    label: 'Entrega',
  },
  {
    id: 'drive_thru',
    label: 'Drive Thru',
  },
  {
    id: 'curbside',
    label: 'Curbside Pickup',
  },
  {
    id: 'delivery_partner',
    label: 'Parceiro de Entrega',
  },
] as const;

const metodosDePagamento = [
  {
    id: 'cartao_credito',
    label: 'Cartão de Crédito',
  },
  {
    id: 'cartao_debito',
    label: 'Cartão de Débito',
  },
  {
    id: 'dinheiro',
    label: 'Dinheiro',
  },
  {
    id: 'pix',
    label: 'Pix',
  },
  {
    id: 'vale',
    label: 'Vale',
  },
  {
    id: 'pagamento_online',
    label: 'Pagamento Online',
  },
] as const;

export default function RegisterStep3({ form }: RegisterStepProps) {
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
            name="paymentMethods"
            render={() => (
              <FormItem className="mt-4 w-fit">
                <div className="mb-4">
                  <FormLabel className="text-base">
                    Formas de pagamento
                  </FormLabel>
                  <FormDescription className="pl-1">
                    Selecione as formas de pagamento aceitas.
                  </FormDescription>
                </div>
                {metodosDePagamento.map(metodo => (
                  <FormField
                    key={metodo.id}
                    control={form.control}
                    name="paymentMethods"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={metodo.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(metodo.id)}
                              onCheckedChange={checked => {
                                return checked
                                  ? field.onChange([...field.value, metodo.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== metodo.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {metodo.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryOptions"
            render={({ field }) => {
              if (!field.value) {
                field.value = [];
              }
              return (
                <FormItem className="mt-4 w-fit">
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Formas de retirada/entrega
                    </FormLabel>
                    <FormDescription className="pl-1">
                      Selecione as formas de retirada/entrega aceitas.
                    </FormDescription>
                  </div>
                  {opcoesDeEntrega.map(metodo => (
                    <FormItem
                      key={metodo.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(metodo.id)}
                          onCheckedChange={checked => {
                            const newValue = checked
                              ? [...field.value, metodo.id]
                              : field.value?.filter(
                                  (value: string) => value !== metodo.id,
                                );
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {metodo.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="orderMinimum"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="pl-1">Pedido minimo</FormLabel>
              <FormControl>
                <Input
                  className="shadow drop-shadow-lg text-secondary w-[350px]"
                  placeholder="Pedido minimo"
                  {...field}
                  onChange={e => {
                    form.setValue('orderMinimum', Number(e.target.value));
                  }}
                  type="number"
                />
              </FormControl>
              <div className="flex items-center gap-2">
                {!form.getFieldState('orderMinimum').error && (
                  <FormDescription className="pl-1">
                    Pedido mínimo para entrega
                  </FormDescription>
                )}
                <FormMessage className="pl-1" />
              </div>
            </FormItem>
          )}
        />
      </motion.span>
    </AnimatePresence>
  );
}
