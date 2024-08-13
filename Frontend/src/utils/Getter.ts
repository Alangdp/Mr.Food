/* eslint-disable @typescript-eslint/no-explicit-any */
import { Toast, ToasterToast } from '@/components/ui/use-toast';
import { CEP } from '@/types/Cep.type';
import { CompanyProps } from '@/types/Company.type';
import { OrderProps } from '@/types/Order.type';
import { ResponseProps } from '@/types/Responses.type';
import axios from 'axios';
import objectToFormData from './AppendFormData';
import { GetterOptions } from '@/types/Utils.type';

const API_URL = import.meta.env.VITE_BACKEND_URL as string;

export async function getCEP(cep: string) {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  if (response.status !== 200) throw new Error('CEP inválido');
  return response.data as CEP;
}

export async function validateToken(token: string) {
  try {
    const response = await makeGet<CompanyProps>('companies', {
      authToken: token,
    });
    return response ? true : false;
  } catch (error) {
    return false;
  }
}

export async function validateTokenClient(token: string) {
  try {
    const response = await makeGet<CompanyProps>('clients', {
      authToken: token,
    });
    return response ? true : false;
  } catch (error) {
    return false;
  }
}

// Reutilizable function to changeStatus
export async function setStatus(
  token: string,
  orderId: string,
  status: number,
) {
  try {
    const response = await makePost<
      {
        orderId: string;
        status: number;
      },
      OrderProps
    >(
      'orders/status',
      {
        orderId: orderId,
        status: status,
      },
      {
        authToken: token,
      },
    );

    if (response) return true;
    return false;
  } catch (error) {
    return false;
  }
}

function handleApiError(error: any): string[] {
  if (error.response && error.response.data) {
    const errorResponse: ResponseProps<unknown> = error.response.data;
    if (errorResponse.errors) {
      return errorResponse.errors.map(error => error.message);
    }
  }
  return [error.message || 'Erro desconhecido'];
}

export async function makePost<T, Y>(
  apiComplement: string,
  data: T,
  options: GetterOptions,
) {
  try {
    const response = await axios.post(`${API_URL}/${apiComplement}`, data, {
      headers: {
        Authorization: options.authToken,
      },
    });
    const responseData: ResponseProps<Y> = response.data;
    if (responseData.errors && responseData.errors.length > 0) {
      if (options.toast && options.autoToast) {
        responseData.errors.forEach(error => {
          options.toast!({
            title: error.message,
            variant: 'destructive',
          });
        });
      }
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    const errors = handleApiError(error);
    if (options.toast && options.autoToast) {
      errors.forEach(error => {
        options.toast!({
          title: error,
          variant: 'destructive',
        });
      });
    }

    return null;
  }
}

export async function makePut<T, Y>(
  apiComplement: string,
  data: T,
  options: {
    toast?: ({ ...props }: Toast) => {
      id: string;
      dismiss: () => void;
      update: (props: ToasterToast) => void;
    };
    autoToast?: boolean;
    authToken?: string | null;
  },
) {
  try {
    const response = await axios.put(`${API_URL}/${apiComplement}`, data, {
      headers: {
        Authorization: options.authToken,
      },
    });
    const responseData: ResponseProps<Y> = response.data;
    if (responseData.errors && responseData.errors.length > 0) {
      if (options.toast && options.autoToast) {
        responseData.errors.forEach(error => {
          options.toast!({
            title: error.message,
            variant: 'destructive',
          });
        });
      }
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    const errors = handleApiError(error);
    if (options.toast && options.autoToast) {
      errors.forEach(error => {
        options.toast!({
          title: error,
          variant: 'destructive',
        });
      });
    }

    return null;
  }
}

export async function makeGet<Y>(
  apiComplement: string,
  options: {
    toast?: ({ ...props }: Toast) => {
      id: string;
      dismiss: () => void;
      update: (props: ToasterToast) => void;
    };
    autoToast?: boolean;
    authToken?: string | null;
    url?: string;
  },
) {
  try {
    const response = await axios.get(`${API_URL}/${apiComplement}`, {
      headers: {
        Authorization: options.authToken,
      },
    });
    const responseData: ResponseProps<Y> = response.data;
    if (responseData.errors && responseData.errors.length > 0) {
      if (options.toast && options.autoToast) {
        responseData.errors.forEach(error => {
          options.toast!({
            title: error.message,
            variant: 'destructive',
          });
        });
      }
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    const errors = handleApiError(error);
    if (options.toast && options.autoToast) {
      errors.forEach(error => {
        options.toast!({
          title: error,
          variant: 'destructive',
        });
      });
    }

    return null;
  }
}

export async function makeRequestWithFormData<T extends Record<string, any>, Y>(
  apiComplement: string,
  data: T,
  options: {
    type: 'post' | 'put';
    toast?: ({ ...props }: Toast) => {
      id: string;
      dismiss: () => void;
      update: (props: ToasterToast) => void;
    };
    autoToast?: boolean;
    authToken?: string | null;
  },
) {
  try {
    const formData = objectToFormData(data);

    let response: any;

    if (options.type === 'post') {
      response = await axios.post(`${API_URL}/${apiComplement}`, formData, {
        headers: {
          Authorization: options.authToken ? `${options.authToken}` : '',
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    if (options.type === 'put') {
      response = await axios.put(`${API_URL}/${apiComplement}`, formData, {
        headers: {
          Authorization: options.authToken ? `${options.authToken}` : '',
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    const responseData: ResponseProps<Y> = response.data;

    if (responseData.errors && responseData.errors.length > 0) {
      if (options.toast && options.autoToast) {
        responseData.errors.forEach((error: any) => {
          options.toast!({
            title: error.message,
            variant: 'destructive',
          });
        });
      }
      return null;
    }

    return responseData.data || null;
  } catch (error) {
    const errors = handleApiError(error);
    if (options.toast && options.autoToast) {
      errors.forEach((error: string) => {
        options.toast!({
          title: error,
          variant: 'destructive',
        });
      });
    }

    return null;
  }
}
