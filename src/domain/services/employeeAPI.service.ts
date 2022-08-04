import { IEmployee } from '../../interfaces';
import { IGetWithPaginationRequest } from '../dtos/getWithPaginationRequest.dto';
import BaseApiService from './baseAPI.service';

class EmployeeApiService extends BaseApiService {
  public baseUrl: string = '/employees';

  public getEmployeesWithPagination(params: IGetWithPaginationRequest) {
    return this.getWithPagination<IEmployee>(this.baseUrl, params);
  }
}

export default new EmployeeApiService();
