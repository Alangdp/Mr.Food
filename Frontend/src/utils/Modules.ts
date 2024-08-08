import { GetterOptions } from '@/types/Utils.type';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL as string;

export async function getModule<T>(
  props: {
    url?: string;
    apiComplement?: string;
  },
  options: GetterOptions,
): Promise<T> {
  if (props.url) {
    const response = await axios.get(props.url);
    return response.data;
  }

  const response = await axios.get(`${API_URL}/${props.apiComplement}`, {
    headers: {
      Authorization: options.authToken,
    },
  });

  return response.data;
}

export async function postModule<T, Y>(
  props: {
    url?: string;
    apiComplement?: string;
  },
  data: T,
  options: GetterOptions,
): Promise<Y> {
  if (props.url) {
    const response = await axios.post(props.url);
    return response.data;
  }

  const response = await axios.post(`${API_URL}/${props.apiComplement}`, data, {
    headers: {
      Authorization: options.authToken,
    },
  });

  return response.data;
}
