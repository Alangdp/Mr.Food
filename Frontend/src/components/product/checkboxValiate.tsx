import { useState, useEffect } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Option } from '../../types/Product.type';
import ValidateExtraOptions from './Validate';

interface MyCheckboxProps {
  option: Option;
  index: number;
  validator: ValidateExtraOptions;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({
  option,
  index,
  validator,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    validator.selectedOptionsList.includes(option.name),
  );

  useEffect(() => {
    setIsChecked(validator.getStatusByIndex(index));
  }, [validator.selectedOptionsList]);

  const handleCheckedChange = (status: boolean) => {
    setIsChecked(validator.toggleOption(index, status));
  };

  return (
    <Checkbox
      id={option.name}
      className="h-5 w-5 rounded-full bg-[#d6d6d6] shadow duration-300 text-white"
      checked={isChecked}
      onCheckedChange={status => handleCheckedChange(status as boolean)}
    />
  );
};

export { MyCheckbox };
