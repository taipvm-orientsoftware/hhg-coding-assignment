import { IEmployee } from '../../interfaces';
import { ICreateEmployeeRequest } from '../dtos/createEmployeeRequest.dto';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import BaseApiService from './baseAPI.service';

class EmployeeApiService extends BaseApiService<IEmployee> {
  public baseUrl: string = '/employees';

  public getEmployeesWithPagination(params: IGetWithPaginationRequest) {
    return this.getWithPagination(this.baseUrl, params);
  }

  public createEmployee(data: ICreateEmployeeRequest) {
    return this.post(this.baseUrl, data);
  }
}

export default new EmployeeApiService();
