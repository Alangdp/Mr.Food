import { Input } from '@/components/ui/input'
import { StepProps } from '@/types/StepProps'
import { useState } from 'react'

// const requiredFields1 = ['Nome', 'CNPJ', 'Email', 'Telefone', 'Senha']
// const requiredFields1 = ['CEP', 'Rua', 'Número', 'Bairro', 'Cidade', 'Estado']
// const requiredFields2 = ['Pedido Minimo', 'Metodos de pagamento', 'endereço']

export default function CompanyRegisterStep2({ onNext, onChange, onPreviuos}: StepProps) {
  const [formData, setFormData] = useState({
    'minimum-order': '',
    'payment-methods': '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    onChange?.(formData)
  }

  return (
    <div className="">
      {['minium-order', 'payment-methods'].map(field => (
        <div className="mt-2 p-2" key={field}>
          <label htmlFor={field}></label>
          <Input
            onChange={handleChange}
            name={field.toLowerCase()}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full h-10 border border-gray-300 rounded-md"
          />
        </div>
      ))}

      <div className="mt-2 p-2">
        <button
          onClick={onNext}
          className="w-full h-10 bg-secondary text-white rounded-md"
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
