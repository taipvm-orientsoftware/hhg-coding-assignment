import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

export interface IGetWithPaginationResponse<T> {
  items: T[];
  total: number;
}

export default abstract class BaseApiService {
  protected abstract baseRoute: string;
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.axios.interceptors.request.use(this.interceptBeforeRequest.bind(this), this.interceptRequestError.bind(this));
    this.axios.interceptors.response.use(this.interceptResponseData.bind(this), this.interceptResponseError.bind(this));
  }

  private async interceptBeforeRequest<D>(config: AxiosRequestConfig<D>) {
    if (config.headers) {
      const accessToken = localStorage.getItem('access_token');
      config.headers['X-Access-Token'] = `Bearer ${accessToken}`;
    }
    return config;
  }

  private interceptRequestError<T, D>(error: AxiosError<T, D>) {
    return Promise.reject<AxiosError<T, D>>(error);
  }

  private interceptResponseData<T>(response: AxiosResponse<T>) {
    return response;
  }

  private interceptResponseError<T, D>(error: AxiosError<T, D>) {
    if (error.response?.status === 401) {
      // TODO redirect login
    }
    return Promise.reject<AxiosError<T, D>>(error);
  }

  public get<T>(path: string, params?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(path, { params, ...config });
  }

  public getWithPagination<T>(
    path: string,
    params?: IGetWithPaginationRequest,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IGetWithPaginationResponse<T>>> {
    return this.get<IGetWithPaginationResponse<T>>(path, params, config);
  }

  public post<T, D>(path: string, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return this.axios.post<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public put<T, D>(path: string, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return this.axios.put<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public patch<T, D>(path: string, data: D, config?: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>> {
    return this.axios.patch<T, AxiosResponse<T, D>, D>(path, data, config);
  }

  public delete<T>(path: string, params?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(path, { params, ...config });
  }
}
