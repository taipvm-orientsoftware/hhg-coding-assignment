import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

export interface IGetWithPaginationResponse<T> {
  items: T[];
  total: number;
}

export default abstract class BaseApiService<T = unknown> {
  private axios: AxiosInstance;

  protected abstract baseRoute: string;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_BASE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.axios.interceptors.request.use(this.interceptBeforeRequest, this.interceptRequestError);
    this.axios.interceptors.response.use(this.interceptResponseData, this.interceptResponseError);
  }

  private interceptBeforeRequest = <D>(config: AxiosRequestConfig<D>) => {
    if (config.headers) {
      const accessToken = localStorage.getItem('access_token');
      config.headers['X-Access-Token'] = `Bearer ${accessToken ?? ''}`;
    }
    return config;
  };

  private interceptRequestError = <D>(error: AxiosError<T, D>) => {
    return Promise.reject<AxiosError<T, D>>(error);
  };

  private interceptResponseData = (response: AxiosResponse<T>) => {
    return response;
  };

  private interceptResponseError = <D>(error: AxiosError<T, D>) => {
    if (error.response?.status === 401) {
      // TODO redirect login
    }
    return Promise.reject<AxiosError<T, D>>(error);
  };

  public get(path: string, params?: unknown, config?: AxiosRequestConfig) {
    return this.axios.get<T>(path, { params, ...config });
  }

  public getWithPagination(path: string, params?: IGetWithPaginationRequest, config?: AxiosRequestConfig) {
    return this.axios.get<IGetWithPaginationResponse<T>>(path, { params, ...config });
  }

  public post<D>(path: string, data: D, config?: AxiosRequestConfig<D>) {
    return this.axios.post<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public put<D>(path: string, data: D, config?: AxiosRequestConfig<D>) {
    return this.axios.put<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public patch<D>(path: string, data: D, config?: AxiosRequestConfig<D>) {
    return this.axios.patch<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public delete(path: string, params?: unknown, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(path, { params, ...config });
  }
}
