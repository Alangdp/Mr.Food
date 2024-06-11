import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterStepProps } from '@/types/Company.type'
import { formatCNPJ } from '@/utils/Formater'
import { AnimatePresence, motion } from 'framer-motion'

export default function RegisterStep1({ form }: RegisterStepProps) {
  return (
    <AnimatePresence>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ x: '100px', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Nome</FormLabel>
                <FormControl>
                  <Input
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="Hamburgueria do Zé"
                    {...field}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('name').error && (
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
            name="cnpj"
            render={({ field: { onChange, ...props } }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">CNPJ</FormLabel>
                <FormControl>
                  <Input
                    className="shadow drop-shadow-lg text-secondary w-[350px]"
                    placeholder="00.000.000/0000-00"
                    onChange={e => {
                      const { value } = e.target
                      e.target.value = formatCNPJ(value)
                      onChange(e)
                    }}
                    {...props}
                    maxLength={18}
                  />
                </FormControl>
                <div className="flex items-center gap-2">
                  {!form.getFieldState('cnpj').error && (
                    <FormDescription className="pl-1">
                      CNPJ da empresa
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
            name="email"
            render={({ field }) => (
              <FormItem className="mt-4 w-fit">
                <FormLabel className="pl-1">Email</FormLabel>
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
                      Email da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
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
                  {!form.getFieldState('phone').error && (
                    <FormDescription className="pl-1">
                      Telefone da empresa
                    </FormDescription>
                  )}
                  <FormMessage className="pl-1" />
                </div>
              </FormItem>
            )}
          />
        </div>

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
                {!form.getFieldState('phone').error && (
                  <FormDescription className="pl-1">
                    Senha da empresa
                  </FormDescription>
                )}
                <FormMessage className="pl-1" />
              </div>
            </FormItem>
          )}
        />
      </motion.span>
    </AnimatePresence>
  )
}
