import { AxiosPromise } from 'axios';

import { ICreateEmployeeRequest } from '../dtos/createEmployeeRequest.dto';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import { IEmployee } from '../models/employee.model';
import BaseApiService, { IGetWithPaginationResponse } from './baseAPI.service';

class EmployeeApiService extends BaseApiService {
  protected baseRoute: string = '/employees';

  constructor() {
    super();
    this.getEmployeesWithPagination = this.getEmployeesWithPagination.bind(this);
    this.createEmployee = this.createEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  public getEmployeesWithPagination(
    params: IGetWithPaginationRequest
  ): AxiosPromise<IGetWithPaginationResponse<IEmployee>> {
    return this.getWithPagination(this.baseRoute, params);
  }

  public createEmployee(data: ICreateEmployeeRequest): AxiosPromise<IEmployee> {
    return this.post(this.baseRoute, data);
  }

  public deleteEmployee(id: IEmployee['id']) {
    return this.delete(`${this.baseRoute}/${id}`);
  }
}

export default new EmployeeApiService();
