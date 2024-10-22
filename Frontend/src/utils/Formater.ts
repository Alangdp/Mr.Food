import { Cart } from '@/components/product/Cart.type';
import { Extra, ItemOption, OptionValue } from '@/types/OrderItem.type';

export const formatCNPJ = (value: string) => {
  if (!value) return '';
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const formatCEP = (value: string) => {
  if (!value) return '';
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue.replace(/(\d{5})(\d)/, '$1-$2');
};

export const formatPhone = (value: string) => {
  if (!value) return '';
  const cleanedValue = value.replace(/\D/g, '');

  return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const cartDataToOrderItem = (cart: Cart): ItemOption[] => {
  const orderItem: ItemOption[] = [];

  for (const item of cart.products) {
    orderItem.push({
      productId: Number(item.id),
      quantity: item.quantity,
      extras: Object.keys(item.extras).reduce((ac, key) => {
        const extra: Extra = {};
        const extraItem = item.extras[key];

        extra[key] = [
          ...extraItem.selectedOptions.map(extraItem => {
            return {
              extraName: extraItem.name,
              quantity: extraItem.quantity,
              price: extraItem.value,
            };
          }),
        ];

        ac = extra;
        return ac;
      }, {} as Extra),
    });
  }

  return orderItem;
};
