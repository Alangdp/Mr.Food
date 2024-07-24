import { Category, Option } from '../Types/CategoryAndOptions.type.js';

type ValidationResult = {
  isValid: boolean;
  categories?: Category[];
  options?: Option[];
};

export function isValidExtrasStructure(extras: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    categories: [],
    options: [],
  };

  // Verifica se extras é um array
  if (!Array.isArray(extras)) {
    return { isValid: false };
  }

  // Função para validar cada extraItem recursivamente
  const validateExtraItem = (extraItem: any): Category | null => {
    console.log(extraItem);
    if (
      typeof extraItem !== 'object' ||
      extraItem === null ||
      typeof extraItem.name !== 'string' ||
      extraItem.name.trim() === '' ||
      typeof extraItem.obrigatory !== 'boolean' ||
      typeof extraItem.min !== 'number' ||
      isNaN(extraItem.min) ||
      extraItem.min < 0 ||
      typeof extraItem.max !== 'number' ||
      isNaN(extraItem.max) ||
      extraItem.max < 1 ||
      !Array.isArray(extraItem.itens)
    ) {
      result.isValid = false;
      return null;
    }

    const category: Category = {
      name: extraItem.name,
      min: extraItem.min,
      max: extraItem.max,
      obrigatory: extraItem.obrigatory,
      extras: [],
    };

    // Verifica cada item dentro de itens
    for (const item of extraItem.itens) {
      if (
        typeof item !== 'object' ||
        item === null ||
        typeof item.name !== 'string' ||
        item.name.trim() === '' ||
        typeof item.price !== 'number' ||
        isNaN(item.price) ||
        item.price < 0
      ) {
        result.isValid = false;
        return null;
      }

      const option: Option = {
        name: item.name,
        price: item.price,
      };

      result.options?.push(option);
    }

    // Valida recursivamente os extras dentro de extraItem
    if (Array.isArray(extraItem.extras)) {
      for (const nestedExtraItem of extraItem.extras) {
        const nestedCategory = validateExtraItem(nestedExtraItem);
        if (nestedCategory) {
          category.extras.push(nestedCategory);
        } else {
          result.isValid = false;
          return null;
        }
      }
    }

    return category;
  };

  // Valida todos os itens no array extras
  for (const extraItem of extras) {
    const category = validateExtraItem(extraItem);
    if (category) {
      result.categories?.push(category);
    } else {
      result.isValid = false;
      return result;
    }
  }

  return result;
}
