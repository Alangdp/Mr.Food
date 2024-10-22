import { useState } from 'react';
import { Item } from '../../types/Product.type';
import { Checkbox } from '../ui/checkbox';
import ValidateExtraOptions from './Validate';
import { ExtraOption } from './Cart.type';

interface CheckboxWithValidationProps {
  option: Item;
  validator: ValidateExtraOptions;
}

export default function CheckboxWithValidation({
  option,
  validator,
}: CheckboxWithValidationProps) {
  const extraOption = {
    name: option.name,
    value: option.price,
    quantity: 0,
  };

  const [status, setStatus] = useState(
    validator.getStatus(extraOption) || false,
  );

  return (
    <Checkbox
      id={option.name}
      className="h-5 w-5 rounded-full bg-[#d6d6d6] shadow duration-300 text-white"
      checked={status}
      onCheckedChange={(toggleStatus: boolean) => {
        const status = validator.setStatus(
          toggleStatus ? 'add' : 'remove',
          extraOption,
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
