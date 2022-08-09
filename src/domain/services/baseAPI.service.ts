import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

export interface IGetWithPaginationResponse<T> {
  items: T[];
  total: number;
}

export default abstract class BaseApiService<T> {
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

  public get<T, P>(path: string, params?: P, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.get<T>(path, { params, ...config });
  }

  public getWithPagination(
    path: string,
    params: IGetWithPaginationRequest,
    config?: AxiosRequestConfig
  ): AxiosPromise<IGetWithPaginationResponse<T>> {
    return this.get(path, params, config);
  }

  public post<D>(path: string, data: D, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.post<T>(path, data, config);
  }

  public put<D>(path: string, data: D, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.put<T>(path, data, config);
  }

  public patch<D>(path: string, data: D, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.patch<T>(path, data, config);
  }

  public delete<T, P>(path: string, params: P, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.axios.delete<T>(path, { params, ...config });
  }
}
