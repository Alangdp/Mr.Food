/* eslint-disable @typescript-eslint/no-explicit-any */
import { CEP } from '@/types/Cep.type'
import { CompanyProps } from '@/types/Company.type'
import { OrderProps } from '@/types/Order.type'
import { ResponseProps } from '@/types/Responses.type'
import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND_URL as string

export async function getCEP(cep: string) {
  console.log()
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  if (response.status !== 200) throw new Error('CEP inválido')
  return response.data as CEP
}

export async function registerCompanyPost(data: CompanyProps) {
  const response: ResponseProps<string> = (
    await axios.post(`${API_URL}/companies`, data)
  ).data
  return response.data
}

export async function validateToken(token: string) {
  try {
    const response = await axios.get(`${API_URL}/companies`, {
      headers: {
        Authorization: `${token}`,
      },
    })

    console.log(response.status)
    if (response.status !== 200) return false
    return true
  } catch (error) {
    return false
  }
}

export async function loginCompanyPost(data: {
  email: string
  password: string
}) {
  try {
    const response = await axios.post(`${API_URL}/companies/login`, data)
    const responseData: ResponseProps<string> = response.data
    console.log(responseData)
    return responseData.data!
  } catch (error: any) {
    console.log(error)
    console.log(error.response)
    console.log(error.response.data)

    if (error.response && error.response.data) {
      const errorResponse: ResponseProps<unknown> = error.response.data
      if (errorResponse.errors) {
        return errorResponse.errors.map(error => error.message)
      }
    }

    return [error.message as string]
  }
}

export async function getOrders(token: string) {
  const response = await axios.get(`${API_URL}/orders`, {
    headers: {
      authorization: token,
    },
  })
  const responseData: ResponseProps<OrderProps[]> = response.data
  if(!responseData.data) throw new Error("Error Getting Orders")
  return responseData.data;
}

export async function setStatus(token: string, orderId: string, status: number) {
  try {
    const response = await axios.post(`${API_URL}/orders/status`, {
      orderId: orderId,
      status: status
    }, {
      headers: {
        Authorization: token
      }
    })
    if(response.status !== 200) return false;
    return true;
  } catch (error) {
    return false;
  }
}
