import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class AxiosService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.instance.interceptors.request.use(
      this.interceptBeforeRequest.bind(this),
      this.interceptRequestError.bind(this)
    );
    this.instance.interceptors.response.use(
      this.interceptResponseData.bind(this),
      this.interceptResponseError.bind(this)
    );
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

  public get(url = '/', config?: AxiosRequestConfig) {
    return this.instance.get(url, config);
  }

  public post(url = '/', data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config);
  }

  public put(url = '/', data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config);
  }

  public patch(url = '/', data?: unknown, config?: AxiosRequestConfig) {
    return this.instance.patch(url, data, config);
  }

  public delete(url = '/', config?: AxiosRequestConfig) {
    return this.instance.delete(url, config);
  }
}
