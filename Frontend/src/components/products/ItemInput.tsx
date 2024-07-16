import { ReactNode } from 'react';
import { Input } from '../ui/input';

interface DetailInputProps {
  title: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  type?: string;
  substitute?: ReactNode;
}

export default function DetailInput({
  title,
  isDisabled,
  isRequired,
  placeholder,
  inputProps,
  type,
  substitute,
}: DetailInputProps) {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex gap-4">
        <h4 className="text-xl font-medium">{title}</h4>
        {isRequired && (
          <p className="text-secondary font-sm opacity-70">(Obrigatório)</p>
        )}
      </div>
      {substitute ? (
        <span className="w-4/5">{substitute}</span>
      ) : (
        <Input
          {...inputProps}
          disabled={isDisabled}
          placeholder={placeholder}
          className="border border-gray-200 p-2 rounded-lg w-4/5"
          type={type || 'text'}
        />
      )}
    </div>
  );
}
