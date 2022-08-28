import { AxiosPromise, AxiosResponse } from 'axios';

import { ICreateEmployeeRequest } from '../dtos/createEmployeeRequest.dto';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import Employee, { IEmployee } from '../models/employee.model';
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
  ): AxiosPromise<IGetWithPaginationResponse<Employee>> {
    return this.getWithPagination<IEmployee>(this.baseRoute, params).then(
      (data: AxiosResponse<IGetWithPaginationResponse<IEmployee>>) => {
        data.data.items.map((item: IEmployee) => new Employee(item));
        return data;
      }
    );
  }

  public createEmployee(data: ICreateEmployeeRequest): AxiosPromise<IEmployee> {
    return this.post(this.baseRoute, data);
  }

  public deleteEmployee(id: IEmployee['id']): AxiosPromise<IEmployee> {
    return this.delete(`${this.baseRoute}/${id}`);
  }
}

export default new EmployeeApiService();
