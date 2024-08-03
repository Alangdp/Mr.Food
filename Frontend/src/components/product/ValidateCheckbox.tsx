import { useState } from 'react';
import { Option } from '../../types/Product.type';
import { Checkbox } from '../ui/checkbox';
import ValidateExtraOptions from './Validate';

interface CheckboxWithValidationProps {
  option: Option;
  validator: ValidateExtraOptions;
}

export default function CheckboxWithValidation({
  option,
  validator,
}: CheckboxWithValidationProps) {
  const [status, setStatus] = useState(
    validator.getStatus(option.name) || false,
  );

  return (
    <Checkbox
      id={option.name}
      className="h-5 w-5 rounded-full bg-[#d6d6d6] shadow duration-300 text-white"
      checked={status}
      onCheckedChange={(toggleStatus: boolean) => {
        const status = validator.setStatus(
          toggleStatus ? 'add' : 'remove',
          option.name,
        );

        // if (status.message) {
        //   const message = status.message;
        //   if (message === 'ob') {
        //     toast({ title: 'Você precisa selecionar pelo menos uma opção' });
        //   }

        //   if (message === 'max') {
        //     toast({ title: 'Você atingiu o limite de opções' });
        //   }

        //   if (message === 'min') {
        //     toast({ title: 'Você precisa selecionar pelo menos uma opção' });
        //   }

        //   if (message === 'notFound') {
        //     toast({ title: 'Elemento não encontrado' });
        //   }
        // }

        setStatus(status.status);
      }}
    />
  );
}
