import { ProductResponse } from './Product.type';

export interface CompanyDataProducts {
  company: Company;
  products: ProductResponse[];
  categories: Category[];
}

export interface Company {
  id: number;
  name: string;
  logo: string;
  phone: string;
  orderMinimum: string;
  deliveryOptions: string[];
}

export interface Product {
  id: number;
  companyId: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  discountPercent: number;
  active: boolean;
  extras: Extra[];
  createdAt: string;
  updatedAt: string;
}

export interface Extra {
  max: number;
  min: number;
  name: string;
  itens: Iten[];
  obrigatory: boolean;
}

export interface Iten {
  name: string;
  price: number;
}

export interface Category {
  id: number;
  min: any;
  max: any;
  obrigatory: boolean;
  type: string;
  active: boolean;
  companyId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const deliveryOptions = {
  dine_in: 'Comer no Local',
  takeaway: 'Para Levar',
  delivery: 'Entrega',
  drive_thru: 'Drive Thru',
  curbside: 'Curbside Pickup',
  delivery_partner: 'Parceiro de Entrega',
} as const;

export { deliveryOptions };
