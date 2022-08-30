import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

export interface IGetWithPaginationResponse<T> {
  items: T[];
  total: number;
}

export default abstract class BaseApiService {
  private axios: AxiosInstance;

  protected abstract baseRoute: string;

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

  private async interceptBeforeRequest(config: AxiosRequestConfig) {
    return config;
  }

  private interceptRequestError(error: AxiosError) {
    return Promise.reject(error);
  }

  private interceptResponseData(response: AxiosResponse) {
    return response;
  }

  private interceptResponseError(error: AxiosError) {
    return Promise.reject(error);
  }

  public get<T, P>(path: string, params?: P, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(path, { params, ...config });
  }

  public getWithPagination<T>(
    path: string,
    params: IGetWithPaginationRequest,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IGetWithPaginationResponse<T>>> {
    return this.get<IGetWithPaginationResponse<T>, IGetWithPaginationRequest>(path, params, config);
  }

  public post<T, D>(path: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(path, data, config);
  }

  public put<T, D>(path: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.put<T>(path, data, config);
  }

  public patch<T, D>(path: string, data?: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(path, data, config);
  }

  public delete<T, P>(path: string, params?: P, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.delete<T>(path, { params, ...config });
  }
}
