import { AxiosPromise } from 'axios';
import { IAddEmployeeData, IGetEmployeesParams } from '../interfaces';
import axiosClient from './axiosClient';

export const getEmployeesAPI = (params?: IGetEmployeesParams): AxiosPromise =>
  axiosClient.get('/employees?order=desc', params);

export const addEmployeeAPI = (body: IAddEmployeeData): AxiosPromise => axiosClient.post('/employees', body);
