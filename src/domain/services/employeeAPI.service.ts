import { ICreateEmployeeRequest } from '../dtos/createEmployeeRequest.dto';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import { IEmployee } from '../models/employee.model';
import BaseApiService from './baseAPI.service';

class EmployeeApiService extends BaseApiService<IEmployee> {
  public baseRoute: string = '/employees';

  public getEmployeesWithPagination(params: IGetWithPaginationRequest) {
    return this.getWithPagination(this.baseRoute, params);
  }

  public createEmployee(data: ICreateEmployeeRequest) {
    return this.post(this.baseRoute, data);
  }
}

export default new EmployeeApiService();
