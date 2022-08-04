import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

export interface IGetWithPaginationResponse<T> {
  data: T[];
  total: number;
}

export default abstract class BaseApiService {
  private axios: AxiosInstance;

  public abstract baseUrl: string;

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
    // if (!config.url?.includes('/auth/login') || !config.url.includes('/auth/refreshToken')) {
    //   const { expiredTime } = LocalStorage.getItem('access_token');
    //   const now = new Date().getTime();
    //   if (expiredTime < now) {
    //     const accessToken = await this.authService.refreshToken();
    //     LocalStorage.setItem('access_token', accessToken);
    //   }
    // }
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

  public get(path: string, config?: AxiosRequestConfig) {
    return this.axios.get(path, config);
  }

  public getWithPagination<T>(
    path: string,
    params: IGetWithPaginationRequest,
    config?: AxiosRequestConfig
  ): AxiosPromise<IGetWithPaginationResponse<T>> {
    return this.get(path, { ...params, ...config });
  }

  public post<T>(path: string, data: T, config?: AxiosRequestConfig) {
    return this.axios.post(path, data, config);
  }

  public put(path: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.put(path, data, config);
  }

  public patch(path: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.patch(path, data, config);
  }

  public delete(path: string, config?: AxiosRequestConfig) {
    return this.axios.delete(path, config);
  }
}
