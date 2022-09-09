import { AxiosResponse } from 'axios';

import { ICreateEmployeeRequest } from '../dtos/createEmployeeRequest.dto';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import { IEmployee } from '../models/employee.model';

import BaseApiService, { IGetWithPaginationResponse } from './baseAPI.service';

class EmployeeApiService extends BaseApiService<IEmployee> {
  protected baseRoute: string = '/employees';

  constructor() {
    super();
    this.getEmployeesWithPagination = this.getEmployeesWithPagination.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  public getEmployee(id: IEmployee['id'], params?: unknown) {
    return this.get(`${this.baseRoute}/${id}`, params);
  }

  public getEmployeesWithPagination(
    params?: IGetWithPaginationRequest
  ): Promise<AxiosResponse<IGetWithPaginationResponse<IEmployee>>> {
    return this.getWithPagination(this.baseRoute, params);
  }

  public createEmployee(data: ICreateEmployeeRequest): Promise<AxiosResponse<IEmployee, ICreateEmployeeRequest>> {
    return this.post(this.baseRoute, data);
  }

  public deleteEmployee(id: IEmployee['id'], params?: unknown): Promise<AxiosResponse<IEmployee>> {
    return this.delete(`${this.baseRoute}/${id}`, params);
  }

  public bulkDeleteEmployees(ids: IEmployee['id'][]) {
    const promisesDeleteEmployees = ids.map((id: IEmployee['id']) => this.deleteEmployee(id));
    return Promise.all(promisesDeleteEmployees);
  }
}

export default new EmployeeApiService();
