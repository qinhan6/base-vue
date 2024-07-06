import { AxiosRequestConfig } from 'axios';
import { requestInstance } from './request';

export function get<T = any, U = any> (
  config: AxiosRequestConfig,
  url: string,
  params?: U
): Promise<T> {
  return requestInstance({ 
    ...config,
    url,
    method: 'GET',
    params
  })
}

export function post<T = any, U = any> (
  config: AxiosRequestConfig,
  url: string,
  data?: U
): Promise<T> {
  return requestInstance({ 
    ...config,
    url,
    method: 'POST',
    data
  })
}

export function put<T = any, U = any> (
  config: AxiosRequestConfig,
  url: string,
  data?: U
): Promise<T> {
  return requestInstance({ 
    ...config,
    url,
    method: 'PUT',
    data
  })
}

export function del<T = any, U = any> (
  config: AxiosRequestConfig,
  url: string,
  data?: U
): Promise<T> {
  return requestInstance({ 
    ...config,
    url,
    method: 'DELETE',
    data
  })
}