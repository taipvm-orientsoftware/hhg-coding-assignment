import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';

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

  public get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  public getWithPagination(url: string, params: IGetWithPaginationRequest, config?: AxiosRequestConfig) {
    return this.get(url, { ...params, ...config });
  }

  public post(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  public put(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }

  public patch(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, config);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }
}
